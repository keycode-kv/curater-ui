import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    background:
      "var(--BG-Gradient, conic-gradient(from 270deg at 88.19% -14.65%, #FFF 0deg, #D39CFF 0.035999999090563506deg, #070707 360deg))",
    maxHeight: "100vh",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  contentWrapper: {
    width: "100%",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    color: "white",
    marginBottom: "20px",
    padding: "20px 20px 4px 20px",
  },
  whiteIcon: {
    color: "white",
  },
  cardContainer: {
    overflow: "auto",
    height: "calc(100vh - 175px)",
    padding: "0 22px",
  },
});

export const TextFieldInputSxProps = {
  "& .MuiOutlinedInput-root": {
    width: 160,
    height: 46,
    padding: "0px 8px",
    fontSize: 14,
    color: "white",
    lineHeight: "16px",
    border: "2px solid #B4B4B4",
    borderRadius: "42px",
    "&.Mui-focused fieldset": {
      border: "1px solid #24293C",
    },
  },
};
