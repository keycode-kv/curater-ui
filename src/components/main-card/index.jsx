import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

import { ReactComponent as RatingStar } from "../../assets/rating_star.svg";
import { ReactComponent as CommentIcon } from "../../assets/comment_icon.svg";
import { ReactComponent as ViewIcon } from "../../assets/view_icon.svg";

const useStyles = makeStyles({
  card: {
    boxSizing: "border-box",
    borderRadius: "15px",
    border: "3px solid #4E157A",
    background: "#FAFAFA",
    boxShadow: "7px 7px 0px 0px rgba(211, 156, 255, 0.25)",
    marginBottom: "24px",
    padding: "24px",
    touchAction: "none",
    maxWidth: '350px'
  },
  header: {
    color: "#414141",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "23px",
    opacity: 0.97,
    paddingBottom: "6px",
  },
  sourceText: {
    color: "#414141",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "21px",
    opacity: 0.5,
  },
  durationtext: {
    color: "#414141",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19px",
    opacity: 0.5,
    padding: "6px 0",
    fontStyle: "italic",
  },
  contentText: {
    color: "#414141",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "16px",
    paddingTop: "16px",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "16px 0",
  },
  iconContentWrapper: {
    display: "flex",
    alignItems: "center",
  },
  countText: {
    color: "#070707",
    fontSize: "15px",
    marginLeft: "4px",
  },
  tagWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  tagContainer: {
    borderRadius: "5px",
    opacity: 0.75,
    background: "#D39CFF",
    padding: "7px",
    color: "#160425",
    fontSize: "15px",
    margin: "0 5px 5px 0",
  },
});

const MainCard = ({ item, isMainCard }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.card} xs={12} md={6} lg={4}>
      <div className={classes.header}>{item.title}</div>
      <div className={classes.sourceText}>~{item.source_email}</div>
      {isMainCard && (
        <>
          <div className={classes.durationtext}>{item.duration} min</div>
          <div className={classes.contentText}>{item.summary}</div>
        </>
      )}
      <div className={classes.iconWrapper}>
        <span className={classes.iconContentWrapper}>
          <RatingStar />
          <span className={classes.countText}>{item.rating}</span>
        </span>
        <span className={classes.iconContentWrapper}>
          <ViewIcon />
          <span className={classes.countText}>{item.view_count}</span>
        </span>
        <span className={classes.iconContentWrapper}>
          <CommentIcon />
          <span className={classes.countText}>{item.comments_count}</span>
        </span>
      </div>
      <div className={classes.tagWrapper}>
        {item.tags?.map((item) => (
          <span key={item} className={classes.tagContainer}>{item}</span>
        ))}
      </div>
    </Grid>
  );
};

export default MainCard;
