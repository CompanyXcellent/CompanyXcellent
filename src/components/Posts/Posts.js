import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreatPost from './CreatePost'
import { getUser } from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container';
import { RootRef } from '@material-ui/core';

const Posts = (props) => {
  const classes = useStyles();
  useEffect(() => {
    console.log('hit')
    props.getUser()
  }, [])

  const logout = () => {
    window.location.href = 'http://localhost:3030/api/logout'
  }
  console.log(props)
  return (
    <Container className={classes.mainContainer}>
      <h1>Posts</h1>
      <button onClick={logout}>Logout</button>
      <CreatPost />
    </Container>
  )
}
const mapStateToProps = (rootReducer) => {
  return {
    userReducer: rootReducer.userReducer
  }
}

export default connect(mapStateToProps, { getUser })(Posts);

const useStyles = makeStyles({
  mainContainer: {

  }
})