import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import MainCard from "../../components/main-card";
import MainHeader from "../../components/main-header";

import {
  useStyles,
  TextFieldInputSxProps,
  MenuPropsSxProps,
  SelectSxProps,
} from "./styles";
import { useRequest } from "ahooks";
import { fetchCollectionsUsingGet } from "../../services/cards";

const mockData = [
  {
    id: "id_123",
    title: "heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Metus cras at odio ante nulla ac.",
    rating: 3.55,
    view_count: 1432,
    source_email: "joobi@test.com",
    tags: ["golang", "backend", "programming"],
    comments_count: 1562,
    duration: 1,
  },
  {
    id: "id_1444",
    title: "heading",
    content: "gist of the newsletter",
    rating: 3.55,
    view_count: 1432,
    source_email: "joobi@test.com",
    tags: ["golang", "backend", "programming"],
    comments_count: 1562,
    duration: 2,
  },
  {
    id: "id_1234",
    title: "heading",
    content: "gist of the newsletter",
    rating: 3.55,
    view_count: 1432,
    source_email: "joobi@test.com",
    tags: ["golang", "backend", "programming"],
    comments_count: 1562,
    duration: 3,
  },
];

const SavedCardsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { run } = useRequest(fetchCollectionsUsingGet, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [item, setItem] = useState("Read Later");
  const [searchInput, setSearchInput] = useState("");

  const handleItemSelect = (event) => {
    setItem(event.target.value);
  };

  const handleValueChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Grid item className={classes.container}>
      <MainHeader />
      <Grid item className={classes.contentWrapper} xs={12}>
        <Grid className={classes.cardHeader} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={item}
              onChange={handleItemSelect}
              variant="standard"
              disableUnderline
              sx={SelectSxProps}
              MenuProps={{
                PaperProps: {
                  sx: MenuPropsSxProps,
                },
              }}
            >
              {["Read Later", "Collection 1", "Collection 2"].map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={classes.whiteIcon} />
                </InputAdornment>
              ),
            }}
            value={searchInput}
            sx={TextFieldInputSxProps}
            placeholder="Search Titles"
            variant="outlined"
            onChange={handleValueChange}
          />
        </Grid>
        <Grid className={classes.cardContainer}>
          {mockData.map((item) => (
            <div onClick={() => navigate(`/card/${item.id}`)}>
              <MainCard item={item} isMainCard={false} />
            </div>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SavedCardsPage;
