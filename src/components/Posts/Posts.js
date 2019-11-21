import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreatPost from './CreatePost'

import Container from '@material-ui/core/Container';

const Posts = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <h1>Posts</h1>
      <CreatPost/>
    </Container>
  )
}

export default Posts;

const useStyles = makeStyles({
  mainContainer: {

  }
})