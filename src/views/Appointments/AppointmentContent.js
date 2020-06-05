import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {  Grid  } from '@material-ui/core';
import Appointment from './Appointments';

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

const BusinessHoursContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={4}
        >{/* 
          <Grid
            item
            lg={12}
            sm={6}
            xs
          >
           
          </Grid>
           */}
        </Grid>
        <Appointment/>
      </div>
    </div>
  );
};

export default BusinessHoursContent;
