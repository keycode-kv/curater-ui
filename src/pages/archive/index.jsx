import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Grid, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRequest } from "ahooks";

import MainCard from "../../components/main-card";
import MainHeader from "../../components/main-header";

import { useStyles, TextFieldInputSxProps } from "./styles";
import { fetchCardsListUsingGet } from "services/cards";
import { useTagsStore } from "stores/tags";

const ArchiveCardsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { selectedTags, setSelectedTags } = useTagsStore();

  const [searchInput, setSearchInput] = useState("");

  const { run: getCardsList, data: cardsList } = useRequest(
    fetchCardsListUsingGet,
    {
      manual: true,
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleValueChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    getCardsList({
      type: "archived",
      search: value,
      tags: selectedTags,
    });
  };

  useEffect(() => {
    getCardsList({ type: "archived" });
    return () => {
      setSelectedTags({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid item className={classes.container}>
      <MainHeader
        getCardsList={getCardsList}
        type="archived"
        search={searchInput}
        isFilterVisible
      />
      <Grid item className={classes.contentWrapper} xs={12}>
        <Grid className={classes.cardHeader} xs={12}>
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

export default ArchiveCardsPage;
