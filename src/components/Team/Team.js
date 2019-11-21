import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const Team = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <h1>Team</h1>
    </Container>
  )
}

export default Team;

const useStyles = makeStyles({
  mainContainer: {

  }
})