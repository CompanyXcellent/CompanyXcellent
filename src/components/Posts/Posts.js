import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const Posts = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>

    </Container>
  )
}

export default Posts;

const useStyles = makeStyles({
  mainContainer: {

  }
})