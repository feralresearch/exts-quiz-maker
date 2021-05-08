/*
    Some of this is a bit ugly but is doing the following:

    - We use regexp here because we assume the data is dirty 
    (isn't formatted correctly, includes quotes in quotes, extra linebreaks, etc)

    - The JSON spec says we can't have single quotes internally, but the HTML spec
    doesn't care, so this also takes any input and converts the output to use
    single quotes for parameters and the requisite double internal to the JSON strings.
    
    - Apostrophes and single quotes are entity encoded.
*/
import { QUESTIONTYPE } from "constants.js";
import { saveFile } from "utility";
const quizTemplate = require("quiz_template.json");

const quizDataHelper = {
  loadQuizDataFrom: (file, cb) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      // Strip linebreaks
      let contentAsString = e.target.result.replace(/(\r\n|\n|\r)/gm, "");

      // Remove json-data blocks
      const docWithoutJson = contentAsString.replace(
        /(data-json=['|"]).*?}]}(['|"])/gm,
        ""
      );

      // But keep them...
      const jsonBlocks = contentAsString.match(
        /(?<=json=['|"]).*?}]}(?=['|"])/gm
      );
      if (!jsonBlocks) {
        window.alert(
          "I don't know how to deal with this - is it valid quiz content?"
        );
        return null;
      }

      // Rebuild as JSON
      const parser = new DOMParser();
      const doc = parser.parseFromString(docWithoutJson, "text/html");

      let array = [];
      Array.from(doc.getElementsByTagName("div")).forEach((el, idx) => {
        const cleanedBlock = jsonBlocks[idx]
          .replaceAll("&quot;", '"')
          .replaceAll("'", "&apos;");
        array.push({
          type: el.dataset.type,
          permanentId: el.dataset.permanentId,
          json: JSON.parse(cleanedBlock),
        });
      });
      cb(array);
    };
    fileReader.onerror = (e) => {
      console.error(e);
    };
    fileReader.readAsText(file, "UTF-8");
  },

  saveQuizDataTo: ({ fileName, data, legacyFormat = false }) => {
    let outputAsString = "";
    data.forEach((el) => {
      const jsonData = JSON.stringify(el.json).replaceAll("'", "&apos;");
      outputAsString +=
        `<div\n data-type='${el.type}'\n` +
        `data-permanent-id='${el.permanentId}'\n` +
        `data-json='${jsonData}'>\n` +
        `</div>\n`;
    });

    // EXTS format per @ben:
    if (legacyFormat) {
      //Strip all linefeeds
      outputAsString = outputAsString.replace(/(\r\n|\n|\r)/gm, "");
      //Convert single quotes to double
      outputAsString = outputAsString.replaceAll("'", '"');
    }

    saveFile(fileName ? fileName : "new_quiz.md", outputAsString);
  },

  _findAnswer: (quizData, parentId, id) => {
    let parentIndex = quizData.data.indexOf(
      quizData.data.find((item) => item.permanentId === parentId)
    );
    let targetIndex = quizData.data[
      parentIndex
    ].json.answers_attributes.indexOf(
      quizData.data[parentIndex].json.answers_attributes.find(
        (item) => item.permanent_id === id
      )
    );
    return {
      parentIndex,
      index: targetIndex,
      answer: quizData.data[parentIndex].json.answers_attributes[targetIndex],
    };
  },

  _create: () => {
    return JSON.parse(JSON.stringify(quizTemplate));
  },

  _fixIds: (data) => {
    if (data.data.length === 0) return;

    let baseId = data.data[0].permanentId.split("-");
    baseId.splice(-1, 1);
    baseId = baseId.join("-");
    data.data.forEach((question, idx) => {
      question.permanentId = `${baseId}-${idx}`;
      question.json.answers_attributes.forEach((answer, aIdx) => {
        answer.permanent_id = `answer-${aIdx}`;
      });
    });
    return data;

    /*
    This block helps reuse the old IDs
    (leaving it here in case we need to, for now I just override them with something sensible)

    let smallestId = 0;
    let largestId = 0;
    let baseId = "quiz";
    data.data.forEach((question) => {
      baseId = question.permanentId.split("-");
      baseId.splice(-1, 1);
      baseId = baseId.join("-");
      let thisId = parseFloat(
        question.permanentId.split("-")[
          question.permanentId.split("-").length - 1
        ]
      );
      largestId = thisId > largestId ? thisId : largestId;
      smallestId = thisId < smallestId ? thisId : smallestId;
    });
    console.log(`BaseId: ${baseId}`);
    console.log(`Largest: ${largestId}`);    
    */
  },

  merge: (data, update) => {
    const newData = { ...data };
    if (update.name === "allowMultiple") {
      // Quiz type switch, also changes the IDs
      let targetIndex = data.data.indexOf(
        data.data.find((item) => item.permanentId === update.id)
      );
      data.data[targetIndex].type = update.value
        ? QUESTIONTYPE.MULTIPLE
        : QUESTIONTYPE.SINGLE;

      if (data.data[targetIndex].type === QUESTIONTYPE.MULTIPLE) {
        data.data[targetIndex].permanentId = data.data[
          targetIndex
        ].permanentId.replace("single", "multiple");
      } else {
        data.data[targetIndex].permanentId = data.data[
          targetIndex
        ].permanentId.replace("multiple", "single");
      }
    } else if (update.parentId) {
      // Answer property
      const foundAnswer = quizDataHelper._findAnswer(
        newData,
        update.parentId,
        update.id
      );
      foundAnswer.answer[update.name] = update.value;
    } else {
      // Question property
      let targetIndex = data.data.indexOf(
        data.data.find((item) => item.permanentId === update.id)
      );
      newData.data[targetIndex].json[update.name] = update.value;
    }
    return newData;
  },

  delete: (data, update) => {
    const newData = { ...data };
    if (update.parentId) {
      // Answer
      const foundAnswer = quizDataHelper._findAnswer(
        newData,
        update.parentId,
        update.id
      );
      newData.data[foundAnswer.parentIndex].json.answers_attributes.splice(
        foundAnswer.index,
        1
      );
    } else {
      // Question
      let targetIndex = data.data.indexOf(
        data.data.find((item) => item.permanentId === update.id)
      );
      newData.data.splice(targetIndex, 1);
    }
    return quizDataHelper._fixIds(newData);
  },

  add: (data, update) => {
    if (!data) return quizDataHelper._create();
    const newData = { ...data };
    if (update.parentId) {
      // Answer

      JSON.parse(JSON.stringify(quizTemplate));
      let answerTemplate = JSON.parse(
        JSON.stringify(quizTemplate.data[0].json.answers_attributes[0])
      );
      let targetIndex = data.data.indexOf(
        data.data.find((item) => item.permanentId === update.parentId)
      );
      newData.data[targetIndex].json.answers_attributes.unshift(answerTemplate);
    } else {
      // Question
      let questionTemplate = JSON.parse(JSON.stringify(quizTemplate.data[0]));
      newData.data.unshift(questionTemplate);
    }
    return quizDataHelper._fixIds(newData);
  },
};
export default quizDataHelper;
