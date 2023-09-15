import React from 'react';

import { useGesture } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import MainCard from 'components/main-card';

import { ReactComponent as ArchiveIcon } from 'assets/archive-icon.svg';
import { ReactComponent as SaveIcon } from 'assets/save-icon.svg';
import { ReactComponent as ViewIcon } from 'assets/view-icon-open.svg';

export default function ArticleCard({
  index,
  card,
  onSwipeRight,
  onSwipeLeft,
  onClick
}) {
  const [{ x, y, opacity }, api] = useSpring(() => ({ x: 0, y: 0, opacity: 1 }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my] }) => {
      api.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        opacity: mx > 100 ? 1 : 0.5
      })
    },
    onDragEnd: ({
      movement: [mx, my]
    }) => {
      if (mx && Math.abs(mx) > 100) {
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
        onClick();
      }
    }
  });

  const animateSwipeRight = () => {
    api.start({
      x: 350,
      y: 0,
      opacity: 0.5,
    });
    setTimeout(() => {
      onSwipeRight()
    }, 200);
  };

  const animateSwipeLeft = () => {
    api.start({
      x: -350,
      y: 0,
      opacity: 0.5,
    });
    setTimeout(() => {
      onSwipeLeft()
    }, 200);
  };

  return (
    <Box
      sx={{
        zIndex: -(index),
        position: index === 0 ? 'relative' : 'absolute',
        top: 0,
        pointerEvents: index !== 0 ? 'none' : 'auto' 
      }}
    >
      <animated.div
        {...bind()}
        style={{
          x,
          y,
          opacity
        }}
      >
        <MainCard item={card} isMainCard />
      </animated.div>
      {index === 0 && (
        <Box
          sx={{
            mt: 6,
            mx: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <IconButton
            onClick={animateSwipeLeft}
          >
            <ArchiveIcon />
          </IconButton>
          <IconButton
            onClick={animateSwipeRight}
          >
            <SaveIcon />
          </IconButton>
          <Box sx={{
            display: { xs: 'none', md: 'block' },
            m: '8px'
          }}>
            <Button
              sx={{
                borderRadius: '53px',
                height: '56px',
                px: '40px',
                backgroundColor: '#FAFAFA',
                color: '#4E157A',
                '&:hover': {
                  background: '#FAFAFA'
                }
              }}
              startIcon={<ViewIcon />}
              onClick={onClick}
            >
              View
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}