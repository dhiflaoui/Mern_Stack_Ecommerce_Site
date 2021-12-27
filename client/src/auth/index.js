import axios from "axios";
import { API } from "../config";

export const signup = (user) => {
  axios
    .post(`${API}/signup`, {
      /* headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    }, */
      body: JSON.stringify(user),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  axios
    .post(`${API}/signin`, {
      /* headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      }, */
      body: JSON.stringify(user),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

/* local storage data */
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return axios
      .get(`${API}/signout`)
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
