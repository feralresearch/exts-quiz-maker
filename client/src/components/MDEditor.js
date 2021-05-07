import React, { useState, useRef } from "react";
import { LABEL } from "constants.js";
import Markdown from "react-universal-markdown/dom";

const MDEditor = ({ id, name, value, onChange, parentId }) => {
  const [focus, setFocus] = useState(false);
  const editorEl = useRef(null);
  const displayEl = useRef(null);

  if (editorEl.current)
    if (focus) {
      editorEl.current.style.display = "block";
      displayEl.current.style.display = "none";
      editorEl.current.focus();
    } else {
      editorEl.current.style.display = "none";
      displayEl.current.style.display = "flex";
      editorEl.current.blur();
    }

  return (
    <div style={styles.container} key={id}>
      <div style={styles.label}>{LABEL[name] ? LABEL[name] : name}</div>
      <div style={styles.content}>
        <textarea
          ref={editorEl}
          onClick={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          data-permanent-id={id}
          data-parent-id={parentId}
          onChange={(e) => {
            onChange({
              parentId,
              id,
              value: e.target.value,
              name,
              originalEvent: e,
            });
          }}
          name={name}
          value={value}
          style={styles.inputFocused}
        />
        <div
          ref={displayEl}
          onClick={() => {
            setFocus(true);
          }}
          style={styles.display}
        >
          <Markdown>{value}</Markdown>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
  label: {
    fontSize: ".8rem",
  },
  display: {
    fontWeight: 200,
    display: "flex",
    alignItems: "center",
    color: "grey",
    border: "1px solid #eeeeee",
    fontSize: "1rem",
    width: "100%",
    minHeight: "2rem",
    lineHeight: "1rem",
    padding: ".2rem",
    background: "white",
  },
  inputFocused: {
    display: "none",
    fontSize: "1rem",
    width: "100%",
    minHeight: "4rem",
    color: "red",
  },
};

export default MDEditor;
