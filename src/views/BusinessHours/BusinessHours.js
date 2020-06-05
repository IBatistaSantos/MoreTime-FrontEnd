import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '../../../src/services/api';
import MaterialTable from 'material-table';

import {Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import {tableIcons} from '../../helpers/tableIcons'
const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
}));


export default function AccountHours()  {
  const [businessHours, setBusinessHours] = useState([])
  const classes = useStyles();
   

  useEffect(() => {
    api.get('businessHours').then((response) => {   
      setBusinessHours(response.data);     
    });
  }, []);
  
  const columns =  [
    { title: 'Dia ', field: 'weekday', editable: 'onAdd', 
      lookup: {
        0: 'Domingo',
        1: 'Segunda-feira',
        2: 'Terça-feira',
        3: 'Quarta-feira',
        4: 'Quinta-feira',
        5:'Sexta-feira',
        6: 'Sábado'
      } },
    { title: 'Inicio Expediente', field: 'open_time' },
    { title: 'Fechamento Expediente', field: 'close_time'},    
  ];
  

  function handleAddBusinessHours (data) {
    const {weekday, open_time, close_time} = data;   
    api.post('/businessHours', {
      weekday: weekday,
      open_time: open_time,
      close_time: close_time
    }).then((response) => {
      setBusinessHours([...businessHours, response.data])
    }); 
  }

  function handleUpdateBusinessHours(data) {
    const {id, open_time, close_time} = data;   
    api.put(`/businessHours/${id}`, {
      open_time: open_time,
      close_time: close_time
    }).then((response) => {
      const index = businessHours.find(businessHours => businessHours.id === response.data.id)
      const data = [...businessHours]  
      data[data.indexOf(index)] = response.data
      setBusinessHours([... data])
    });
  }

  function handleDeleteBusinessHours({ id }) {
    api.delete(`/businessHours/${id}`).then(() => {
      const index = businessHours.find(businessHours => businessHours.id)
      const data = [...businessHours]  
      data.splice(data[data.indexOf(index)], 1)
      setBusinessHours([... data])
    });
  }
  
  return (
    <>
      <div className={classes.row}>
        <Typography variant="h1">Meus Horários</Typography> 
      </div>
    
      <MaterialTable
        columns={columns}
        data={businessHours.map((businessHour)=> (
          { 
            id: businessHour.id,
            weekday: businessHour.weekday,
            open_time: businessHour.open_time,
            close_time: businessHour.close_time
          }
        ))}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                handleAddBusinessHours(newData);
              }, 6000);
            }),
          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                handleUpdateBusinessHours(newData)
              },6000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(); 
                handleDeleteBusinessHours(oldData)
              }, 6000);
            }),
        }}
        icons={tableIcons}
        localization={{
          header: {
            actions: 'Ações'
          },
          body: {
            editRow: {
              saveTooltip: 'Salvar',
              cancelTooltip: 'Cancelar',
              deleteText: 'Tem certeza que deseja deletar este registro?'
            },
          
            addTooltip: 'Adicionar',
            deleteTooltip: 'Deletar',
            editTooltip: 'Editar',
          
            emptyDataSourceMessage: 'Nenhum horário cadastrado',
            filterRow: {
              filterTooltip: 'Filter'
            }
          },
          toolbar: {
            searchPlaceholder: 'Pesquisar'
          },
        }}
        options={{
          paging: false
        }}
        title="Meus Horários"
      />
   </>
  );
}

AccountHours.propTypes = {
  className: PropTypes.string
};
