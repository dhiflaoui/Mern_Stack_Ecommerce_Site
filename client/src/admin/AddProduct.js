import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../auth";
import { TextField, MenuItem } from "@material-ui/core";
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
  imageInput: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  selector: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
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
    const value = name === "photo" ? e.target.files[0] : e.target.value;
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
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];
  const newProductForm = () => (
    <form>
      {/* image picker */}
      <div className={classes.imageInput}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
      </div>
      {/* */}
      <div>
        <TextField
          label="Name"
          variant="filled"
          type="text"
          required
          /* value={name} */
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
          /*  value={price} */
          onChange={handleChange("price")}
        />
        {/*  SELECTOR */}
        <div className={classes.selector} noValidate autoComplete="off">
          <TextField
            id="standard-select-category"
            select
            label="category"
            value={category}
            onChange={handleChange("category")}
            helperText="Please select Category"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-shipping"
            select
            label="shipping"
            value={shipping}
            onChange={handleChange("shipping")}
            helperText="Please select Shipping"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {/* */}
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
        description={`G'day , ready to add a new Product?`}
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
