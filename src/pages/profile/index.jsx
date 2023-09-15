import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SubNavbar from "./components/subNavbar";
import ProfileCard from "./components/profileCard";
import MainHeader from "components/main-header"
import { getConfigMail, getUser } from "../../services/profile";
import { useRequest } from "ahooks";

const useStyles = makeStyles((theme) => ({
  container: {
    background:
      "var(--BG-Gradient, conic-gradient(from 270deg at 88.19% -14.65%, #FFF 0deg, #D39CFF 0.035999999090563506deg, #070707 360deg))",
    maxHeight: "100vh",
    minHeight: '100vh',
    width: "100%",
    color: "white",
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}));

const ProfilePage = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectEmail,setRedirectEmail] = useState('');
  const [activeButton, setActiveButton] = useState('profile'); // 'profile' is focused by default
  const { loading: profileSuccess, run: getProfile } = useRequest(getUser, {
    manual: true,
    onSuccess: result => {
      console.log('User recieved', result);
      setUser(result);
    },
    onError: e => {
      console.log(e);
    },
  });

  const { loading: ConfigSuccess, run: getConfigEmail } = useRequest(getConfigMail, {
    manual: true,
    onSuccess: result => {
      console.log('Email recieved', result);
      setRedirectEmail(result.redirect_email);
    },
    onError: e => {
      console.log(e);
    },
  });

  useEffect(() => {
    getProfile();
    getConfigEmail();
    console.log("Calling");
  }, []);

  return (
    <div className={classes.container}>
      <MainHeader />
      <SubNavbar activeButton={activeButton} setActiveButton={setActiveButton} />
      <Container className={classes.centerContent}>
        {activeButton === 'profile' && <div ><ProfileCard user={user} redirectEmail={redirectEmail} /></div>}
      </Container>
    </div>
  );
};

export default ProfilePage;
