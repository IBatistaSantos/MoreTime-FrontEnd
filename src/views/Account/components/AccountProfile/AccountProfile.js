import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import DefaultAvatar from '../../../../assets/defaultAvatar.png'
import api from '../../../../services/api'
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { updateProfileSuccess } from '../../../../store/modules/user/actions'
const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  input : {
    display: 'none'
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;
  const profile = useSelector(state => state.user.profile)
  const classes = useStyles();
  const dispatch = useDispatch();
  async function handleChange(event) {
    const data = new FormData();
    data.append('file', event.target.files[0])
    api.post('file/avatar', data).then((response) => {
      dispatch(updateProfileSuccess(response.data))
    })
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h3"
            >
              {profile.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {profile.email}   
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {profile.bio}
            </Typography>
          </div>
          
          <Avatar
            className={classes.avatar}
            src={profile.avatar ? profile.avatar.url :  DefaultAvatar}
          />
          
        </div>
        
      </CardContent>
      <Divider />
      <CardActions>
        <input
          accept="image/*"
          className={classes.input}
          id="button-photo"
          onChange={handleChange}
          type="file"
        />
        <label htmlFor="button-photo">
          <Button
            className={classes.button}
            component="span"
          >
          Alterar foto
          </Button>
        </label>
       
        <Button variant="text">Remover foto</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
