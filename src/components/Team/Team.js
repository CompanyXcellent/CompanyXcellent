import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const Team = (props) => {
  const classes = useStyles();

  const [team, setTeam] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState({});

  useEffect(() => {
    if(props.user.user_id){
      console.log(props.user.user_id)
      axios.get(`/api/profile/${props.user.user_id}`)
      .then(res => setCurrentUserInfo(res.data))
      .catch(err => console.log(err));
    }
  }, [props.user])

  useEffect(() => {
    if(currentUserInfo.group_id){
      axios.get(`/api/team/${currentUserInfo.group_id}`)
      .then(res => setTeam(res.data))
      .catch(err => console.log(err));
    }
  }, [currentUserInfo])

  return (
    <Container className={classes.mainContainer}>
      <h1>Team</h1>
      {team.map(e => {
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
    </Container>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer;

  return {
    user
  }
}

export default connect(mapStateToProps, null)(Team);

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    // minHeight: '90vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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
})