import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const CreatePost = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>

    </Container>
  )
}

export default CreatePost;

const useStyles = makeStyles({
  mainContainer: {

  }
})