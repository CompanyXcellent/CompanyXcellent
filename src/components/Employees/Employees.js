import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container';
import EditEmployeeDialog from './EditEmployeeDialog'
import axios from 'axios'
import './styling.css'

const Employees = () => {
  const classes = useStyles();
  const [emps, setEmps] = useState([])

  useEffect(() => {
    axios.get('/api/allEmployees')
    .then(res => {
      setEmps(res.data)
    })
  },[])

  console.log('emps', emps)


  return (
    <Container className={classes.mainContainer}>
      <h1>Employees</h1>
      {emps.map(e => {
        return(
          <div key={e.user_id} id='mini-view-employee-div'>
            <Avatar src={e.profile_img}/>
            <div id='username-and-dialog-employees-div'>
              <h3>{e.username}</h3>
              <EditEmployeeDialog/>
            </div>
            <p>{e.about}</p>
          </div>
        )
      })}
    </Container>
  )
}

export default Employees;

const useStyles = makeStyles({
  mainContainer: {

  }
})