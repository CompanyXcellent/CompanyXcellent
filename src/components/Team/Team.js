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
  const [groupName, setGroupName] = useState();

  useEffect(() => {
    if (props.user.user_id) {
      console.log(props.user.user_id)
      axios.get(`/api/profile/${props.user.user_id}`)
        .then(res => setCurrentUserInfo(res.data))
        .catch(err => console.log(err));
    }
  }, [props.user])

  useEffect(() => {
    if (currentUserInfo.group_id) {
      axios.get(`/api/team/${currentUserInfo.group_id}`)
        .then(res => setTeam(res.data))
        .catch(err => console.log(err));
    }
  }, [currentUserInfo]);

  return (
    <Container className={classes.mainContainer}>
      <Typography variant='h3' className={classes.title} >{groupName}</Typography>
      {team.map(e => {
        if (!groupName) setGroupName(e.group_name);
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
            <Typography variant='h6' className={classes.jobTitle}>{e.job_title}</Typography>
            <Typography variant='subtitle1'>{e.username}</Typography>
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

    [theme.breakpoints.up('md')]: {
      height: '20vh'
    },

    [theme.breakpoints.up('md')]: {
      height: '30vh'
    },
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
      width: 100,
      height: 100
    },
    [theme.breakpoints.up('md')]: {
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
}))