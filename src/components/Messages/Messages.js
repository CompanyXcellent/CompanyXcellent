import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/AddBox';

// import Conversation from './Conversation';


const Messages = props => {
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get(`/api/conversations/${props.user.user_id}`).then(res => {
      setConversations(res.data);
    });
  }, [props.user]);

  console.log(conversations);

  return (
    <Container className={classes.mainContainer}>
      {conversations.map((e, i) => (
        <Link to={`/conversation/${e.other_user.user_id}`} key={i}>
          <Container className={classes.conversationListItemContainer}>
            <Avatar src={e.other_user.profile_img} />
            <Container>
              <Typography variant="h6">{e.other_user.first_name} {e.other_user.last_name}</Typography>
              {/* <Typography variant='body2'>You: Last Message</Typography> */}
            </Container>
          </Container>
        </Link>
      ))}
      <Link to='/add-conversation'>
        <AddIcon className={classes.addIcon} color='primary' />
      </Link>
    </Container>
  );
};

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer;

  return {
    user
  };
};

export default connect(mapStateToProps)(Messages);

const useStyles = makeStyles({
  mainContainer: {
    minHeight: "92vh",

    padding: 0
  },
  conversationListItemContainer: {
    width: "100%",
    height: "7vh",

    display: "flex",
    alignItems: "center",

    color: "black"
  },
  addIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,

    fontSize: 60,
  }
});
