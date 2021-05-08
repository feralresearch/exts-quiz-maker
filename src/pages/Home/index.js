import React, { memo, useCallback, useState, useMemo, useEffect } from "react";
import styles from "./Home.module.css";
import { NativeTypes } from "react-dnd-html5-backend";
import DnDTarget from "components/DnD/Target";
import quizDataHelper from "./quizDataHelper.js";
import Question from "./Question.js";
import { useDrop } from "react-dnd";
import { DRAGGABLE } from "constants.js";
const { FILE } = NativeTypes;
const allowMultiple = false;
const allowedTypes = ["text/markdown"];

const Home = memo(() => {
  const [quizData, setQuizData] = useState();

  const clearData = useCallback((data) => {
    if (window.confirm("Clear current quiz? (you should save first)")) {
      setQuizData(null);
      sessionStorage.removeItem("quizData");
    }
  }, []);

  const setData = useCallback((data) => {
    setQuizData(data);
    sessionStorage.setItem("quizData", JSON.stringify(data));
  }, []);

  const onChange = useCallback(
    (update) => {
      setData(quizDataHelper.merge(quizData, update));
    },
    [quizData, setData]
  );

  const onAdd = useCallback(
    (object) => {
      setData(quizDataHelper.add(quizData, object));
    },
    [quizData, setData]
  );

  const onDelete = useCallback(
    (object) => {
      if (window.confirm("Do you really want to delete?"))
        setData(quizDataHelper.delete(quizData, object));
    },
    [quizData, setData]
  );

  const setDataFromChild = useCallback(
    (data) => {
      const newData = { ...quizData };
      newData.data[
        quizData.data.indexOf(
          quizData.data.find(
            (question) => question.permanentId === data.parentId
          )
        )
      ].json.answers_attributes = data.data;
      setData(newData);
    },
    [quizData, setData]
  );

  const accepts = useMemo(() => [FILE], []);

  const handleFileDrop = (item, monitor) => {
    const allow =
      monitor && (!quizData || window.confirm("Replace current quiz?"));
    if (allow) {
      if (!allowMultiple && monitor.getItem().files.length > 1)
        console.warn("ALLOWMULTIPLE IS FALSE: Accepting only first file");
      const droppedFiles = allowMultiple
        ? monitor.getItem().files
        : [monitor.getItem().files[0]];

      droppedFiles.forEach((file) => {
        if (allowedTypes.includes(file.type)) {
          quizDataHelper.loadQuizDataFrom(file, (data) => {
            setData({ fileName: file.name, data });
          });
        } else {
          console.warn(
            `REJECT: ${file.type}. Allowed: ${JSON.stringify(allowedTypes)}`
          );
          return null;
        }
      });
    }
  };

  const findQuizItem = useCallback(
    (permanentId) => {
      if (!permanentId) console.error("findQuizItem: Cannot find undefined");
      const quizItem = quizData.data.filter(
        (data) => `${data.permanentId}` === permanentId
      )[0];
      return {
        quizItem,
        index: quizData.data.indexOf(quizItem),
      };
    },
    [quizData]
  );

  const moveQuizItem = useCallback(
    (permanentId, fromIndex) => {
      const { index } = findQuizItem(permanentId);
      const newData = [...quizData.data];
      newData.splice(index, 0, newData.splice(fromIndex, 1)[0]);
      setData({ fileName: quizData.fileName, data: newData });
    },
    [findQuizItem, quizData, setData]
  );

  const [, drop] = useDrop(() => ({ accept: DRAGGABLE.QUESTION }));

  useEffect(() => {
    try {
      const savedData = JSON.parse(sessionStorage.getItem("quizData"));
      if (savedData) {
        console.warn("Loading saved data");
        setData(savedData);
      }
    } catch (e) {}
  }, [setData]);

  return (
    <DnDTarget accepts={accepts} onDrop={handleFileDrop}>
      {(quizData && (
        <React.Fragment>
          <div className={styles.navigation}>
            <div className={styles.title}>{quizData.fileName}</div>
            <div style={{ flexGrow: 1 }} />
            <div className={styles.button}>
              <input
                onClick={() =>
                  quizDataHelper.saveQuizDataTo({
                    fileName: quizData.fileName,
                    data: quizData.data,
                    legacyFormat: true,
                  })
                }
                value="save: exts format"
                type="button"
              />
            </div>
            <div className={styles.button}>
              <input
                onClick={() =>
                  quizDataHelper.saveQuizDataTo({
                    fileName: quizData.fileName,
                    data: quizData.data,
                    legacyFormat: false,
                  })
                }
                value="save"
                type="button"
              />
            </div>
            <div className={styles.button}>
              <input onClick={() => clearData()} value="clear" type="button" />
            </div>
          </div>
          <div className={styles.container}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flexGrow: 1 }} />
              <div>
                <input
                  value="Add"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd({
                      action: "add",
                      item: "question",
                    });
                  }}
                />
              </div>
            </div>
            <div className={styles.innerContainer}>
              <div
                style={{
                  marginBottom: "2rem",
                  fontWeight: 900,
                  fontSize: "3rem",
                }}
                key={quizData.fileName}
              >
                <div className={styles.questionList}>
                  <div ref={drop} style={{ fontSize: "1rem" }}>
                    {quizData.data.map((data) => (
                      <Question
                        onUpdateData={setDataFromChild}
                        key={data.permanentId
                          .replace("single", "")
                          .replace("multiple", "")}
                        data={data}
                        onChange={onChange}
                        onAdd={onAdd}
                        onDelete={onDelete}
                        moveQuizItem={moveQuizItem}
                        findQuizItem={findQuizItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )) || (
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div
              style={{
                textAlign: "center",
                fontSize: "1rem",
                margin: "auto",
                border: "1px solid black",
                background: "white",
                padding: "4rem",
              }}
            >
              Drop a quiz .md file here to get started or{" "}
              <div
                style={{ textDecoration: "underline" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd({
                    action: "add",
                    item: "question",
                  });
                }}
              >
                Create New
              </div>
            </div>
          </div>
        </div>
      )}
    </DnDTarget>
  );
});

export default Home;
