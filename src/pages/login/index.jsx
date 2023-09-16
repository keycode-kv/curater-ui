import { useRequest } from "ahooks";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { login, signUp } from "../../services/login";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CuraterLogo } from "../../assets/curater_logo_dark.svg";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh", // Make the container take the full viewport height
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  paper: {
    padding: theme.spacing(3),
    width: "60%", // Default width for mobile devices
    [theme.breakpoints.up("md")]: {
      width: "30%", // 30% width for devices with screen width >= 960px
    },
    //height: '70%',
    borderRadius: 10, // Border radius
    border: `5px solid #4E157A`,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    margin: theme.spacing(1),
    "& .MuiInputBase-input::placeholder": {
      textAlign: "center", // Center-align the placeholder text
    },
    "& .MuiInputBase-root": {
      border: "none",
      borderRadius: 50, // Border radius for TextField
      backgroundColor: "rgba(211, 156, 255, 0.3)", // Background color with 30% opacity
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none", // Remove the default border
    },
    "& label.Mui-focused": {
      transform: "translate(0, 0)", // Adjust the X and Y translation as needed
    },
    width: "90%",
  },
  submitButton: {
    backgroundColor: "#4E157A", // Background color
    color: "#FFFFFF", // Text color
    borderRadius: 50, // Border radius
    padding: "8px 32px", // Adjust padding as needed
    "&:hover": {
      backgroundColor: "#3A0F59", // Change background color on hover
    },
    width: "50%",
    textTransform: "none",
    font: "Roboto",
    margin: "8px 0",
    whiteSpace: "nowrap",
  },
  selectedButton: {
    color: "#4E157A", // Text color for selected button
    textTransform: "none",
    font: "Roboto",
    fontSize: "20px",
    fontWeight: 600,
  },
  unSelectedButton: {
    color: "rgba(78,21,122,0.5)", // Text color for selected button
    textTransform: "none",
    font: "Roboto",
    fontSize: 20,
    fontWeight: 400,
  },
  separator: {
    fontSize: "1.2rem",
  },
  buttonContainer: {
    paddingBottom: 30,
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  iconButton: {
    backgroundColor: "#4E157A",
    color: "#FFFFFF",
    margin: theme.spacing(0, 1),
    "&:hover": {
      backgroundColor: "#3A0F59", // Change color on hover if desired
    },
  },
  orBody: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    color: "#414141",
    fontSize: 15,
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const { run: handleLogin } = useRequest(login, {
    manual: true,
    onSuccess: (result) => {
      console.log("Login Success", result);
      localStorage.setItem("auth_token", result.token);
      navigate("/");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const { run: handleSignup } = useRequest(signUp, {
    manual: true,
    onSuccess: (result) => {
      console.log("SignUp Success", result);
      localStorage.setItem("auth_token", result.token);
      navigate("/set-up");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSubmit = () => {
    // Check for validation and handle login logic here
    if (email.trim() === "") {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }

    if (password.trim() === "") {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }

    if (selected === "signup" && name.trim() === "") {
      setShowNameError(true);
    } else {
      setShowNameError(false);
    }

    if (selected === "login") handleLogin({ email: email, password: password });
    else handleSignup({ email: email, name: name, password: password });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
            <Box style={{position: 'absolute', top: '10%',right:'30%'}}>
        <CuraterLogo width="180px" height="40px" />
      </Box>
      <Grid container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <form className={classes.form}>
            <div className={classes.buttonContainer}>
              <Button
                variant="text"
                className={
                  selected === "login"
                    ? classes.selectedButton
                    : classes.unSelectedButton
                }
                onClick={() => handleSelect("login")}
              >
                Login
              </Button>
              <span className={classes.separator}>|</span>
              <Button
                variant="text"
                className={
                  selected === "signup"
                    ? classes.selectedButton
                    : classes.unSelectedButton
                }
                onClick={() => handleSelect("signup")}
              >
                Signup
              </Button>
            </div>
            <TextField
              placeholder="Email"
              variant="outlined"
              className={classes.textField}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {showEmailError && (
              <ValidationMessage message="Email is required." />
            )}
            {selected === "signup" && (
              <TextField
                placeholder="Name"
                variant="outlined"
                className={classes.textField}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            )}
            {selected === "signup" && showNameError && (
              <ValidationMessage message="Name is required." />
            )}
            <TextField
              placeholder="Password"
              variant="outlined"
              type="password"
              className={classes.textField}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {showPasswordError && (
              <ValidationMessage message="Password is required." />
            )}
            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={handleSubmit}
            >
              {selected === "login" ? "Log in" : "Sign up"}
            </Button>
          </form>
          <div className={classes.orBody}>
            <span>--- OR ---</span>
          </div>
          <div className={classes.socialIcons}>
            <IconButton className={classes.iconButton}>
              <FacebookIcon />
            </IconButton>
            <IconButton className={classes.iconButton}>
              <GoogleIcon />
            </IconButton>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

const ValidationMessage = ({ message }) => {
  return (
    <Typography variant="body2" color="error">
      {message}
    </Typography>
  );
};

const Login = () => (
  <Routes>
    <Route path="*" element={<LoginPage />} />
  </Routes>
);

export default Login;
