import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getUser } from "../../redux/reducers/userReducer";

import Container from "@material-ui/core/Container";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import theme from '../../theme/theme';

import { animateScroll } from "react-scroll";

let socket;

const Conversation = (props) => {
  const classes = useStyles();

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState(0)

  useEffect(() => {
    socket = io();
    socket.emit('enter', { userId: props.user.user_id, userTwo: props.match.params.id }, () => {

    })

    socket.on('joined', ({ messages, room }) => {
      setMessages(messages);
      setRoom(room);
      scrollToBottom();
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [props.user,  props.match.params.id, props.newConversation])

  useEffect(() => {
    socket.on('new message', (newMessage) => {
      setMessages([...messages, newMessage])
      scrollToBottom();
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('send message', { message, room, userId: props.user.user_id })
      setMessage('');
    }
  }

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "mainContainer",
      duration: 200,
    });
  }

  return (
    <Container className={classes.mainContainer} id='mainContainer'>
      <Box>
        {messages.map((el, i) => (
          <Box className={el.sender === props.user.user_id ? classes.sentContainer : classes.receivedContainer}>
            <Typography className={el.sender === props.user.user_id ? `${classes.sent} ${classes.message}` : `${classes.received} ${classes.message}`}>{el.message}</Typography>
          </Box>
        ))}
      </Box>
      <Box className={classes.inputContainer}>
        <TextField
          name='message'
          className={classes.input}
          variant='outlined'
          multiline
          rowsMax='4'
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)} />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={e => sendMessage(e)}
        >
          Send
          </Button>
      </Box>
    </Container>
  );
};

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer
  return {
    user
  };
};

export default connect(mapStateToProps, { getUser })(withRouter(Conversation));

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%',
    maxHeight: '84vh',

    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',

    padding: 8,

    overflowY: 'auto',

    [theme.breakpoints.up('md')]: {
      width: '100%',
      maxHeight: '87vh',

      padding: '8px 16px'
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: '80vh'
    }
  },
  message: {
    width: 'fit-content',
    maxWidth: '60%',

    padding: '5px 10px',
    marginTop: 10,

    overflowWrap: 'break-word'
  },
  sentContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  sent: {
    backgroundColor: theme.palette.secondary.main,

    borderRadius: '10px 10px 0px 10px',
  },
  receivedContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  received: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',

    borderRadius: '10px 10px 10px 0px'
  },
  inputContainer: {
    backgroundColor: theme.palette.background,
    width: 'calc(100%)',

    position: 'fixed',
    bottom: 0,
    left: 0,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 8,

    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',

    zIndex: 5,

    [theme.breakpoints.up('md')]: {
      width: '70%',

      position: 'fixed',
      right: 0,
      left: 'auto',

      padding: '8px 16px'
    }
  },
  input: {
    width: '80%',

    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  button: {
    marginLeft: 8
  }
}));
