import React, { useCallback } from "react";
import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./Home.module.css";
import Answer from "./Answer.js";
import MDEditor from "components/MDEditor";
import Collapsable from "components/Collapsable";
import { DRAGGABLE, QUESTIONTYPE } from "constants.js";
import Markdown from "react-universal-markdown/dom";
import StatusToggle from "components/StatusToggle";

const Question = memo(
  ({
    data,
    onDelete,
    onAdd,
    onChange,
    moveQuizItem,
    findQuizItem,
    onUpdateData,
  }) => {
    const originalIndex = findQuizItem(data.permanentId).index;

    const onChangeQuizType = (e) => {
      const requestToMakeSingle = !e.value;
      const numberOfTrueAnswers = data.json["answers_attributes"].filter(
        (item) => item.correct
      ).length;

      if (requestToMakeSingle && numberOfTrueAnswers > 1) {
        window.alert(
          "You have requested to convert from a multiple-select to a single-select question, but you have more than one answer marked 'correct'. Fix the answers first."
        );
      } else {
        onChange(e);
      }
    };

    const findAnswer = useCallback(
      (permanent_id) => {
        const answer = data.json.answers_attributes.find(
          (item) => item.permanent_id === permanent_id
        );
        if (!answer) {
          console.error(`findAnswer: Cannot find ${permanent_id}`);
        } else {
          return {
            answer,
            index: data.json.answers_attributes.indexOf(answer),
          };
        }
      },
      [data]
    );

    const moveAnswer = useCallback(
      (permanent_id, fromIndex) => {
        const { index } = findAnswer(permanent_id);
        const newData = [...data.json.answers_attributes];
        newData.splice(index, 0, newData.splice(fromIndex, 1)[0]);
        onUpdateData({ parentId: data.permanentId, data: newData });
      },
      [findAnswer, onUpdateData, data]
    );

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: DRAGGABLE.QUESTION,
        item: { permanentId: data.permanentId, originalIndex },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [data, originalIndex, moveQuizItem]
    );

    const [, drop] = useDrop(
      () => ({
        accept: DRAGGABLE.QUESTION,
        hover({ permanentId: draggedId }) {
          if (draggedId !== data.permanentId) {
            const { index: overIndex } = findQuizItem(data.permanentId);
            moveQuizItem(draggedId, overIndex);
          }
        },
      }),
      [findQuizItem, moveQuizItem]
    );

    let contents = [];
    Object.keys(data.json).forEach((key) => {
      if (key === "answers_attributes") {
        const allowMultiple = data.type === QUESTIONTYPE.MULTIPLE;
        contents.push(<div key={"title"}>Answers</div>);
        contents.push(
          <div
            key={`${data.permanentId}_type`}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div style={{ flexGrow: 1 }}>
              <StatusToggle
                id={data.permanentId}
                name={"allowMultiple"}
                value={allowMultiple}
                onChange={onChangeQuizType}
                options={{
                  display: ["ALLOW MULTIPLE: YES", "ALLOW MULTIPLE: NO"],
                  color: ["black", "black"],
                }}
              />
            </div>
            <div>
              <input
                value="Add"
                type="button"
                onClick={() =>
                  onAdd({
                    action: "add",
                    item: "answer",
                    parentId: data.permanentId,
                  })
                }
              />
            </div>
          </div>
        );
        data.json["answers_attributes"].forEach((answer) => {
          contents.push(
            <Answer
              key={answer.permanent_id}
              moveAnswer={moveAnswer}
              findAnswer={findAnswer}
              parentId={data.permanentId}
              data={answer}
              onChange={onChange}
              onDelete={onDelete}
              onAdd={onAdd}
              allowMultiple={allowMultiple}
            />
          );
        });
      } else {
        contents.push(
          <div key={`${key}_${data.permanentId}`}>
            <MDEditor
              id={data.permanentId}
              name={key}
              onChange={onChange}
              value={data.json[key] ? data.json[key] : ""}
            />
          </div>
        );
      }
    });

    const opacity = isDragging ? 0.5 : 1;
    return (
      <div
        ref={(node) => drag(drop(node))}
        className={styles.questionBlock}
        style={{
          opacity,
        }}
      >
        <Collapsable
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>
                <Markdown>{data.json.description_md}</Markdown>
              </div>
              <div style={{ flexGrow: 1 }} />
              <div>
                <input
                  value="Delete"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete({
                      action: "delete",
                      item: "question",
                      id: data.permanentId,
                    });
                  }}
                />
              </div>
            </div>
          }
        >
          <div className={styles.answerBlock}>{contents}</div>
        </Collapsable>
      </div>
    );
  }
);

export default Question;
