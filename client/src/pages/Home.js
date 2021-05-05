import React, { useState, useMemo } from "react";
import styles from "./Home.module.css";
import { NativeTypes } from "react-dnd-html5-backend";
import DnDTarget from "components/DnD/Target";
const { FILE } = NativeTypes;

const allowMultiple = false;
const allowedTypes = ["text/markdown"];

const onProcessFile = (file) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    document.getElementById("editor").value = e.target.result;
  };
  fileReader.onerror = (e) => {
    console.error(e);
  };
  fileReader.readAsText(file, "UTF-8");
  return (
    <div key={file.name}>
      <div>
        {file.name} {file.type}
      </div>
      <input
        style={{ height: "20rem", width: "100%" }}
        type="textarea"
        id="editor"
      />
    </div>
  );
};

const onRejectFile = (file) => {
  console.warn(
    `REJECT: ${file.type}. Allowed: ${JSON.stringify(allowedTypes)}`
  );
  return null;
};

const Home = () => {
  const [droppedFiles, setDroppedFiles] = useState([]);
  const accepts = useMemo(() => [FILE], []);
  const handleFileDrop = (item, monitor) => {
    if (monitor) {
      if (!allowMultiple && monitor.getItem().files.length > 1)
        console.warn("ALLOWMULTIPLE IS FALSE: Accepting only first file");
      setDroppedFiles(
        allowMultiple ? monitor.getItem().files : [monitor.getItem().files[0]]
      );
    }
  };
  return (
    <DnDTarget accepts={accepts} onDrop={handleFileDrop}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          {droppedFiles.map((file) => {
            if (allowedTypes.includes(file.type)) {
              return onProcessFile(file);
            } else {
              return onRejectFile(file);
            }
          })}
        </div>
      </div>
    </DnDTarget>
  );
};

export default Home;
