import { Button, Grid, Hidden, Rating } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ReactComponent as StarIcon } from "../../assets/rating-star.svg";
import { ReactComponent as CuratorLogoDarkIcon } from "../../assets/curater-logo-dark.svg";
import dummyData from './dummy-data';
import { formatTimestamp } from '../../utils/datetime-utils';

const btnStyles = {
  borderRadius: 56,
  backgroundColor: '#e7cbfd',
  color: '#414141',
  textTransform: 'capitalize',
  paddingLeft: '24px',
  paddingRight: '24px',
};

const MobileCardView = ({ card, comments }) => {
  const classes = useMobileCardViewStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <CloseIcon sx={{ color: '#414141' }} />
        <CuratorLogoDarkIcon />
        <BookmarkBorderIcon sx={{ color: '#4E157A' }} />
      </div>
      <div className={classes.cardContent}>
        <div className={classes.cardContentHeader}>
          {card.title}
        </div>
        <div className={classes.cardSource}>{card.source}</div>
        <div className={classes.cardBody} dangerouslySetInnerHTML={{ __html: card.content }} />
      </div>
      <div className={classes.rating}>
        <Rating
          name="card-rating"
          value={card.rating}
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
          icon={<StarIcon fill='#D39CFF' />}
          emptyIcon={<StarIcon />}
        />
        <div className={classes.ratingText}>Give your rating</div>
      </div>
      <div className={classes.archiveBtnContainer}>
        <Button disableElevation sx={btnStyles} variant="contained" startIcon={<ArchiveOutlinedIcon fill="#414141" />}>
          Archive
        </Button>
      </div>
      <div className={classes.commentSection}>
        <div className={classes.commentHeader}>Comments</div>
        <div className={classes.comments}>
          {comments.map((comment) => (
            <div style={{ marginBottom: 12 }}>
              <div className={classes.commentHead}>
                <div className={classes.commentUser}>{comment.user}</div>
                <div className={classes.commentedAt}>&nbsp;| {formatTimestamp(comment.commented_at)}</div>
              </div>
              <div className={classes.commentBody}>
                {comment.content}
              </div>
            </div>
          ))}
        </div>
        <div className={classes.commentBox}>
          <input placeholder="Type your comment" className={classes.commentInput} />
          <div className={classes.sendBtn}>
            <SendIcon sx={{ color: '#fafafa', width: 14 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const DesktopCardView = ({ card, comments }) => {
  const classes = useDesktopCardViewStyles();
  return (
    <Grid className={classes.container}>
      Card view
    </Grid>
  );
}

const CardView = () => {
  const { cardId } = useParams();
  console.log('cardId', cardId);
  const [comments, setComments] = useState(dummyData.comments);
  const [card, setCard] = useState(dummyData.card);
  return (
    <>
      {/* Render MobileComponent on screens smaller than 'md' */}
      <Hidden mdUp>
        <MobileCardView card={card} comments={comments} />
      </Hidden>

      {/* Render DesktopComponent on screens 'md' and larger */}
      <Hidden smDown>
        <DesktopCardView card={card} comments={comments} />
      </Hidden>
    </>
  );
}

const useDesktopCardViewStyles = makeStyles({
  container: {
    height: "80vh",
    width: '80%',
    margin: 'auto',
    marginTop: 50,
    borderRadius: 30,
    border: '5px solid var(--Dark-Purple, #4E157A)',
    background: 'var(--White, #FAFAFA)',
    /* Block Shadow */
    boxShadow: '15px 15px 0px 0px rgba(211, 156, 255, 0.25)',
  }
});

const useMobileCardViewStyles = makeStyles({
  container: {
    minHeight: '100vh',
    // width: '100%',
    background: 'var(--White, #FAFAFA)',
    padding: '50px 36px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  cardContent: {
    marginTop: 32,
    color: '#414141',
  },
  cardContentHeader: {
    // fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 600,
  },
  cardSource: {
    fontSize: 18,
    fontWeight: 200,
    opacity: 0.5,
    marginTop: 10,
  },
  cardBody: {
    // fontFamily: 'Roboto',
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 400,
    marginTop: 10,
    // maxHeight: 400,
    overflow: 'auto',
  },
  rating: {
    marginTop: 16,
    display: 'flex',
    alignItems: 'center'
  },
  ratingText: {
    color: '#070707',
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: 16,
    opacity: 0.5,
    marginLeft: 6,
  },
  archiveBtnContainer: {
    marginTop: 16,
  },
  commentSection: {
    marginTop: 16,
  },
  commentHeader: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: 500,
    color: '#414141',
  },
  comments: {
    marginTop: 10,
    marginLeft: 8,
  },
  commentBox: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
  commentHead: {
    display: 'flex',
    alignItems: 'center',
  },
  commentUser: {
    color: '#4E157A',
    opacity: 0.97,
    fontSize: 18,
  },
  commentedAt: {
    color: '#414141',
    opacity: 0.5,
    fontSize: 16,
    fontWeight: 300,
  },
  commentBody: {
    fontStyle: 'italic',
    fontSize: 16,
    fontWeight: 300,
    marginTop: 8,
  },
  commentInput: {
    borderRadius: '10px 0 0 10px',
    border: '1px solid #4E157A',
    background: '#F0F0F0',
    padding: '18px 30px 18px 30px',
    width: '70%',
  },
  sendBtn: {
    backgroundColor: '#4E157A',
    borderRadius: '0px 10px 10px 0px',
    border: '#4E157A',
    padding: 13,
  },
});

export default CardView;
