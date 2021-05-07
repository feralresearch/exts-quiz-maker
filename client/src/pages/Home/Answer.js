import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { DRAGGABLE } from "constants.js";
import MDEditor from "components/MDEditor";
import StatusToggle from "components/StatusToggle";

const Answer = ({ parentId, data, onChange, moveAnswer, findAnswer }) => {
  const originalIndex = findAnswer(data.permanent_id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DRAGGABLE.ANSWER,
      item: { permanent_id: data.permanent_id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [data, originalIndex, moveAnswer]
  );
  const [, drop] = useDrop(
    () => ({
      accept: DRAGGABLE.ANSWER,
      hover({ permanent_id: draggedId }) {
        if (draggedId !== data.permanent_id) {
          const { index: overIndex } = findAnswer(data.permanent_id);
          moveAnswer(draggedId, overIndex);
        }
      },
    }),
    [findAnswer, moveAnswer]
  );
  const opacity = isDragging ? 0.1 : 1;

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        border: "1px dashed lightgray",
        padding: "0.5rem 1rem",
        marginBottom: ".5rem",
        backgroundColor: "white",
        cursor: "move",
        opacity,
      }}
    >
      <div style={{ textAlign: "right" }}>
        <StatusToggle
          parentId={parentId}
          id={data.permanent_id}
          name={"correct"}
          value={data.correct}
          onChange={onChange}
          options={{
            display: ["CORRECT", "INCORRECT"],
            color: ["darkgreen", "red"],
          }}
        />
      </div>
      <div>
        <MDEditor
          id={data.permanent_id}
          parentId={parentId}
          name={"text_md"}
          value={data.text_md ? data.text_md : ""}
          onChange={onChange}
        />
      </div>
      <div>
        <MDEditor
          id={data.permanent_id}
          parentId={parentId}
          name={"hint_md"}
          value={data.hint_md ? data.hint_md : ""}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default Answer;
