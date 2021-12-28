import React, { useState } from "react";
import Layout from "../Core/Layout";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { signup } from "../auth";
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

const Signup = () => {
  const classes = useStyles();

  const initialState = {
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  };
  // create state variables for each input
  const [values, setValues] = useState(initialState);
  const { name, email, password, success, error } = values;

  const handleClearfields = () => {
    setValues({ ...initialState });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });

    handleClearfields();
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signUpForm = () => (
    <form>
      <div className={classes.root}>
        <TextField
          label="Name"
          variant="filled"
          required
          value={name}
          onChange={handleChange("name")}
        />
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
            Signup
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
  const showSucces = () => (
    <div style={{ display: success ? "" : "none" }}>
      <Alert severity="success">
        <AlertTitle>
          New account is created.Please <Link to="/signin">Signin!</Link>
        </AlertTitle>
      </Alert>
    </div>
  );

  return (
    <div>
      <Layout
        title="SignUp page"
        description="SignUp To Node React E-commerce App"
      >
        {showSucces()}
        {showError()}
        {signUpForm()}
        {/* {JSON.stringify(values)} */}
      </Layout>
    </div>
  );
};

export default Signup;
