import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const Messages = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>

    </Container>
  )
}

export default Messages;

const useStyles = makeStyles({
  mainContainer: {

  }
})