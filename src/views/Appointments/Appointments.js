import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '../../../src/services/api';
import {toast} from 'react-toastify'
import { makeStyles } from '@material-ui/styles';
import {Select,Grid,
  TextField, 
  DialogActions, 
  Button, 
  MenuItem,
  FormControl, 
  Paper,
  ButtonBase , 
  Typography, 
  Dialog, 
  DialogTitle,
  DialogContent,
  InputLabel,
  DialogContentText,
} from '@material-ui/core'
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
  form: {
    display: 'flex',
    flexDirection: 'row'
  },
  textField: {
    marginLeft: '20px'
  }
}));


export default function AccountHours()  {
  const [services, setServices] = useState([])
  const [employees, setEmployees] = useState([])
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [serviceEmployee, setServiceEmployee] = useState('')
  const [formState, setFormState] = useState({
    values: {},
  });

  const handleChangeForm = event => {
    event.persist();

    setFormState(formState => ({
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
    }));
  };

  const handleClickOpen = (data) => {
    setServiceEmployee(Number(data))
    setOpen(true);
  };

  const handleClose = () => {
    setServiceEmployee('')
    setOpen(false);
  };

  useEffect(() => {
    api.get('services').then((response) => {   
      setServices(response.data)
    });
  }, []);
  
  const handleChange = (event) => {
    api.get(`services/${event.target.value}`).then((response) => {
      setEmployees(response.data)
    })
  }

  function handleAddAppointment(data) {
    const {date, timetable} = data
    data = {
      date,
      timetable,
      service_employee_id: serviceEmployee
    }

    api.post('scheduling', data).then(() => {
      toast.success('Agendamento feito com sucesso')
      setServiceEmployee('')
      setFormState([])
      setOpen(false)
    })
  }

  
  return (
    <>
      <div className={classes.row}>
        <InputLabel id="select-service">Qual serviço deseja ? </InputLabel>
        <Select
          className={classes.searchInput}
          id="select-service"
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
          {employees.map((employee) => (
            <Grid
              item
              key={employee.id}
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
                        src={employee.employee.avatar ? employee.employee.avatar.url : defaultAvatar}
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
                          {employee.employee.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                        >
                         Biografia: {employee.employee.bio}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                         Infomação do serviço: {employee.info}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          onClick={() => handleClickOpen(employee.id)}
                          style={{ cursor: 'pointer' }}
                          variant="body2"
                        >
                  Agendar
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">{Intl.NumberFormat('pt-Br', { style: 'currency', currency:'BRL'})
                        .format(employee.price)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
         
      </div>    
     
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>Data e Horário do Agendamento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informe a data e horário do agendamento e verificamos a disponibilidade
          </DialogContentText>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField    
                className={classes.textField}
                id="date"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data"
                name="date"
                onChange={handleChangeForm}
                type="date"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                className={classes.textField}
                defaultValue="08:00"
                id="time"
                label="Horário"
                name="timetable"
                onChange={handleChangeForm}
                type="time"
              /> 
          
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={() => handleAddAppointment(formState.values)}
          >
          Agendar
          </Button>
        </DialogActions>
      </Dialog>
  </>
  );
}

AccountHours.propTypes = {
  className: PropTypes.string
};
