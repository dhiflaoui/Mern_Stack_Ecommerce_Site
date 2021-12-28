import React from "react";
import { Link, withRouter } from "react-router-dom";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../auth";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";

const UserDashboard = () => {
  /* const {
    user: {  _id,  name, email, role },
  } = isAuthenticated(); */

  const userLinks = () => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            User Links
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Link to="/cart">My Cart</Link>
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Link to="/profile/update">Update Profile</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  };
  const userInfo = () => {
    return (
      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              User information
              {/* {name} */}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {/*  {email} */}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {/*  {role === 1 ? "Admin" : "Registred user"} */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  const purchaseHistory = () => {
    return (
      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Purchase History
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              History
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <Layout title="Dashboard" description="User Dashboard">
      <br />
      <Grid container spacing={2}>
        {userLinks()}
        {userInfo()}
        {purchaseHistory()}
      </Grid>
    </Layout>
  );
};

export default UserDashboard;
