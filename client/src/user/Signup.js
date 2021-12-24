import React, { useState } from 'react';
import Layout from "../Core/Layout";
import axios from "axios"; 
import {API} from '../config';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const Signup = () => {
  const classes = useStyles();

  const initialState = {
    name:'',
    email:'',
    password:'',
    error:'',
    success:false,
  }
  // create state variables for each input
  const [values, setValues] = useState(initialState);
  const{name,email,password}=values
  const signup= (user)=>{
    axios.post(`${API}/signup`, { 
      /* headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    }, */
    body: JSON.stringify(user)
    })
    .then((response) => {
      setValues(response.data);
    });
  };
  const handleClearfields =()=>{
    setValues({ ...initialState });
  }
  const handleSubmit = e => {
    e.preventDefault();
    signup({name: name ,email : email ,password: password});
    
    handleClearfields();
  };
  
  const handleChange = name => e => {
    setValues({...values, error:false, [name]:e.target.value});
  };

  const signUpForm = () => (
    <form >
      <div className={classes.root}>
        <TextField
          label="Name"
          variant="filled"
          required
          value={values.name}
          onChange={handleChange('name')}
        />
        <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={values.email}
        onChange={handleChange('email')}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={values.password}
        onChange={handleChange('password')}
      />
      <div>
        <Button variant="contained" onClick={handleClearfields}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Signup
        </Button>
        </div>
      </div>
    </form>
  );
  return (
    <div>
      <Layout
        title="SignUp page"
        description="SignUp To Node React E-commerce App"
      >
        {signUpForm()}
        {JSON.stringify(values)}
      </Layout>
    </div>
  );
};

export default Signup;
