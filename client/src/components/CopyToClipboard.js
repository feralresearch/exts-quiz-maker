import React from "react";
import { useSelector } from "react-redux";
import Login from "components/user/Login";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const copyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");
  // Place in the top-left corner of screen regardless of scroll position.
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of the white box if rendered for any reason.
  textArea.style.background = "transparent";
  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    //console.log("Copying text command was " + msg);
  } catch (err) {
    console.error("Unable to copy");
    console.error(err);
  }

  document.body.removeChild(textArea);
};

function CopyToClipboard({ children, content }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div onClick={() => copyTextToClipboard(content ? content : children)}>
        <FontAwesomeIcon icon="copy" />
        &nbsp;
      </div>
      <div>{children}</div>
    </div>
  );
}
export default CopyToClipboard;

const styles = {};
