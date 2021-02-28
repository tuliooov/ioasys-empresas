//REACT
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//FILES PROJECT
import logo from "../assets/logo-nav.png";
import logo2 from "../assets/logo-nav@2x.png";
import logo3 from "../assets/logo-nav@3x.png";

//MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";

//icons
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoDiv: {
    flexGrow: 1,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    display: "block",
    height: "2rem",
  },
  logo: {
    height: "2rem",
  },
  logoWidthZero: {
    width: "0px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    // display:'none',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    "&:focus": {
      width: "100%",
    },
  },
}));

export default function AppBarToolBar(props) {
  const { setSearchName, searchName, backPage = false, title = "" } = props;
  const classes = useStyles();
  const history = useHistory();

  const [search, setSearch] = useState(false);
  if (backPage) {
    return (
      <React.Fragment>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <IconButton
              style={{ color: "white" }}
              type="submit"
              onClick={() => {
                history.goBack();
              }}
              className={classes.iconButton}
              aria-label="Voltar"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography style={{ marginLeft: 10 }}>{title}</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </React.Fragment>
    );
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <div
            className={classes.logoDiv}
            id="div-logo-search"
            style={search ? { width: "0px" } : {}}
          >
            <img
              src={logo}
              srcSet={`${logo} 300w, ${logo2} 768w, ${logo3} 1280w`}
              className={classes.logo}
              alt="logo ioasys"
              id="logo-search"
              style={search ? { width: "0px" } : {}}
            />
          </div>

          <IconButton
            style={{ color: "white" }}
            type="submit"
            onClick={() => {
              document.getElementById("input-search").focus();
            }}
            className={classes.iconButtonRigth}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            style={
              search
                ? { color: "white", width: "100%" }
                : { color: "white", width: "0px" }
            }
            onFocus={() => {
              setSearch(true);
            }}
            onBlur={() => {
              setSearch(false);
            }}
            value={searchName}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            placeholder="Search..."
            endAdornment={
              <InputAdornment
                position="end"
                style={search ? { display: "" } : { display: "none" }}
              >
                <IconButton
                  style={{ color: "white" }}
                  aria-label="Close Search"
                  onClick={() => {
                    setSearchName("");
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
            inputProps={{
              "aria-label": "Search Enterprise",
              id: "input-search",
            }}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
