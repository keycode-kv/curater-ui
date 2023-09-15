import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  coloredContainer: {
    backgroundColor: '#D39CFF', // Background color
    borderRadius: '20px', // Border radius
    padding: '8px 12px',
    fontSize:10,
    height:10,
    display:'flex',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems:'center',
    whiteSpace: 'nowrap'
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
