import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/userReducer'

import Container from '@material-ui/core/Container';

let socket

const test = { user_info_id: 2, user_id: 1, first_name: 'test', last_name: 'test', nickname: 'test', profile_img: 'test', about: 'blah blah', group_id: 3 }


const Conversation = () => { //params will be user stuff
  const classes = useStyles();
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState(0)


  useEffect(() => {
    const { nickname, user_info_id, group_id } = test
    socket = io()
    socket.emit('enter', { nickname, user_info_id, group_id }, () => { })
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  })
  useEffect(() => {
    socket.on('message', (message) => {
      setMessage([...messages, message])
    })
  }, [messages])
  const sendMessage = (e) => {
    e.preventDefault()

    socket.emit('send message', message, () => {
      setMessage('')

    })
  }

  return (
    <Container className={classes.mainContainer}>
      <div>
        <div>
          {/* top */}
        </div>
        <div>
          {/* messages */}
        </div>
        <form>
          {/* input */}
          <input
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} />
          <button type='submit' onClick={(e) => sendMessage(e)}>Send</button>
        </form>
      </div>
    </Container>
  )
}

const mapStateToProps = (rootReducer) => {

  return {
    userReducer: rootReducer.userReducer
  }
}

export default connect(mapStateToProps, { getUser })(Conversation);

const useStyles = makeStyles({
  mainContainer: {

  }
})