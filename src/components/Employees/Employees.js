import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const Employees = (props) => {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);


  // Grabs Employees Info
  useEffect(() => {
    axios.get('/api/employees')
      .then(res => {
        setEmployees(res.data)
      })
  }, [])

  return (
    <Container className={classes.mainContainer}>
      <Typography variant='h2' className={classes.title}>Employees</Typography>
      {employees.map(e => {
        return (
            <Container key={e.user_id} className={classes.listItemContainer}>
              <Container className={classes.topLine}>
                <Container className={classes.avatarAndName} >
                  <Avatar src={e.profile_img} />
                  <Typography variant='h5' className={classes.name}>{e.first_name} {e.last_name}</Typography>
                </Container>
                <Link to={`/profile/${e.user_id}`} >
                  <Button 
                    variant="contained"
                    size="small" 
                    color="primary" 
                    >
                    View
                  </Button>
                </Link>
              </Container>
              <Container className={classes.departmentJobEmail}>
                <Typography variant='h6' className={classes.department}>{e.group_name}</Typography>
                <Typography variant='subtitle1' className={classes.jobTitle}>{e.job_title}</Typography>
                <Typography variant='subtitle1'>{e.username}</Typography>
              </Container>
              <Typography variant='body2'>{e.about}</Typography>
              <Divider />
            </Container>
        )
      })}
      <Link to='/create-employee'>
        <Button 
          className={classes.fixedBottomRight}
          variant='contained' >
          Add Employee
        </Button>
        {/* <AddIcon className={classes.addIcon} color='secondary' /> */}
      </Link>
    </Container>
  )
}

export default Employees;

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    minHeight: '90vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    margin: '16px 0'
  },
  listItemContainer: {
    width: '100%',
    height: '25vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',

  },
  topLine: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: 0
  },
  avatarAndName: {
    display: 'flex',
    // justifyContent: 'space-evenly'
    alignItems: 'center',

    padding: 0
  },
  name: {
    marginLeft: 16
  },
  button: {
    
  },
  departmentJobEmail: {
    display: 'flex',
    flexWrap: 'wrap',
    
    padding: 0
  },
  department: {
    width: '50%'
  },
  jobTitle: {
    width: '50%',

    textAlign: 'right'
  },
  fixedBottomRight: {
    position: 'fixed',
    bottom: 16,
    right: 16,

    // fontSize: 60,
  }
})