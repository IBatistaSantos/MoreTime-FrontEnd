import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, colors } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {isProviderUser } from '../../../../../../store/modules/user/actions'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: colors.grey[50]
  },
  media: {
    paddingTop: theme.spacing(2),
    height: 80,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  content: {
    padding: theme.spacing(1, 2)
  },
  actions: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const UpgradePlan = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch()
  const classes = useStyles();


  function handleProviderRequest(boolean) {
    dispatch(isProviderUser(boolean))
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.media}>
        <img
          alt="Seja um funcionário"
          src="/images/undraw_resume_folder_2_arse.svg"
        />
      </div>
      <div className={classes.content}>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          Seja um funcionário
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Seja um funcionário e comece a gerir seu agendamentos
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          color="primary"
          component="a"
          onClick={() => handleProviderRequest(true)}
          variant="contained"
        >
          Comece agora
        </Button>
      </div>
    </div>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string
};

export default UpgradePlan;
