import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import randomatic from 'randomatic';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const CreateEmployee = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = () => {
    if( !firstName || !lastName || !email || !password ){
      setErrorMessage(`Missing information. Please double check to make sure input boxes are filled out.`)
      return
    }

    console.log(password);
    // Submit to server/database logic goes here.
  }

  useEffect(() => {
    const randoPassword = randomatic('Aa0!', 15);
    setPassword(randoPassword);
  }, [])

  return (
    <Container className={classes.mainContainer}>
      <Container>
        <Typography variant='h3' className={classes.textAlignCenter}>New Employee</Typography>
      </Container>
      <TextField
        name='firstName'
        className={classes.input}
        variant='outlined'
        label='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)} />
      <TextField
        name='lastName'
        className={classes.input}
        variant='outlined'
        label='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)} />
      <TextField
        name='email'
        className={classes.input}
        type='email'
        variant='outlined'
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <Container className={`${classes.buttonContainer} ${classes.input}`}>
        <Button
          variant='contained'
          onClick={submit}
        >
          Submit
        </Button>
      </Container>
      <Dialog
        open={errorMessage}
      >
        <DialogTitle>Incomplete Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { errorMessage }
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setErrorMessage('')}>OK</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default CreateEmployee;

const useStyles = makeStyles({
  mainContainer: {
    height: '52.5vh',
    width: '100%',
    // backgroundColor: 'beige'

    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignContent: 'center',
    // alignItems: 'flex-start',

  },
  textAlignCenter: {
    textAlign: 'center'
  },
  input: {
    marginTop: 32
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})