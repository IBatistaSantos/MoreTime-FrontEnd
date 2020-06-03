import React  from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import {isProviderUser } from '../../../../store/modules/user/actions'

import {
  Card,
  CardHeader,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleProviderRequest(boolean ) {
    dispatch(isProviderUser(boolean))
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Você pode deixar de ser funcionário,
           fique despreocupado pois guarderemos todo seu progresso para quando voltar"
          title="Deixa de ser funcionário"
        />
        <Divider />
        <Divider />
        <CardActions>
          <Button
            color="secondary"
            onClick={() => handleProviderRequest(false)}
            variant="contained"
          >
            Desativar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
