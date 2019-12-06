import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

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
      {/* <Typography variant='h2' className={classes.title}>Employees</Typography> */}
      {employees.map(e => {
        return (
          <Container key={e.user_id} className={classes.listItemContainer}>
            <Container className={classes.topLine}>
              <Container className={classes.avatarAndName} >
                <Avatar src={e.profile_img} className={classes.avatar} />
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
            <Typography variant='h6' className={classes.department}>{e.group_name}</Typography>
            <Typography variant='subtitle1' className={classes.jobTitle}>{e.job_title}</Typography>
            <Typography variant='subtitle1'>{e.username}</Typography>
            <Typography variant='body2'>{e.about}</Typography>
            <Divider />
          </Container>
        )
      })}
      {props.user.role_id === 1 ?
        <Link to='/create-employee'>
          <Button
            className={classes.fixedBottomRight}
            variant='contained' >
            Add Employee
        </Button>
        </Link>
        : null}
    </Container>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer;

  return {
    user
  }
}

export default connect(mapStateToProps, null)(Employees);

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    padding: 16,

    [theme.breakpoints.up('lg')]: {
      padding: 32
    }
  },
  listItemContainer: {
    width: '100%',
    height: '30vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',

    [theme.breakpoints.up('lg')]: {
      height: '35vh'
    }

  },
  topLine: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: 0
  },
  avatarAndName: {
    display: 'flex',
    alignItems: 'center',

    padding: 0
  },
  avatar: {
    width: 75,
    height: 75,

    [theme.breakpoints.up('md')]: {
      width: 125,
      height: 125
    },

    [theme.breakpoints.up('lg')]: {
      width: 150,
      height: 150
    }
  },
  name: {
    marginLeft: 16
  },
  department: {
    display: 'flex',
    alignItems: 'center'
  },
  jobTitle: {
    display: 'flex',
    alignItems: 'center'
  },
  fixedBottomRight: {
    position: 'fixed',
    bottom: 16,
    right: 16,

    // fontSize: 60,
  }
}))