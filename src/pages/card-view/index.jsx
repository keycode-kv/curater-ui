import {
  Button,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Rating,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ReactComponent as StarIcon } from "../../assets/rating-star.svg";
import { ReactComponent as CuratorLogoDarkIcon } from "../../assets/curater-logo-dark.svg";
import dummyData from "./dummy-data";
import { formatTimestamp } from "../../utils/datetime-utils";
import { useRequest } from "ahooks";
import {
  addCommentByContentId,
  archiveCardById,
  fetchCardById,
  fetchCollectionsUsingGet,
  fetchCommentsByContentId,
  rateCardById,
  saveCardById,
} from "services/cards";

const btnStyles = {
  borderRadius: 56,
  backgroundColor: "#e7cbfd",
  color: "#414141",
  textTransform: "capitalize",
  paddingLeft: "24px",
  paddingRight: "24px",
  ":hover": {
    background: "#e7cbfd",
  },
};

const MobileCardView = ({
  card,
  comments,
  handleRatingChange,
  handleArchiveClick,
  archived = false,
  collections,
  handleSave,
  saved = false,
  handlePostComment,
  comment,
  setComment,
}) => {
  const navigate = useNavigate();
  const classes = useMobileCardViewStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSave1 = (collectionId) => {
    handleSave(collectionId);
    handleClose();
  };
  const handleKeyPress = (e) => {
    // Check if the Enter key was pressed (keycode 13 or key value "Enter")
    if (e.key === "Enter") {
      // Trigger your action here
      handlePostComment();
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <IconButton onClick={() => navigate(-1, { replace: true })}>
          <CloseIcon sx={{ color: "#414141" }} />
        </IconButton>
        <CuratorLogoDarkIcon />
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {saved ? (
            <BookmarkIcon sx={{ color: "#4E157A" }} />
          ) : (
            <BookmarkBorderIcon sx={{ color: "#4E157A" }} />
          )}
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {collections.map((collection) => (
            <MenuItem
              key={collection.id}
              onClick={() => handleSave1(collection.id)}
            >
              {collection.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className={classes.cardContent}>
        {/* <div className={classes.cardContentHeader}>{card.title}</div> */}
        {/* <div className={classes.cardSource}>{card.source}</div> */}
        <div
          className={classes.cardBody}
          dangerouslySetInnerHTML={{ __html: card.content }}
        />
        {/* <iframe
          title="Rendered HTML"
          srcDoc={card.content}
          width="100%"
          height="600" // You can adjust the height as needed
        /> */}
      </div>
      <div className={classes.rating}>
        <Rating
          name="card-rating"
          value={card.rating}
          onChange={(event, newValue) => {
            handleRatingChange(newValue);
          }}
          icon={<StarIcon fill="#D39CFF" />}
          emptyIcon={<StarIcon />}
        />
        <div className={classes.ratingText}>Give your rating</div>
      </div>
      <div className={classes.archiveBtnContainer}>
        <Button
          disableElevation
          sx={btnStyles}
          variant="contained"
          startIcon={<ArchiveOutlinedIcon fill="#414141" />}
          onClick={handleArchiveClick}
        >
          {archived ? "Archived" : "Archive"}
        </Button>
      </div>
      <div className={classes.commentSection}>
        <div className={classes.commentHeader}>Comments</div>
        <div className={classes.comments}>
          {comments.map((comment) => (
            <div style={{ marginBottom: 12 }}>
              <div className={classes.commentHead}>
                <div className={classes.commentUser}>{comment.user}</div>
                <div className={classes.commentedAt}>
                  &nbsp;| {formatTimestamp(comment.commented_at)}
                </div>
              </div>
              <div className={classes.commentBody}>{comment.comment}</div>
            </div>
          ))}
        </div>
        <div className={classes.commentBox}>
          <input
            placeholder="Type your comment"
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
            className={classes.commentInput}
            onKeyUp={handleKeyPress}
          />
          <div className={classes.sendBtn} onClick={handlePostComment}>
            <SendIcon sx={{ color: "#fafafa", width: 14 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopCardView = ({ card, comments }) => {
  const classes = useDesktopCardViewStyles();
  return <Grid className={classes.container}>Card view</Grid>;
};

const CardView = () => {
  const { cardId } = useParams();
  const [archived, setArchived] = useState(false);
  const [collections, setCollections] = useState([]);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState(dummyData.comments);
  const [comment, setComment] = useState("");
  const [card, setCard] = useState(dummyData.card);

  const { run: fetchCard } = useRequest(fetchCardById, {
    manual: true,
    onSuccess: (response) => {
      setCard(response);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const { run: archiveCard } = useRequest(archiveCardById, {
    manual: true,
    onSuccess: (response) => {
      setArchived(true);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const { run: getCollections } = useRequest(fetchCollectionsUsingGet, {
    manual: true,
    onSuccess: (response) => {
      setCollections(response.collections);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const { run: saveCard } = useRequest(saveCardById, {
    manual: true,
    onSuccess: (response) => {
      setSaved(true);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const { run: rateCard } = useRequest(rateCardById, {
    manual: true,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const { run: fetchComments } = useRequest(fetchCommentsByContentId, {
    manual: true,
    onSuccess: (response) => {
      setComments(response.comments);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const { run: postComment } = useRequest(addCommentByContentId, {
    manual: true,
    onSuccess: (response) => {
      console.log(response);
      setComment("");
      if (card.content_id) {
        fetchComments(card.content_id);
      }
    },
    onError: (e) => {
      console.error(e);
    },
  });

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchCard(cardId);
  }, [cardId, fetchCard]);

  useEffect(() => {
    if (card.content_id) {
      fetchComments(card.content_id);
    }
  }, [card.content_id, fetchComments]);

  const handleRatingChange = (newRating) => {
    // Api call
    rateCard(card.content_id, newRating);
    setCard({ ...card, rating: newRating });
  };
  const handleArchiveClick = () => {
    // Api call
    archiveCard(cardId);
  };
  const handleSave = (collectionId) => {
    // Api call
    saveCard(cardId, collectionId);
  };
  const handlePostComment = () => {
    //Api call
    postComment(card.content_id, comment);
  };
  return (
    <>
      {/* Render MobileComponent on screens smaller than 'md' */}
      <Hidden mdUp>
        <MobileCardView
          card={card}
          comments={comments}
          handleRatingChange={handleRatingChange}
          handleArchiveClick={handleArchiveClick}
          archived={archived}
          collections={collections}
          handleSave={handleSave}
          saved={saved}
          handlePostComment={handlePostComment}
          comment={comment}
          setComment={setComment}
        />
      </Hidden>

      {/* Render DesktopComponent on screens 'md' and larger */}
      <Hidden smDown>
        <DesktopCardView card={card} comments={comments} />
      </Hidden>
    </>
  );
};

const useDesktopCardViewStyles = makeStyles({
  container: {
    height: "80vh",
    width: "80%",
    margin: "auto",
    marginTop: 50,
    borderRadius: 30,
    border: "5px solid var(--Dark-Purple, #4E157A)",
    background: "var(--White, #FAFAFA)",
    boxShadow: "15px 15px 0px 0px rgba(211, 156, 255, 0.25)",
  },
});

const useMobileCardViewStyles = makeStyles({
  container: {
    minHeight: "100vh",
    background: "var(--White, #FAFAFA)",
    padding: "50px 36px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  cardContent: {
    marginTop: 32,
    color: "#414141",
  },
  cardContentHeader: {
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
    overflowY: "auto",
    overflowX: "auto",
    marginTop: -80,
  },
  rating: {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
  },
  ratingText: {
    color: "#070707",
    fontStyle: "italic",
    fontWeight: "normal",
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
    fontStyle: "italic",
    fontWeight: 500,
    color: "#414141",
  },
  comments: {
    marginTop: 10,
    marginLeft: 8,
  },
  commentBox: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  commentHead: {
    display: "flex",
    alignItems: "center",
  },
  commentUser: {
    color: "#4E157A",
    opacity: 0.97,
    fontSize: 18,
  },
  commentedAt: {
    color: "#414141",
    opacity: 0.5,
    fontSize: 16,
    fontWeight: 300,
  },
  commentBody: {
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: 300,
    marginTop: 8,
  },
  commentInput: {
    borderRadius: "10px 0 0 10px",
    border: "1px solid #4E157A",
    background: "#F0F0F0",
    padding: "18px 30px 18px 30px",
    width: "70%",
  },
  sendBtn: {
    backgroundColor: "#4E157A",
    borderRadius: "0px 10px 10px 0px",
    border: "#4E157A",
    padding: 13,
  },
});

export default CardView;
