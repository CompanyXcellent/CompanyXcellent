import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

const AddConversation = (props) => {
  const classes = useStyles();

  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!filter) {
      axios.get('/api/employees')
        .then(res => {
          setEmployees(res.data)
        })
    }
  }, [filter])

  // useEffect(() => {
  //   let filteredEmployees = employees.slice();
  //   filteredEmployees = filteredEmployees.filter(employee => {
  //     console.log(`${employee.first_name} ${employee.last_name}`);
  //     const fullName = `${employee.first_name} ${employee.last_name}`;

  //     if(fullName.includes(filter)){
  //       return employee
  //     }

  //   })

  //   setEmployees(filteredEmployees);
  // }, [filter])

  return (
    <Container className={classes.mainContainer}>
      {/* <Typography variant='h2' className={classes.title}>Employees</Typography> */}
      <TextField
        name='filter'
        variant='outlined'
        value={filter}
        className={classes.filter}
        fullWidth
        onChange={e => setFilter(e.target.value)} />
      {employees.map(e => {
        const fullName = `${e.first_name} ${e.last_name}`.toLocaleLowerCase();

        if (fullName.includes(filter.toLocaleLowerCase()) && props.user.user_id !== e.user_id) {
          return (
            <Link to={`/conversation/${e.user_id}`} className={classes.link}>
              <Container key={e.user_id} className={classes.listItemContainer}>
                <Container className={classes.topLine}>
                  <Container className={classes.avatarAndName} >
                    <Avatar src={e.profile_img} />
                    <Container>
                      <Typography variant='h5' className={classes.name}>{e.first_name} {e.last_name}</Typography>
                      <Container className={classes.departmentJobEmail}>
                        <Typography variant='h6' className={classes.department}>{e.group_name}</Typography>
                        <Typography variant='subtitle1' className={classes.jobTitle}>{e.job_title}</Typography>
                      </Container>
                    </Container>
                  </Container>
                </Container>
                {/* <Divider /> */}
              </Container>

            </Link>
          )
        }
      })}
    </Container>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer;

  return {
    user
  }
}

export default connect(mapStateToProps, null)(AddConversation);

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    minHeight: '90vh',

    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    margin: '16px 0'
  },
  listItemContainer: {
    width: '100%',
    height: '10vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',

    color: 'black',

    padding: 0

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
    // marginLeft: 16
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
  filter: {
    marginTop: 16
  },
  link: {
    width: '100%'
  }
})