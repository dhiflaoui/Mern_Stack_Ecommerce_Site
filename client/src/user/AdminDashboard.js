import React from "react";
import { Link, withRouter } from "react-router-dom";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../auth";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";

const AdminDashboard = () => {
  const adminLinks = () => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Admin Links
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Link to="/create/category">Create Category</Link>
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Link to="/create/product">Create Product</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  };
  const adminInfo = () => {
    return (
      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              User information
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Layout title="Dashboard" description="User Dashboard">
      <br />
      <Grid container spacing={2}>
        {adminLinks()}
        {adminInfo()}
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
