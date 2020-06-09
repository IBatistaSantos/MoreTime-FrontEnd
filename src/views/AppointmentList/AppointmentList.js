import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { AppointmentToolbar, AppointmentTable } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppointmentToolbar />
      <div className={classes.content}>
        <AppointmentTable/>
      </div>
    </div>
  );
};

export default UserList;
