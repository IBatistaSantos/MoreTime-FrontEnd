import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '../../../src/services/api';
import { makeStyles } from '@material-ui/styles';
import {Select,Grid, MenuItem, Paper, ButtonBase , Typography} from '@material-ui/core'
import defaultAvatar from '../../assets/defaultAvatar.png'

const useStyles = makeStyles(theme => ({
  
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
  root: {
    flexGrow: 1,
  }, 
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


export default function AccountHours()  {
  const [services, setServices] = useState([])
  const classes = useStyles();
  

  useEffect(() => {
    api.get('services').then((response) => {   
      setServices(response.data)
    });
  }, []);
  
  const handleChange = (event) => {
    //setSpacing(Number(event.target.value));
  }

  
  return (
    <>
      <div className={classes.row}>
        <Select
          className={classes.searchInput}
          onChange={handleChange}
        >
          {services.map((service) => (
            <MenuItem
              key={service.id}
              value={service.id}
            >{service.name}</MenuItem>   
          ))}
        </Select>
      </div>
     
        <div className={classes.root}>
          <Grid
            className={classes.root}
            container
            spacing={3}
          >
            {[0, 1, ].map((value) => (
              <Grid
                item
                key={value}
                sm={6}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                >
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img
                          alt="complex"
                          className={classes.img}
                          src={defaultAvatar}
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid
                      container
                      item
                      sm
                      xs={12}
                    >
                      <Grid
                        container
                        direction="column"
                        item
                        spacing={2}
                        xs
                      >
                        <Grid
                          item
                          xs
                        >
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                          >
                  Israel Batista
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                          >
                 Biografia do Profissional
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                 Info do serviço
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            style={{ cursor: 'pointer' }}
                            variant="body2"
                          >
                  Agendar
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">R$19.00</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
         
        </div>    
     
      </>
  );
}

AccountHours.propTypes = {
  className: PropTypes.string
};
