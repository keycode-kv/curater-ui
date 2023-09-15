import React, { useEffect, useState } from 'react';

import { makeStyles } from "@mui/styles";
import { useGesture } from '@use-gesture/react';


const useStyles = makeStyles({
  cardWrapper: {
    touchAction: 'none'
  },
  stepperWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    justifyContent: 'center',
    marginTop: '16px'
  },
  stepper: {
    width: '10px',
    height: '10px',
    backgroundColor: '#9c9b9a',
    borderRadius: '10px',
  },
  activeStep: {
    backgroundColor: '#fafafa',
  }
})


export default function Carousel({
  items,
  onSwipeRight,
  onSwipeLeft,
  indexOfItemInFocus
}){
    const classes = useStyles();
    const [activeIndex, setIndex] = useState(0);
    useEffect(() => {
      if (0<=indexOfItemInFocus && indexOfItemInFocus <= (items.length -1))
      setIndex(indexOfItemInFocus);
    }, [items?.length, indexOfItemInFocus]);

    const bind = useGesture({
        onDragEnd: ({
          direction: [dx]
        }) => {
          console.log({dx , activeIndex});
          if (dx === -1) {
            if (onSwipeRight) { onSwipeRight(); }
            setIndex((prev) => prev === items?.length -1 ? prev : prev + 1)
          } else if (dx === 1) {
            if (onSwipeLeft) { onSwipeLeft() }
            setIndex((prev) => prev === 0 ? prev : prev - 1)
          }
        }
    })
    return (
      <div>
        <div
          className={classes.cardWrapper}
          {...bind()}
        >
          {items[activeIndex]}  
        </div>
        <div className={classes.stepperWrapper}>
        {items?.map((_, itemIndex) =>
          <div
            className={`${classes.stepper} ${itemIndex === activeIndex ? classes.activeStep : ''}`}
          />
        )}
        </div>
      </div>
    );
}