import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const CreatePoll = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <h1>Poll form</h1>
    </Container>
  )
}

export default CreatePoll;

const useStyles = makeStyles({
  mainContainer: {

  }
})