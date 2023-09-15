import React from 'react';

import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';

import {ReactComponent as  EmptyListSplash} from 'assets/empty-list-splash.svg';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
    imageContainer: {
     width: '270px'
    },
    emptyText: {
      color: '#F0F0F0',
      fontSize: '16px',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: '20px'
    },
    setupMailAction: {
      fontWeight: 500,
      textDecorationLine: 'underline'
    },

  });

export default function EmptyStack() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigateToSetupMail = () => {
    navigate('/set-up');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px'
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