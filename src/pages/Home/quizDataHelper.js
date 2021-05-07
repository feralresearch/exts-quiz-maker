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

  merge: (data, update) => {
    const newData = { ...data };
    if (update.name === "allowMultiple") {
      // Switch quiz type
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
    } else if (!update.parentId) {
      // Top level property
      let targetIndex = data.data.indexOf(
        data.data.find((item) => item.permanentId === update.id)
      );
      newData.data[targetIndex].json[update.name] = update.value;
    } else {
      // Answer property (inside Question)
      let parentIndex = data.data.indexOf(
        data.data.find((item) => item.permanentId === update.parentId)
      );
      let targetIndex = newData.data[
        parentIndex
      ].json.answers_attributes.indexOf(
        newData.data[parentIndex].json.answers_attributes.find(
          (item) => item.permanent_id === update.id
        )
      );
      newData.data[parentIndex].json.answers_attributes[targetIndex][
        update.name
      ] = update.value;
    }
    return newData;
  },
};
export default quizDataHelper;
