import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import AddIcon from '@material-ui/icons/AddBox';

import Conversation from './Conversation';

const Messages = props => {
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if(props.user || (props.location.state && props.location.state.newConversation)){
      axios.get(`/api/conversations/${props.user.user_id}`).then(res => {
        setConversations(res.data);
      });
    }
  }, [props.user]);

  useEffect(() => {
    if(props.location.state && props.location.state.newConversation){
      axios.get(`/api/conversations/${props.user.user_id}`).then(res => {
        setConversations(res.data);
        props.location.state = undefined;
      });
    }
  })

  return (
    <Container className={classes.mainContainer} maxWidth={false}>
      <Box className={props.match.params.id ? `${classes.displayNone} ${classes.boxShadow}` : classes.boxShadow}>
        {conversations.map((e, i) => (
          <Link to={`/messages/${e.other_user.user_id}`} key={i}>
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
      </Box>
      <Box className={classes.desktopConversation}>
        { props.match.params.id ? <Conversation newConversation={props.location.state} /> : null }
      </Box>
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

const useStyles = makeStyles(theme => ({
  displayNone: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'inline',
      
      width: '30%',
    },
    
    [theme.breakpoints.up('lg')]: {
      height: '88vh',
    }
  },
  boxShadow: {
    [theme.breakpoints.up('md')]: {
      boxShadow: '-5px 0px 15px black',
      width: '30%'
    }
  },
  mainContainer: {
    height: "92vh",

    padding: 0,

    [theme.breakpoints.up('md')]: {
      width: '100%',

      display: 'flex'
    },

    [theme.breakpoints.up('lg')]: {
      height: '88vh'
    }
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

    [theme.breakpoints.up('md')]: {
      left: 16
    }
  },
  desktopConversation: {
    [theme.breakpoints.up('md')]: {
      width: '70%',

      display: 'inline'
    }
  }
}));
