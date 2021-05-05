import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormElement from "./FormElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
let formFields = {};

const EditProfile = ({ onSave, onClose, profile }) => {
  let template = useSelector((redux) => redux.stream.configTemplate);
  const [formFields, setFormFields] = useState(profile);
  const onChange = (e) => {
    setFormFields({
      ...formFields,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div style={styles.container}>
      <div style={{ height: "100%", overflow: "scroll" }}>
        <div style={{ width: "50%", margin: "auto", paddingBottom: "20rem" }}>
          {template.map((field, idx) => (
            <FormElement
              key={idx}
              field={field}
              value={formFields[field.name]}
              onChange={onChange}
            />
          ))}
          <div style={{ display: "flex" }}>
            <div
              style={{ display: "flex", flexDirection: "row", margin: "auto" }}
            >
              <div style={styles.button} onClick={onClose}>
                <FontAwesomeIcon icon="times-circle" />
              </div>
              <div style={styles.button} onClick={() => onSave(formFields)}>
                <FontAwesomeIcon icon="save" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    width: "100vw",
    height: "100%",
    background: "#222222",
    color: "white",
    top: "3.8rem",
    left: 0,
    zIndex: 1,
    paddingTop: "2rem",
    overflow: "hidden",
  },
  button: { margin: "0.5rem", fontSize: "2rem" },
};

export default EditProfile;
