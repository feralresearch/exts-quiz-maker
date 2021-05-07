import React from "react";

const FormElement = ({ field, onChange, value }) => {
  if (field.label !== "*") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 0 1rem 0",
        }}
      >
        <div style={{ textAlign: "left" }}>{field.label}</div>
        <div style={{ textAlign: "left" }}>
          <input
            name={field.name}
            style={{ width: "100%", height: "2rem" }}
            type={field.type}
            onChange={onChange}
            placeholder={field.default}
            value={value || ""}
          ></input>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default FormElement;
