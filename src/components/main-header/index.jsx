import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Button,
  Checkbox,
  Drawer,
  Grid,
  IconButton,
  Popover,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRequest } from "ahooks";

import { fetchTagsListUsingGet } from "services/cards";
import { useTagsStore } from "stores/tags";

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
  background: "#C5B3D4",
};

const GoPremiumButtonSx = {
  position: "absolute",
  bottom: 28,
  left: 35,
  borderRadius: "53px",
  background: "#4E157A",
  padding: "8px 28px",
  width: "180px",
  textTransform: "none",
  color: "#C5B3D4",
  fontSize: "14px",
  fontWeight: 400,
  ":hover": {
    background: "#4E157A",
  },
};

const MainHeader = ({ getCardsList, type, collection, search, isFilterVisible }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const { selectedTags, setSelectedTags } = useTagsStore();

  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { run: getTagsList, data } = useRequest(fetchTagsListUsingGet, {
    manual: true,
    onError: (err) => {
      console.log(err);
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen((prevState) => !prevState);
  };

  const handleFilterButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSavedClick = () => {
    navigate("/saved");
  };
  
  const handleLogout = () => {
    navigate("/login");
  };

  const handleChange = (checked, item) => {
    const newTags = { ...selectedTags, [item]: checked };
    setSelectedTags(newTags);
    getCardsList({
      type,
      collection,
      search,
      tags: Object.entries(newTags)
        .filter((item) => item[1])
        .map((item) => item[0]),
    });
  };

  useEffect(() => {
    getTagsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container sx={HeaderWrapperSx}>
        <IconButton sx={{ padding: 0 }} onClick={toggleDrawer()}>
          <DrawerIcon />
        </IconButton>
        <CuraterLogo className={classes.mt12} />
        <IconButton sx={{ padding: 0 }} onClick={handleFilterButtonClick} style={{
          visibility: isFilterVisible ? 'visible' : 'hidden'
        }}>
          <FilterIcon />
        </IconButton>
      </Grid>

      {/* Filter Popover begins here */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          ".MuiPopover-paper": {
            padding: "20px 20px 20px 10px",
            marginTop: "5px",
            background:
              "var(--BG-Gradient, conic-gradient(from 270deg at 88.19% -14.65%, #FFF 0deg, #D39CFF 0.035999999090563506deg, #070707 360deg))",
            color: "#FFFFFF",
            height: "200px",
          },
        }}
      >
        {data?.tags?.map((item) => (
          <div>
            <Checkbox
              checked={selectedTags[item]}
              onChange={(e) => handleChange(e.target.checked, item)}
              sx={{ color: "white" }}
            />
            {item}
          </div>
        ))}
      </Popover>
      {/* Filter Popover ends here */}

      {/* Left drawer starts here */}
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
            <div
              className={classes.optionWrapper}
              onClick={handleLogout}
              role="presentation"
            >
              Logout
              {pathname === "/logout" && <SelectLine />}
            </div>
          </>
          <Button sx={GoPremiumButtonSx}>
            <UpgradeIcon className={classes.mr6} />
            Go Premium
          </Button>
        </div>
      </Drawer>
      {/* Left drawer ends here */}
    </>
  );
};

export default MainHeader;
