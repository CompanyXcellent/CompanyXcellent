import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EditProfileDialog from './EditProfileDialog'
import RatingDialog from './RatingDialog'

const Profile = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <h1>Profile</h1>
      <EditProfileDialog/>
      <RatingDialog/>
    </Container>
  )
}

export default Profile;

const useStyles = makeStyles({
  mainContainer: {

  }
})
