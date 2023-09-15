import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles=makeStyles((theme) => ({
    subnavMainContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
    },
    subnavContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    selectedButton: {
        color: '#FFFFFF', // Text color for selected button
        textTransform: 'none',
        font: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
      },
      unSelectedButton: {
        color: '#FAFAFA', // Text color for selected button
        textTransform: 'none',
        font: 'Roboto',
        fontSize: 15,
        fontWeight: 'lighter',
      },
}));

const SubNavbar = ({ activeButton, setActiveButton }) => {
    const classes=useStyles();
  return (
    <div className={classes.subnavMainContainer}>
        <div className={classes.subnavContainer}>
      <Button
        variant= 'text'
        className={classes.selectedButton}
        onClick={() => setActiveButton('profile')}
      >
        My Profile | 
      </Button>  
      <Button
        variant= 'text'
        className={classes.selectedButton}
        onClick={() => setActiveButton('profile')}
      >
        Personal Info
      </Button>
      <Button
        variant= 'text'
        className={classes.unSelectedButton}
        onClick={() => setActiveButton('profile')}
      >
        Preference
      </Button>
      <Button
        variant= 'text'
        className={classes.unSelectedButton}
        onClick={() => setActiveButton('profile')}
      >
        Archive
      </Button>
      {/* Add more buttons as needed */}
    </div>
    </div>
  );
};

export default SubNavbar;