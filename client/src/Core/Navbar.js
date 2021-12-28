import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { signout, isAuthenticated } from "../auth";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(30),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      /* borderBottom: "1px solid white", */
    },
  },
}));

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "yellow" };
  } else {
    return { color: "#ffffff" };
  }
};
const Navbar = ({ history }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        {/* menu toobar */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {/* link */}
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link} style={isActive(history, "/")}>
            Home
          </Link>
          <Link
            to="/user/dashboard"
            className={classes.link}
            style={isActive(history, "/user/dashboard")}
          >
            Dashboard
          </Link>
          {!isAuthenticated() && (
            <>
              <Link
                to="/Signin"
                className={classes.link}
                style={isActive(history, "/Signin")}
              >
                SignIn
              </Link>
              <Link
                to="/Signup"
                className={classes.link}
                style={isActive(history, "/Signup")}
              >
                SignUp
              </Link>
            </>
          )}
          {/* 
          user dashboard
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Link
              to="/user/dashboard"
              className={classes.link}
              style={isActive(history, "/user/dashboard")}
            >
              Dashboard
            </Link>
          )} 

        admin dashboard
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Link
              to="/admin/dashboard"
              className={classes.link}
              style={isActive(history, "/admin/dashboard")}
            >
              Dashboard
            </Link>
          )}*/}

          {isAuthenticated() && (
            <span
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
              className={classes.link}
              style={{ cursor: "pointer", color: "#ffff" }}
            >
              SignOut
            </span>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
