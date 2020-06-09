import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import api from '../../../../services/api'
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import history from '../../../../services/history'
const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  
  actions: {
    justifyContent: 'flex-end'
  }
}));



const LatestOrders = props => {
  const { className, ...rest } = props;
  const [appointments, setAppointments] = useState([])
  const classes = useStyles();


  
  useEffect(() => {
    api.get('appointment/today').then((response) => {   
      setAppointments(response.data);     
    });
  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            onClick={() => history.push('/new-appointment')}
            size="small"
            variant="outlined"
          >
            Novo Agendamento
          </Button>
        }
        title="Agendamento do dia"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Serviço</TableCell>
                  <TableCell>Prestador de serviço</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(appointment => (
                  <TableRow
                    hover
                    key={appointment.id}
                  >                  
                    <TableCell>{appointment.client.name}</TableCell>
                    <TableCell>{appointment.serviceEmployee.service.name}</TableCell>
                    <TableCell>{appointment.serviceEmployee.employee.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          onClick={()=> history.push('appointments')}
          size="small"
          variant="text"
        >
          Veja mais <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
