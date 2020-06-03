import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {  Grid  } from '@material-ui/core';

import { ServiceEmployee } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ServiceEmployeeContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <ServiceEmployee/>
          </Grid>
          
        </Grid>
      </div>
    </div>
  );
};

export default ServiceEmployeeContent;
