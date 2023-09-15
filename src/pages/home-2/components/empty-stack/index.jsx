import React from 'react';

import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';

import {ReactComponent as  EmptyListSplash} from '../../assets/empty-list-splash.svg';

const useStyles = makeStyles({
    imageContainer: {
     maxWidth: '100%'
    },
    emptyText: {
      color: '#F0F0F0',
      fontSize: '28px',
      fontStyle: 'italic',
      fontWeight: 300,
      textAlign: 'center'
    },
    setupMailAction: {
      fontWeight: 400,
      textDecorationLine: 'underline'
    },

  });

export default function EmptyStack() {
  const classes = useStyles();
  const handleNavigateToSetupMail = () => {
    console.log("handle navigation here")
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <EmptyListSplash className={classes.imageContainer} />
      <div className={classes.emptyText}>
        Looks unusually quiet here, have you&nbsp;
        <span role='button' onClick={handleNavigateToSetupMail} className={classes?.setupMailAction}>
          set up mail forwarding?
        </span>
      </div>
    </Box>
  );
};