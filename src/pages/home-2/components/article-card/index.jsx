import React from 'react';

import { useGesture } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ArticleCard({
  card,
  onSwipeRight,
  onSwipeLeft
}) {
  const [{ x, y, opacity }, api] = useSpring(() => ({ x: 0, y: 0, opacity: 1 }))

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my] }) => {
      api.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        opacity: mx > 300 ? 1 : 0.5
      })
    },
    onDragEnd: ({
      movement: [mx, my]
    }) => {
      console.log({mx})
      if (mx && Math.abs(mx)>300) {
        if (mx > 0) {
          onSwipeRight()
        } else {
          onSwipeLeft()
        }
      } else if (mx || my) {
        api.start({
          x: 0,
          y: 0,
          opacity: 1,
        })
      } else {
        console.log("onClick here...")
      }
    }
  })

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        opacity
      }}
    >
      <Card 
        sx={{
          minWidth: 320,
          px: '24px',
          py: '36px',
          borderRadius: '30px',
          touchAction: 'none',
        }}>
        <CardContent sx={{ padding: 0 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {card?.title}
          </Typography>
          <Typography variant="h5" component="div">
            {card?.source_email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </animated.div>
  );
}