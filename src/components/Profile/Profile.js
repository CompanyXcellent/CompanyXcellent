import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RatingDialog from './RatingDialog';
import EditProfileDialog from './EditProfileDialog';
import EditEmployeeDialog from './EditEmployeeDialog';

import { getUserSubscriptions } from '../../redux/reducers/userReducer';

const Profile = (props) => {
  const classes = useStyles();
  const [reRender, setReRender] = useState(false)
  const [employee, setEmployee] = useState({});
  // const [skills, setSkills] = useState([]);
  // const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(false);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  const [question0, setQuestion0] = useState('')
  const [question1, setQuestion1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [question3, setQuestion3] = useState('')
  const [question4, setQuestion4] = useState('')
  const [question5, setQuestion5] = useState('')
  const [question6, setQuestion6] = useState('')
  const [question7, setQuestion7] = useState('')
  const [question8, setQuestion8] = useState('')
  const [question9, setQuestion9] = useState('')
  const [question10, setQuestion10] = useState('')
  const [question11, setQuestion11] = useState('')
  const [question12, setQuestion12] = useState('')
  const [question13, setQuestion13] = useState('')
  const [question14, setQuestion14] = useState('')
  const [question15, setQuestion15] = useState('')

  const [average0, setAverage0] = useState(0)
  const [average1, setAverage1] = useState(0)
  const [average2, setAverage2] = useState(0)
  const [average3, setAverage3] = useState(0)
  const [average4, setAverage4] = useState(0)
  const [average5, setAverage5] = useState(0)
  const [average6, setAverage6] = useState(0)
  const [average7, setAverage7] = useState(0)
  const [average8, setAverage8] = useState(0)
  const [average9, setAverage9] = useState(0)
  const [average10, setAverage10] = useState(0)
  const [average11, setAverage11] = useState(0)
  const [average12, setAverage12] = useState(0)
  const [average13, setAverage13] = useState(0)
  const [average14, setAverage14] = useState(0)
  const [average15, setAverage15] = useState(0)

  const stateFunctions = [
    { num: 0, func: setQuestion0, out: question0, avg: average0, setAvg: setAverage0 },
    { num: 1, func: setQuestion1, out: question1, avg: average1, setAvg: setAverage1 },
    { num: 2, func: setQuestion2, out: question2, avg: average2, setAvg: setAverage2 },
    { num: 3, func: setQuestion3, out: question3, avg: average3, setAvg: setAverage3 },
    { num: 4, func: setQuestion4, out: question4, avg: average4, setAvg: setAverage4 },
    { num: 5, func: setQuestion5, out: question5, avg: average5, setAvg: setAverage5 },
    { num: 6, func: setQuestion6, out: question6, avg: average6, setAvg: setAverage6 },
    { num: 7, func: setQuestion7, out: question7, avg: average7, setAvg: setAverage7 },
    { num: 8, func: setQuestion8, out: question8, avg: average8, setAvg: setAverage8 },
    { num: 9, func: setQuestion9, out: question9, avg: average9, setAvg: setAverage9 },
    { num: 10, func: setQuestion10, out: question10, avg: average10, setAvg: setAverage10 },
    { num: 11, func: setQuestion11, out: question11, avg: average11, setAvg: setAverage11 },
    { num: 12, func: setQuestion12, out: question12, avg: average12, setAvg: setAverage12 },
    { num: 13, func: setQuestion13, out: question13, avg: average13, setAvg: setAverage13 },
    { num: 14, func: setQuestion14, out: question14, avg: average14, setAvg: setAverage14 },
    { num: 15, func: setQuestion15, out: question15, avg: average15, setAvg: setAverage15 },

  ]

  //this function gets all of the post questions and the average values of that employees ratings.
  const testAxiosGetRatings = () => {
    axios.get('/api/getPoll')
      .then(res => {
        res.data.map((e, i) => {
          if (res.data[i].question !== '') {
            stateFunctions[i].func(res.data[i].question)
            axios.post('/api/employeeRatingsRetrieval', { questionId: i, receiverId: props.match.params.id })
              .then(response => {
                stateFunctions[i].setAvg(response.data[0].avg)
              })
          }
        })
      })
  }

  const keepPageUpdated = () => {
    if (reRender === false) {
      setReRender(true)
    }
    setReRender(false)
  }

  useEffect(() => {
    testAxiosGetRatings()
  }, [reRender])

  // Grabs Employee Info
  useEffect(() => {
    axios.get(`/api/employees/${props.match.params.id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.log(err))
  }, [edit, update])

  const handleClick = (e) => {
    if (e.target.innerText === 'EDIT') {
      setEdit(true);
      return
    }

    if (e.target.innerText === 'SUBSCRIBE') {
      axios.post(`/api/profile/${props.user.user_id}/subscriptions`, { subId: employee.user_id })
        .then(res => {
          setSubscriptionId(res.data.subscription_id);
        })
        .catch(err => console.log(err));
    } else if (e.target.innerText === 'UNSUBSCRIBE') {
      axios.delete(`/api/profile/${props.user.user_id}/subscriptions/${subscriptionId}`)
        .then(res => {
          getUserSubscriptions(props.user.user_id);
        })
        .catch(err => console.log(err));
    }

  }

  const getUserSubscriptions = async (id) => {
    await axios.get(`/api/profile/${id}/subscriptions`)
    .then(res => {
      setUserSubscriptions(res.data);
    });
    // console.log(userSubscriptions);
  }

  useEffect(() => {
    if(!userSubscriptions[0] && props.user.user_id){
      getUserSubscriptions(props.user.user_id);
    }
    if (userSubscriptions[0]) {
      let subscriptionFound = false;
      userSubscriptions.forEach(e => {
        if (e.friend_user_id === employee.user_id) {
          setSubscriptionId(e.subscription_id);
          subscriptionFound = true;
        }
      });

      if (!subscriptionFound) {
        setSubscriptionId(false);
      }
    }
  }, [userSubscriptions, employee, props.user])

  // console.log(stateFunctions)

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
        {stateFunctions.map((e, i) => {
          if (e.out !== '') {
            return (
              <div key={`key${i}`}>
                <Box className={classes.ratingBox} component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">{e.out}</Typography>
                  <Rating name={`name${i}`} value={e.avg} readOnly precision={.01} />
                </Box>
              </div>
            )
          }
        })}
      </Container>
      <Typography>Recent Posts</Typography>
      <Container className={classes.posts}>

      </Container>
      <EditProfileDialog user={props.user} employee={employee} edit={edit} setEdit={setEdit} />
      <EditEmployeeDialog employee={employee} update={update} setUpdate={setUpdate} />
      <RatingDialog empId={props.match.params.id} keepUpdated={keepPageUpdated} />
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

export default connect(mapStateToProps, null)(Profile);

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
    // height: '20vh',

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

  },
  ratingBox: {
    display: 'flex',
    justifyContent: 'space-around'
  }

})
