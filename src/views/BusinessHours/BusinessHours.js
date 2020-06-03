import React, { useState, useEffect, forwardRef} from 'react';
import PropTypes from 'prop-types';
import api from '../../../src/services/api';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';

import ViewColumn from '@material-ui/icons/ViewColumn';
import {Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

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
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox />),
    Check: forwardRef((props, ref) => <Check
      {...props}
      ref={ref}
                                      />),
    Clear: forwardRef((props, ref) => <Clear
      {...props}
      ref={ref}
                                      />),
    Delete: forwardRef((props, ref) => <DeleteOutline
      {...props}
      ref={ref}
                                       />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight
      {...props}
      ref={ref}
                                            />),
    Edit: forwardRef((props, ref) => <Edit
      {...props}
      ref={ref}
                                     />),
    Export: forwardRef((props, ref) => <SaveAlt
      {...props}
      ref={ref}
                                       />),
    Filter: forwardRef((props, ref) => <FilterList
      {...props}
      ref={ref}
                                       />),
    
    ResetSearch: forwardRef((props, ref) => <Clear
      {...props}
      ref={ref}
                                            />),
    Search: forwardRef((props, ref) => <Search
      {...props}
      ref={ref}
                                       />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward
      {...props}
      ref={ref}
                                          />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove
      {...props}
      ref={ref}
                                                />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn
      {...props}
      ref={ref}
                                           />)
  };  

  useEffect(() => {
    api.get('businessHours').then((response) => {   
      setBusinessHours(response.data);     
    });
  }, []);
  
  const columns =  [
    { title: 'Dia ', field: 'weekday' },
    { title: 'Inicio Expediente', field: 'open_time' },
    { title: 'Fechamento Expediente', field: 'close_time'},    
  ];
  
  function setNameWeekDay (idDay) {
    switch (idDay) {
      case 0:
        return 'Domingo';
      case 1 : 
        return 'Segunda'
      case 2 : 
        return 'Terça-feira'
      case 3 : 
        return 'Quarta-feira'
      case 4 :
        return 'Quinta-feira'
      case 5 : 
        return 'Sexta-feira'  
      case 6 : 
        return 'Sábado'
      default:
        break;
    }
  }

  function getIndexWeekDay (idDay) {
    switch (idDay) {
      case 'Domingo':
        return 0;
      case 'Segunda-feira' : 
        return 1
      case 'Terça-feira': 
        return 2
      case 'Quarta-feira' : 
        return 3
      case 'Quinta-feira' :
        return 4
      case 'Sexta-feira' : 
        return  5 
      case 'Sábado' : 
        return 6 
      default:
        break;
    }
  }

  function handleAddBusinessHours (data) {
    const {weekday, open_time, close_time} = data;   
    const weekDay = getIndexWeekDay(weekday)
    api.post('/businessHours', {
      weekday: weekDay,
      openTime: open_time,
      closeTime: close_time
    }).then((response) => {
      setBusinessHours([...businessHours, response.data])
    
    });
     
  }

  function handleUpdateBusinessHours(data) {
    const {id, weekday, open_time, close_time} = data;   
    const weekDay = getIndexWeekDay(weekday)
    api.put(`/businessHours/${id}`, {
      weekday: weekDay,
      openTime: open_time,
      closeTime: close_time
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
            weekday: setNameWeekDay(businessHour.weekday),
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
              }, 1000);
            }),
          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                handleUpdateBusinessHours(newData)
              },1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(); 
                handleDeleteBusinessHours(oldData)
              }, 1000);
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
