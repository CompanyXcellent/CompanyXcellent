import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
// import Conversation from './Conversation';
// import Conversation from './Conversation';
// import axios from 'axios';

const Messages = () => {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')


  return (
    <Container className={classes.mainContainer}>
      <input onChange={(e) => setName(e.target.value)} />
      <input onChange={(e) => setRoom(e.target.vale)} />
      <Link to='/convo' name={name} room={room}>
        <button type='submit'>enter</button>
      </Link>
      
    </Container>
  )
}

export default Messages;

const useStyles = makeStyles({
  mainContainer: {

  }
})