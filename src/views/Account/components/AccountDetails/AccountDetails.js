import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {useDispatch} from 'react-redux'
import { updateProfileRequest } from '../../../../store/modules/user/actions'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import {useSelector} from 'react-redux'
const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const profile = useSelector(state => state.user.profile)
 
  const [values, setValues] = useState({
    name: profile.name,
    email: profile.email,
    bio: profile.bio || ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  function handleUpdateUser(data) {
    dispatch(updateProfileRequest(data))
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Atualize seu perfil"
          title="Seu Perfil"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Nome"
            name="name"
            onChange={handleChange}
            type="text"
            value={values.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="text"
            value={values.email}
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Biografia"
            name="bio"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="text"
            value={values.bio}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            onClick={() => handleUpdateUser(values)}
            variant="outlined"
          >
        Atualizar perfil
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
