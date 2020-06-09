import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../services/api'
import {tableIcons} from '../../../../helpers/tableIcons'
import MaterialTable from 'material-table'



const UsersTable = () => {
  
 
  const [scheduling, setScheduling] = useState([])
 
  useEffect(() => {
    api.get('scheduling').then((response) => {   
      setScheduling(response.data)
    });
  }, []);
 
  const columns =  [
    { title: 'Nome do Cliente', field: 'client', editable: 'never' },
    { title: 'Nome do Prestador', field: 'employee', editable: 'never'},
    { title: 'Data do agendamento', field: 'date'},
    { title: 'Horário', field: 'timetable'},
    { title: 'Serviço', field: 'service', editable: 'never'},
    { title: 'Preço', field: 'price', editable: 'never'},
    { title: 'Status', field: 'status', lookup: {
      'toDo': 'A fazer',
      'concluded': 'Concluído'
    }}    
  ];

  function handleUpdateAppointment(data) {
    const {id, timetable, date, status} = data
    api.put(`scheduling/${id}`, {
      timetable: timetable,
      date: date,
      status: status
    }).then((response) => {
      const index = scheduling.find(scheduling => scheduling.id === response.data.id)
      const data = [...scheduling]  
      data[data.indexOf(index)] = response.data
      setScheduling([... data])
    }); 
  }

  function handleDeleteAppointment({ id }) {
    api.delete(`/scheduling/${id}`).then(() => {
      const index = scheduling.find(scheduling => scheduling.id)
      const data = [...scheduling]  
      data.splice(data[data.indexOf(index)], 1)
      setScheduling([... data])
    });
  }
  
  return (

    <MaterialTable
      columns={columns}
      data={scheduling.map((appointment)=> (
        { 
          id: appointment.id,
          client: appointment.client.name,
          employee: appointment.serviceEmployee.employee.name,
          date: appointment.date,
          timetable: appointment.timetable,
          service: appointment.serviceEmployee.service.name,
          price: new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(appointment.serviceEmployee.price), 
          status: appointment.status
        }
      ))}
      editable={{
        onRowUpdate: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleUpdateAppointment(newData)
            },1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(); 
              handleDeleteAppointment(oldData)
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
            deleteText: 'Tem certeza que deseja deletar este agendamento?'
          },
          
          addTooltip: 'Adicionar',
          deleteTooltip: 'Deletar',
          editTooltip: 'Editar',
          
          emptyDataSourceMessage: 'Nenhum agendamento cadastrado',
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
      title="Meus Agendamentos"
    />
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
