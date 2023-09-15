import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  coloredContainer: {
    backgroundColor: '#D39CFF', // Background color
    borderRadius: '25px', // Border radius
    padding: theme.spacing(2), // Add padding as needed
    fontSize:10,
    width:'20%',
    height:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
}));

function ColoredContainer({ text }) {
  const classes = useStyles();

  return (
    <div className={classes.coloredContainer}>
      {text}
    </div>
  );
}

ColoredContainer.propTypes = {
  text: PropTypes.string.isRequired, // Ensure 'text' is a required string prop
};

export default ColoredContainer;
