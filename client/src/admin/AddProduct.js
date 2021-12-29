import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { createCategory } from "./ApiAdmin";
import { Alert, AlertTitle } from "@material-ui/lab";
import { createProduct } from "./ApiAdmin";

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
const AddProduct = () => {
  const classes = useStyles();
  const initialState = {
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: "",
    error: "",
    createdProduct: "",
    readirectToProfile: false,
    formData: "",
  };
  const [values, setValues] = useState(initialState);

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,

    loading,
    error,
    createdProduct,
    readirectToProfile,
    formData,
  } = values;
  //destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleClearfield = () => {
    setValues({ ...initialState });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //page not reloaded
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
    handleClearfield();
  };

  const newProductForm = () => (
    <form>
      {/*  TO REPLCE WITH image picker */}
      <div className={classes.root}>
        <TextField
          label="photo"
          variant="filled"
          type="text"
          required
          value={photo}
          onChange={handleChange("photo")}
        />
        {/* */}
        <TextField
          label="Name"
          variant="filled"
          type="text"
          required
          value={name}
          onChange={handleChange("name")}
          autoFocus
        />
        <TextField
          label="Description"
          variant="filled"
          type="text"
          required
          value={description}
          onChange={handleChange("description")}
        />
        <TextField
          label="Price"
          variant="filled"
          type="text"
          required
          value={price}
          onChange={handleChange("price")}
        />
        {/*  TO REPLCE WITH SELECTOR */}
        <TextField
          label="Category"
          variant="filled"
          type="text"
          required
          value={category}
          onChange={handleChange("category")}
        />
        <TextField
          label="Name"
          variant="filled"
          type="text"
          required
          value={shipping}
          onChange={handleChange("shipping")}
        />
        {/* */}
        <TextField
          label="Name"
          variant="filled"
          type="text"
          required
          value={shipping}
          onChange={handleChange("shipping")}
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
            Create Product
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
  const showSuccess = () => (
    <div style={{ display: createdProduct ? "" : "none" }}>
      <Alert severity="success">
        <AlertTitle>{`${createdProduct}`} is created!</AlertTitle>
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

  return (
    <div>
      <Layout
        title="Add a new Product"
        description={`G'day ${user.name}, ready to add a new Product?`}
      >
        {showLoading()}
        {showError()}
        {showSuccess()}
        {newProductForm()}
      </Layout>
    </div>
  );
};
export default AddProduct;
