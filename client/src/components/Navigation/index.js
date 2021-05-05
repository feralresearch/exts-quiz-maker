import React from "react";

function Navigation() {
  return (
    <div style={styles.container}>
      <div style={{ width: "10rem", flexGrow: "1" }}>Quiz Maker</div>
      <div style={styles.infoBlock}></div>
    </div>
  );
}
export default Navigation;

const styles = {
  container: {
    fontFamily: "Mulish",
    textTransform: "uppercase",
    backgroundColor: "black",
    position: "fixed",
    width: "100%",
    textAlign: "left",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    fontSize: "1.5rem",
    alignItems: "center",
  },
  infoLabel: { fontWeight: 200, marginRight: ".5rem" },
  infoBlock: {
    textAlign: "right",
    flexDirection: "column",
    width: "12rem",
    fontSize: "0.5rem",
    fontWeight: 900,
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    marginRight: "2rem",
  },
  error: {
    color: "orange",
    fontSize: ".9rem",
    display: "flex",
    flexDirection: "row",
    marginRight: "2rem",
  },
};
