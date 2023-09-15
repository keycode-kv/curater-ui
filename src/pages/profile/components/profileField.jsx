import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
  labelField: {
    color:'#414141',
  },
  valueField: {
    fontWeight:'bolder',
  },
}));

const ProfileField = ({ label, value }) => {
  const classes=useStyles();
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4}>
        <Typography variant="subtitle1" className={classes.labelField} fontStyle='italics'>{label}  :</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1" className={classes.valueField}>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileField;