import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RatingDialog from './RatingDialog';
import EditProfileDialog from './EditProfileDialog';
import EditEmployeeDialog from './EditEmployeeDialog';

import { getUserSubscriptions } from '../../redux/reducers/userReducer';

const Profile = (props) => {
  const classes = useStyles();

  const [employee, setEmployee] = useState({});
  const [skills, setSkills] = useState([]);
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(false);

  // Grabs Employee Info
  useEffect(() => {
    axios.get(`/api/employees/${props.match.params.id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.log(err))
  }, [edit, update])

  const handleClick = (e) => {
    if(e.target.innerText === 'EDIT'){
      setEdit(true);
      return
    }

    if(e.target.innerText === 'SUBSCRIBE'){
      axios.post(`/api/profile/${props.user.user_id}/subscriptions`, { subId: employee.user_id})
      .then(res => {
        console.log(res);
        setSubscriptionId(employee.user_id);
      })
      .catch(err => console.log(err));
      // Add functionality to update subscription in database
    } else if (e.target.innerText === 'UNSUBSCRIBE'){
      axios.delete(`/api/profile/${props.user.user_id}/subscriptions/${subscriptionId}`)
      .then(res => {
        console.log(res);
        setSubscriptionId(false);
        props.getUserSubscriptions(props.user.user_id);
      })
      .catch(err => console.log(err));
    }

    // if()
  }

  useEffect(() => {
    if(props.userSubscriptions){
      props.userSubscriptions.forEach(e => {
          if(e.friend_user_id === employee.user_id){
            setSubscriptionId(e.subscription_id);
          }
        });
    }
  }, [props.userSubscriptions, employee])

  return (
    <Container className={classes.mainContainer}>
      <Container className={classes.avatarNameTeamJob}>
        <Avatar className={classes.avatar} src={employee.profile_img} />
        <Container className={classes.nameTeamJob}>
          <Typography variant='h4' className={classes.paddingTopBottom6}>{employee.first_name} {employee.last_name}</Typography>
          <Typography variant='subtitle2' className={classes.paddingTopBottom6}>{employee.group_name} - {employee.job_title}</Typography>
          <Container className={classes.buttonContainer}>

            {props.user.role_id === 1 ?
              <Button
                size='small'
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={() => setUpdate(true)}
              >
                Update
              </Button>
              :
              null
            }
            <Button
              size='small'
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={e => handleClick(e)}
            >
              {props.user.user_id === employee.user_id ? 'Edit' : subscriptionId ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </Container>
        </Container>
      </Container>
      <Typography variant='subtitle1' className={classes.nickname}>{employee.nickname}</Typography>
      <Typography variant='body1' className={classes.description}>{employee.about}</Typography>
      <Container className={classes.skills}>
        <Container className={classes.skill}>
          <Typography>Skill</Typography>
          <Typography>5/5</Typography>
        </Container>
        <Container className={classes.skill}>
          <Typography>Skill</Typography>
          <Typography>5/5</Typography>
        </Container>
        <Container className={classes.skill}>
          <Typography>Skill</Typography>
          <Typography>5/5</Typography>
        </Container>
        <Container className={classes.skill}>
          <Typography>Skill</Typography>
          <Typography>5/5</Typography>
        </Container>
        <Container className={classes.skill}>
          <Typography>Skill</Typography>
          <Typography>5/5</Typography>
        </Container>
        <Container className={classes.skill}>
          <Typography>Skill</Typography>
          <Typography>5/5</Typography>
        </Container>
        <Container className={classes.expandMoreIconContainer}>
          <ExpandMoreIcon />
        </Container>
      </Container>
      <Typography>Recent Posts</Typography>
      <Container className={classes.posts}>

      </Container>
      <EditProfileDialog user={props.user} employee={employee} edit={edit} setEdit={setEdit} />
      <EditEmployeeDialog employee={employee} update={update} setUpdate={setUpdate} />
      <RatingDialog/>
    </Container>
  )
}

const mapStateToProps = reduxState => {
  const { user, userSubscriptions } = reduxState.userReducer;

  return {
    user,
    userSubscriptions
  }
}

const mapDispatchToProps = {
  getUserSubscriptions
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const useStyles = makeStyles({
  mainContainer: {
    minHeight: '92.5vh',

    padding: 16
  },
  avatarNameTeamJob: {
    height: '20vh',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 0
  },
  avatar: {
    width: 150,
    height: 150
  },
  nameTeamJob: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    padding: 0,
    marginLeft: 16
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    width: 100,

    marginTop: 8
  },
  paddingTopBottom6: {
    padding: '6px 0'
  },
  nickname: {
    padding: 8
  },
  description: {
    padding: 8
  },
  skills: {
    height: '20vh',

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',

    padding: 16

  },
  skill: {
    width: '33%',

    textAlign: 'center'
  },
  expandMoreIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  posts: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',

  }
})
