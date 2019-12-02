import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'

// import Conversation from './Conversation';


const Messages = (props) => {
  console.log(props)
  const classes = useStyles();
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [newMessageInput, setNewMessageInput] = useState('')

  useEffect(() => {
    setUser(props.userReducer.user)
    axios.get('/api/room', user.user_info_id).then(res => setMessages(res.data))
  })


  return (
    <Container className={classes.mainContainer}>
      {messages.map((el, i) => {
        return <Link i={i} to='/conversation'></Link>
      })}
    </Container>
  )

}

const mapStateToProps = (rootReducer) => {
  return {
    userReducer: rootReducer.userReducer
  }
}


export default connect(mapStateToProps)(Messages);

const useStyles = makeStyles({
  mainContainer: {

  }
})