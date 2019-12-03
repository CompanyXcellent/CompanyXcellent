import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducers/userReducer";

import Container from "@material-ui/core/Container";

let socket;

const Conversation = (props) => {
  const classes = useStyles();
  // const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState(0)
  // console.log(user)
  // console.log(props)
  // console.log(messages)
  // console.log(room)
  console.log(socket)

  useEffect(() => {

    socket = io()
    socket.emit('enter', props.userReducer.user.user_id, () => {
    })
    socket.on('joined', (messages, roomId) => {
      console.log(roomId)
      setMessages(messages)
      setRoom(roomId)
    }, [])

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])
  useEffect(() => {
    socket.on('new message', (newMessage) => {

      setMessages([...messages, newMessage])
    })
  }, [messages])
  const sendMessage = (e) => {
    e.preventDefault()

    if (message) {
      socket.emit('send message', message, room, props.userReducer.user.user_id, () => setMessage(''))
    }
  }

  return (
    <Container className={classes.mainContainer}>
      <div>
        <div>
          {/* top */}
        </div>
        <div>
          {/* messages */}
          {messages.map((el, i) => (
            <div>{el.message}</div>
          ))}
        </div>
        <form>
          {/* input */}
          <input
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
          />
          <button type="submit" onClick={e => sendMessage(e)}>
            Send
          </button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = rootReducer => {
  return {
    userReducer: rootReducer.userReducer
  };
};

export default connect(mapStateToProps, { getUser })(Conversation);

const useStyles = makeStyles({
  mainContainer: {}
});
