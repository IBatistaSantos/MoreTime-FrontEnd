import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import Background from '../../assets/auth1.jpg';
import {useDispatch} from 'react-redux'
import { resetPassword } from '../../store/modules/auth/actions';
import {Form} from '@rocketseat/unform'
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';

const schema = {
  token : {
    presence: { allowEmpty: false, message: 'é obrigatório' },
  },
  password: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
    length: {
      maximum: 64
    }
  },
  password_confirmation: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
    length: {
      maximum: 64
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  ResetPasswordButton: {
    margin: theme.spacing(2, 0)
  }
}));

const ResetPassword = props => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  function handleResetPassword (data){
    const {token,password} = data
    dispatch(resetPassword(token, password))
  } 
  
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <div className={classes.person} />
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBack />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <Form
                className={classes.form}
                onSubmit={()=>handleResetPassword(formState.values)}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Utilize o código de segurança enviado para seu email 
                  e crie sua nova senha
                </Typography>
                
                <TextField
                  className={classes.textField}
                  error={hasError('token')}
                  fullWidth
                  helperText={
                    hasError('token') ? formState.errors.token[0] : null
                  }
                  label="Código de segurança"
                  name="token"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.token || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Senha"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password_confirmation')}
                  fullWidth
                  helperText={
                    hasError('password_confirmation') ? formState.errors.password_confirmation[0] : null
                  }
                  label="Confirme sua senha"
                  name="password_confirmation"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password_confirmation || ''}
                  variant="outlined"
                />
             
                <Button
                  className={classes.ResetPasswordButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Criar nova senha
                </Button>
              </Form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.object
};

export default withRouter(ResetPassword);
