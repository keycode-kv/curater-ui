import React from "react";

import { Box, IconButton } from "@mui/material";

import copy from "copy-to-clipboard";
import { ReactComponent as CopyToClipboardIcon } from "assets/copy-to-clipboard-icon.svg";

const CopyTextBox = ({ text }) => {
  const shortendText =
    text?.length > 20 ? `${text?.substring(0, 18)}...` : text;

  return (
    <Box
      sx={{
        borderRadius: "15px",
        border: "1.5px dashed #4E157A",
        backgroundColor: "#e6e6e6",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>{shortendText}</div>
      <IconButton onClick={() => copy(text ?? "")} sx={{ padding: 0 }}>
        <CopyToClipboardIcon style={{ width: "20px", height: "20px" }} />
      </IconButton>
    </Box>
  );
};

export default CopyTextBox;
