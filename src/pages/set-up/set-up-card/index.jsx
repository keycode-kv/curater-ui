import React from 'react';

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    borderRadius: '30px',
    backgroundColor: '#FAFAFA',
    height: '490px',
    width: '330px'
  },
  cardImage: {
    height: '350px',
  },
  content: {
    height: '100px',
    fontSize: '24px',
    fontWeight: 400,
    textAlign: 'center'
  }
})

export default function SetupCard({
  image,
  content
}) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.cardImage}>
        {image}
      </div>
      <div className={classes.content}>
        {content}
      </div>
    </div>
  );
}