import React, { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import { useRequest } from "ahooks";

import SetupCard from "./set-up-card";
import CopyTextBox from "./copy-text-box";

import Carousel from "components/carousel";
import { getConfigMail } from "../../services/profile";

import { ReactComponent as CuraterLogo } from "../../assets/curater_logo_dark.svg";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  container: {
    background:
      "var(--BG-Gradient, conic-gradient(from 270deg at 88.19% -14.65%, #FFF 0deg, #D39CFF 0.035999999090563506deg, #070707 360deg))",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    marginTop: "40px",
  },
  note: {
    color: "#F0F0F0",
    fontSize: "18px",
    fontStyle: "italic",
    fontWeight: 300,
    margin: "40px 30px",
  },
  contentWrapper: {
    width: "100%",
    padding: "20px",
  },
  copyTextBoxWrapper: {
    padding: "20px",
    height: "100%",
    paddingTop: "100px",
  },
});

export default function SetupPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [redirectEmail, setRedirectEmail] = useState("");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
    getConfigEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carousalItems = [
    <SetupCard
      items={[
        <div style={{ paddingBottom: 12 }}>1. Log into your email.</div>,
        <div style={{ paddingBottom: 12 }}>
          2. Find <span style={{ fontStyle: "italic" }}>Forwarding</span> in
          settings.
        </div>,
        <div style={{ paddingBottom: 12 }}>
          <div style={{ paddingBottom: 12 }}>
            3. Copy and add the following address.
          </div>
          <CopyTextBox text={redirectEmail} />
        </div>,
      ]}
    />,
    <SetupCard
      items={[
        <div style={{ paddingBottom: 12 }}>1. Return to settings.</div>,
        <div style={{ paddingBottom: 12 }}>2. Select the filter criteria.</div>,
        <div style={{ paddingBottom: 12 }}>
          <div style={{ paddingBottom: 12 }}>
            3. Copy the following and add to{" "}
            <span style={{ fontStyle: "italic" }}>From</span> filter.
          </div>
          <CopyTextBox text="*newsletter*@*.com, *@substack.com, *@*newsletter*.com" />
        </div>,
        <div style={{ paddingBottom: 12 }}>
          4. Choose the forwarding address created previously.
        </div>,
        <div style={{ paddingBottom: 12 }}>5. Save the filter.</div>,
      ]}
    />,
  ];

  return (
    <Box className={classes.container}>
      <Box className={classes.logo}>
        <CuraterLogo width="180px" height="40px" />
      </Box>
      <Box className={classes.note}>
        Thank you for choosing CuRater, just a small step before you dive in...
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "block", lg: "none" },
          m: "8px",
        }}
      >
        <Carousel
          items={carousalItems}
          onSlideChange={(newIndex) => {
            setActiveSlideIndex(newIndex);
          }}
          indexOfItemInFocus={activeSlideIndex}
        />
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "none", lg: "block" },
          m: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {carousalItems}
        </Box>
      </Box>
      <Button
        sx={{
          mt: "12px",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          textTransform: "none",
        }}
        endIcon={
          <SendIcon
            style={{
              width: "16px",
              height: "16px",
            }}
          />
        }
        onClick={
          activeSlideIndex === 0
            ? () => setActiveSlideIndex(1)
            : () => navigate("/", { replace: true })
        }
      >
        {activeSlideIndex === 0 ? "Next" : "Continue"}
      </Button>
    </Box>
  );
}
