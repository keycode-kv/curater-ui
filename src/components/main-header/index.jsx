import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button, Drawer, Grid, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { ReactComponent as DrawerIcon } from "../../assets/menu_drawer_icon.svg";
import { ReactComponent as CuraterLogo } from "../../assets/curater_logo_dark.svg";
import { ReactComponent as FilterIcon } from "../../assets/filter_icon.svg";
import { ReactComponent as SelectLine } from "../../assets/menu_select_line.svg";
import { ReactComponent as UpgradeIcon } from "../../assets/upgrade_icon.svg";

const useStyles = makeStyles({
  mt12: {
    marginTop: "12px",
  },
  drawerWrapper: {
    padding: "64px 0 0 40px",
  },
  optionWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  mr6: {
    marginRight: "6px",
  },
});

const HeaderWrapperSx = {
  padding: "30px 18px 10px 18px",
  display: "flex",
  width: "100%",
  alignItems: "center",
  color: "white",
  justifyContent: "space-between",
};

const DrawerSx = {
  width: "250px",
  background: "#D39CFF",
};

const GoPremiumSx = {
  position: "absolute",
  bottom: 28,
  left: 35,
  borderRadius: "53px",
  background: "#4E157A",
  padding: "8px 28px",
  width: "180px",
  textTransform: "none",
  color: "#D39CFF",
  fontSize: "14px",
  fontWeight: 400,
  ":hover": {
    background: "#4E157A",
  },
};

const MainHeader = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen((prevState) => !prevState);
  };

  const handleFilterButtonClick = () => {
    // handleFilterButtonClick fn
  };

  const handleHomeClick = () => {
    // handleHomeClick fn
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSavedClick = () => {
    navigate("/saved");
  };

  return (
    <>
      <Grid container sx={HeaderWrapperSx}>
        <IconButton sx={{ padding: 0 }} onClick={toggleDrawer()}>
          <DrawerIcon />
        </IconButton>
        <CuraterLogo className={classes.mt12} />
        <IconButton sx={{ padding: 0 }} onClick={handleFilterButtonClick}>
          <FilterIcon />
        </IconButton>
      </Grid>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer()}
        PaperProps={{
          sx: DrawerSx,
        }}
      >
        <div className={classes.drawerWrapper}>
          <>
            <div
              className={classes.optionWrapper}
              onClick={handleHomeClick}
              role="presentation"
            >
              Home
              {pathname === "/" && <SelectLine />}
            </div>
            <div
              className={classes.optionWrapper}
              onClick={handleProfileClick}
              role="presentation"
            >
              Profile
              {pathname === "/profile" && <SelectLine />}
            </div>
            <div
              className={classes.optionWrapper}
              onClick={handleSavedClick}
              role="presentation"
            >
              Saved
              {pathname === "/saved" && <SelectLine />}
            </div>
          </>
          <Button sx={GoPremiumSx}>
            <UpgradeIcon className={classes.mr6} />
            Go Premium
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default MainHeader;
