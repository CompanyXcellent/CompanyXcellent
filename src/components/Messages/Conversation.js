import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';


let socket

const Conversation = () => { //params will be user stuff
  const classes = useStyles();
  const name = 'ted'
  // const bob = 'bob'
  // const [messages, setMessages] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket = io()
    socket.emit('enter', { name }, () => { })
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  })
  useEffect(() => {
    socket.on('chat-message', data => {
      console.log(data)
    })
  })
  const sendMessage = (e) => {
    e.preventDefault()

    socket.emit('send message', message, () => {
      setMessage('')

    })
  }
  console.log(message)
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

export default Conversation;

const useStyles = makeStyles({
  mainContainer: {

  }
})