import axios from "axios";
import { API } from "../config";

export const createCategory = (userId, token, category) => {
  axios
    .post(`${API}/category/create/${userId}`, {
      /* headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        Authorization:`Bearer ${token}`
    }, */
      body: JSON.stringify(category),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  axios
    .post(`${API}/product/create/${userId}`, {
      /* headers:{
          Accept:"application/json",
          Authorization:`Bearer ${token}`
      }, */
      body: JSON.stringify(product),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
