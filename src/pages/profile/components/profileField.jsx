import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
  labelField: {
    color:'#414141',
    fontSize:12
  },
  valueField: {
    fontWeight:'bold',
    fontSize:12
  },
}));

const ProfileField = ({ label, value }) => {
  const classes=useStyles();
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={3}>
        <Typography variant="subtitle1" className={classes.labelField} fontStyle='italics'>{label}</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body1" className={classes.valueField}>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileField;