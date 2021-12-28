import React, { useState } from "react";
import Layout from "../Core/Layout";
import { makeStyles, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import { signin, authenticate, isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "550px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const Signin = () => {
  const classes = useStyles();

  const initialState = {
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  };
  // create state variables for each input
  const [values, setValues] = useState(initialState);
  const { name, email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleClearfields = () => {
    setValues({ ...initialState });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });

    handleClearfields();
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signInForm = () => (
    <form>
      <div className={classes.root}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          value={email}
          onChange={handleChange("email")}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={handleChange("password")}
        />
        <div>
          <Button variant="contained" onClick={handleClearfields}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Signin
          </Button>
        </div>
      </div>
    </form>
  );

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>
      <Alert severity="error">
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    </div>
  );
  const showLoading = () =>
    loading && (
      <div className="div">
        <Alert severity="info">
          <AlertTitle>Loading ...</AlertTitle>
        </Alert>
      </div>
    );
  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div>
      <Layout
        title="SignUp page"
        description="SignUp To Node React E-commerce App"
      >
        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
        {/* {JSON.stringify(values)} */}
      </Layout>
    </div>
  );
};

export default Signin;
