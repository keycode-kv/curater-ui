import React from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    borderRadius: "30px",
    border: "2px solid #4E157A",
    background: "#FAFAFA",
    boxShadow: "7px 7px 0px 0px rgba(211, 156, 255, 0.25)",
    height: "270px",
    width: "calc(100vw - 90px)",
    padding: "10px 24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: 500,
  },
});

export default function SetupCard({ items }) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      {items.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
}
