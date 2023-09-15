import React from 'react';

import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import SetupCard from './set-up-card';
import CopyTextBox from './copy-text-box';

import Carousel from 'components/carousel';

import { ReactComponent as CuraterLogo } from "../../assets/curater_logo_dark.svg";
import { ReactComponent as SearchingLooking } from "../../assets/searching-looking.svg";
import { ReactComponent as WorkflowTeamWork } from "../../assets/workflow-team-work.svg";


const useStyles = makeStyles({
  container: {
    background:
      "var(--BG-Gradient, conic-gradient(from 270deg at 88.19% -14.65%, #FFF 0deg, #D39CFF 0.035999999090563506deg, #070707 360deg))",
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    marginTop: '40px',
  },
  note: {
    color: '#F0F0F0',
    fontSize: '20px',
    fontStyle: 'italic',
    fontWeight: 300,
    margin: '40px 30px'
  },
  contentWrapper: {
    width: "100%",
    padding: "20px",
  },
  copyTextBoxWrapper: {
    padding: "20px",
    height: '100%',
    paddingTop: '100px'
  }
});

export default function SetupPage() {
  const classes = useStyles();

  const carousalItems = [
    <SetupCard
      image={<SearchingLooking />}
      content="Lorem ipsum dolor sit amet consectetur. Iaculis consequat viverra."
    />,
    <SetupCard
      image={<WorkflowTeamWork />}
      content="Lorem ipsum dolor sit amet consectetur. Iaculis consequat viverra."
    />,
    <SetupCard
      image={
        <div className={classes.copyTextBoxWrapper}>
          <CopyTextBox
            text="affefvevdwvdwvdwvdv@curater.inc"
          />
        </div>
      }
      content="Your redirection email."
    />
  ];

  return (
    <Box className={classes.container}>
      <Box className={classes.logo}>
        <CuraterLogo width="248px" height="58px" />
      </Box>
      <Box className={classes.note}>
        Thank you for choosing CuRater, just a small step before you dive in...
      </Box>
      <Box sx={{
        display: { xs: 'block', md: 'block', lg: 'none' },
        m: '8px'
      }}>
        <Carousel
          items={carousalItems}
        />
      </Box>

      <Box sx={{
        display: { xs: 'none', md: 'none', lg: 'block' },
        m: '8px'
      }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2
          }}
        >
          <SetupCard
            image={<SearchingLooking />}
            content="Lorem ipsum dolor sit amet consectetur. Iaculis consequat viverra."
          />
          <SetupCard
            image={<WorkflowTeamWork />}
            content="Lorem ipsum dolor sit amet consectetur. Iaculis consequat viverra."
          />
          <SetupCard
            image={
              <div className={classes.copyTextBoxWrapper}>
                <CopyTextBox
                  text="affefvevdwvdwvdwvdv@curater.inc"
                />
              </div>
            }
            content="Your redirection email."
          />
        </Box>

      </Box>
    </Box>
  );
} 
