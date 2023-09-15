import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import MainCard from "../../components/main-card";
import MainHeader from "../../components/main-header";

const mockData = [
  {
    id: "id_123",
    title: "heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Metus cras at odio ante nulla ac.",
    rating: 3.55,
    view_count: 1432,
    source_email: "joobi@test.com",
    tags: ["golang", "backend", "programming"],
    comments_count: 1562,
    duration: 1,
  },
  {
    id: "id_1444",
    title: "heading",
    content: "gist of the newsletter",
    rating: 3.55,
    view_count: 1432,
    source_email: "joobi@test.com",
    tags: ["golang", "backend", "programming"],
    comments_count: 1562,
    duration: 2,
  },
];

const useStyles = makeStyles({
  container: {
    background:
      "var(--BG-Gradient, conic-gradient(from 270deg at 88.19% -14.65%, #FFF 0deg, #D39CFF 0.035999999090563506deg, #070707 360deg))",
    maxHeight: "100vh",
    width: "100%",
  },
  contentWrapper: {
    width: "100%",
    padding: "20px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    color: "white",
    marginBottom: "20px",
  },
});

const CardsList = () => {
  const classes = useStyles();
  return (
    <Grid item className={classes.container}>
      <MainHeader />
      <Grid item className={classes.contentWrapper} xs={12}>
        <Grid className={classes.cardHeader} xs={12}>
          <div>header</div>
          <div>filter</div>
        </Grid>
        <>
          {mockData.map((item) => (
            <MainCard item={item} isMainCard={false} />
          ))}
        </>
      </Grid>
    </Grid>
  );
};

export default CardsList;
