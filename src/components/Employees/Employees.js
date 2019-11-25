import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import EditEmployeeDialog from './EditEmployeeDialog'
import axios from 'axios'
import './styling.css'

const Employees = () => {
  const classes = useStyles();
  const [emps, setEmps] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    axios.get('/api/employees')
      .then(res => {
        setEmps(res.data)
      })
  }, [])

  return (
    <Container className={classes.mainContainer}>
      <h1>Employees</h1>
      {emps.map(e => {
        console.log(e)
        return (
          <div key={e.user_id} id='mini-view-employee-div'>
            <Avatar src={e.profile_img} />
            <div id='username-and-dialog-employees-div' className={classes.spaceBetween}>
              <h3>{e.username}</h3>
              <Button variant="outlined" color="secondary" onClick={() => {
                  console.log(e.user_id)
                  setShowEdit(true)
                }}>
                Edit
              </Button>
              <EditEmployeeDialog showEdit={showEdit} setShowEdit={setShowEdit} userId={e.user_id} />
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

  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})