import React, { useEffect, useState } from "react";
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
import { useRequest } from "ahooks";

import { useTagsStore } from "stores/tags";
import MainCard from "../../components/main-card";
import MainHeader from "../../components/main-header";
import {
  fetchCardsListUsingGet,
  fetchCollectionsUsingGet,
} from "../../services/cards";

import {
  useStyles,
  TextFieldInputSxProps,
  MenuPropsSxProps,
  SelectSxProps,
} from "./styles";

const SavedCardsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { selectedTags, setSelectedTags } = useTagsStore();

  const [item, setItem] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [collections, setCollections] = useState([]);

  const { run: getCollections } = useRequest(fetchCollectionsUsingGet, {
    manual: true,
    onSuccess: (res) => {
      setCollections(res?.collections);
      setItem(res?.collections[0].id);
      getCardsList({ type: "saved", collection: res?.collections?.[0]?.id });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { run: getCardsList, data: cardsList } = useRequest(
    fetchCardsListUsingGet,
    {
      manual: true,
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleItemSelect = (event) => {
    setSelectedTags({});
    setSearchInput("");
    const { value } = event.target;
    setItem(value);
    getCardsList({ collection: value, type: "saved" });
  };

  const handleValueChange = (e) => {
    setSearchInput(e.target.value);
    getCardsList({
      type: "saved",
      search: e.target.value,
      collection: item,
      tags: selectedTags,
    });
  };

  useEffect(() => {
    getCollections();
    return () => {
      setSelectedTags({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid item className={classes.container}>
      <MainHeader
        getCardsList={getCardsList}
        type="saved"
        collection={item}
        search={searchInput}
      />
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
              {collections?.map((collection) => (
                <MenuItem value={collection.id}>{collection.name}</MenuItem>
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
            autoComplete="off"
          />
        </Grid>
        <Grid className={classes.cardContainer}>
          {cardsList?.cards?.map((item) => (
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
