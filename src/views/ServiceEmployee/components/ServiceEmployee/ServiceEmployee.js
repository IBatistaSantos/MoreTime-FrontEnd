import React, {useState, forwardRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import api from '../../../../services/api'
import { makeStyles } from '@material-ui/styles';
import {Select, MenuItem, Typography} from '@material-ui/core'
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

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
}));


export default function ServiceEmployeee() {
  const [servicesEmployee, setServiceEmployee] = useState([])
  const [services , setServices] = useState([{}]) 
  const [serviceSelect, setserviceSelect] = useState('');
  const classes = useStyles();

  const handleChange = (event) => {
    setserviceSelect(event.target.value);
  };
  
  
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
    api.get('services').then((response) => {   
      setServices(response.data)
    });
  }, []);


  useEffect(() => {
    api.get('serviceEmployee').then((response) => {   
      setServiceEmployee([...response.data])
    });
  }, []);



  const columns =  [
    {
      title: 'Serviços',
      field: 'service',
      editable: 'onAdd',
      editComponent: t =>
        <Select
          onChange={handleChange}
          value={serviceSelect}
        >
          {services.map((service) => (
            <MenuItem
              key={service.id}
              value={service.id}
            >{service.name}</MenuItem>   
          ))}
        </Select> 
    },   
    { title: 'Preço', field: 'price' },
    { title: 'Informação', field: 'info'},    
  ];

  function handleAddServices(serviceEmployeee) {
    const {price, info} = serviceEmployeee
    const service_id = serviceSelect
    const data = {
      price,
      info,
      service_id: service_id
    } 
    api.post('/serviceEmployee', data).then((response) =>{
      setServiceEmployee([...servicesEmployee, response.data])
      setserviceSelect('')
    })
    
  }

  function handleUpdateServices(data) {
    const {id, price, info} = data
    api.put(`serviceEmployee/${id}`, {
      price,
      info    
    }).then((response)=> { 
      const index = servicesEmployee.find(servicesEmployee => servicesEmployee.id === response.data.id)
      const newState = [...servicesEmployee]  
      newState[newState.indexOf(index)] = response.data
      setServiceEmployee([... newState])
      setserviceSelect('')
    })
  }

  function handleDeleteServices({id}) {
    api.delete(`serviceEmployee/${id}`).then(() => {
      const index = servicesEmployee.find(serviceEmployee => serviceEmployee.id == id) 
      const data = [...servicesEmployee]  
      data.splice(data.indexOf(index),1)
      setServiceEmployee([... data])   
    });
  }
  
  return (
    <>
    <div className={classes.row}>
      <Typography variant="h1">Meus serviços</Typography> 
    </div>
    
    <MaterialTable 
      columns={columns}
      data=
        {servicesEmployee.map((serviceEmployee) => (
          {
            id: serviceEmployee.id,
            service:serviceEmployee.service.name, 
            price: serviceEmployee.price,
            info: serviceEmployee.info
          }
        ))}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleAddServices(newData);
            }, 1000);
          }),
        onRowUpdate: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handleUpdateServices(newData)
            },1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(); 
              handleDeleteServices(oldData)
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
            deleteText: 'Tem certeza que deseja deletar este serviço ?'
          },
      
          addTooltip: 'Adicionar',
          deleteTooltip: 'Deletar',
          editTooltip: 'Editar',
      
          emptyDataSourceMessage: 'Nenhum serviço cadastrado',
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
      title="Meus Serviços"
    />
    </>
  );
}

ServiceEmployeee.propTypes = {
  className: PropTypes.string,
};

