import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { createCategory } from "./ApiAdmin";
import { Alert, AlertTitle } from "@material-ui/lab";

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
const AddCategory = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleClearfield = () => {
    setName("");
  };

  const handleChange = (name) => (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //page not reloaded
    setError("");
    setSuccess(false);
    //make request to API to create Categorie
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
    handleClearfield();
  };

  const newCategoryForm = () => (
    <form>
      <div className={classes.root}>
        <TextField
          label="Name"
          variant="filled"
          type="text"
          required
          value={name}
          onChange={handleChange("name")}
          autoFocus
        />
        <div>
          <Button variant="contained" onClick={handleClearfield}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Create Category
          </Button>
        </div>
      </div>
    </form>
  );

  const showError = () => (
    <div>
      <Alert severity="error">
        <AlertTitle>Category should be unique</AlertTitle>
      </Alert>
    </div>
  );
  const showSuccess = () =>
    success && (
      <div>
        <Alert severity="success">
          <AlertTitle>{name} is created.Please</AlertTitle>
        </Alert>
      </div>
    );
  const goback = () => (
    <Button type="submit" variant="contained" color="primary">
      <Link to="/admin/dashboard"> Back to dashboard</Link>
    </Button>
  );
  return (
    <div>
      <Layout
        title="Add a new category"
        description={`G'day ${user.name}, ready to add a new category?`}
      >
        {showError()}
        {showSuccess()}
        {newCategoryForm()}
        {/* {JSON.stringify(values)} */}
      </Layout>
    </div>
  );
};
export default AddCategory;
