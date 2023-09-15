import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ProfileCard from "./components/profileCard";
import MainHeader from "components/main-header";
import { getConfigMail, getUser } from "../../services/profile";
import { useRequest } from "ahooks";
import { Button } from "@mui/material";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    background:
      "var(--BG-Gradient, conic-gradient(from 270deg at 88.19% -14.65%, #FFF 0deg, #D39CFF 0.035999999090563506deg, #070707 360deg))",
    maxHeight: "100vh",
    minHeight: "100vh",
    width: "100%",
    color: "white",
  },
  centerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "24px",
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [redirectEmail, setRedirectEmail] = useState("");

  const { run: getProfile } = useRequest(getUser, {
    manual: true,
    onSuccess: (result) => {
      setUser(result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const { run: getConfigEmail } = useRequest(getConfigMail, {
    manual: true,
    onSuccess: (result) => {
      setRedirectEmail(result.redirect_email);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    getProfile();
    getConfigEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <MainHeader isFilterVisible={false} />
      <Container className={classes.centerContent}>
        <span
          style={{
            fontSize: "20px",
            marginBottom: "16px",
          }}
        >
          Personal Info
        </span>
        <ProfileCard user={user} redirectEmail={redirectEmail} />
        <Button
          disableElevation
          sx={{
            borderRadius: 56,
            backgroundColor: "#e7cbfd",
            color: "#414141",
            textTransform: "capitalize",
            padding: "6px 20px",
            width: '150px',
            marginTop: '12px',
            fontSize: '12px',
            ":hover": {
              background: "#e7cbfd",
            },
          }}
          variant="contained"
          startIcon={<ArchiveOutlinedIcon fill="#414141" />}
          onClick={() => navigate('/archive')}
        >
          View Archived
        </Button>
      </Container>
    </div>
  );
};

export default ProfilePage;
