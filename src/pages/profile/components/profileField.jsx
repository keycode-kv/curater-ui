import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  labelField: {
    color: "#414141",
    fontSize: 12,
  },
  valueField: {
    fontWeight: "bold",
    fontSize: 14,
  },
}));

const ProfileField = ({ label, value }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      style={{
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "12px",
      }}
    >
      <Grid item>
        <Typography
          variant="subtitle1"
          className={classes.labelField}
          fontStyle="italics"
        >
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" className={classes.valueField}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileField;
