import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import randomatic from 'randomatic';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const CreateEmployee = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState(2);
  const [auth0Id, setAuth0Id] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const submit = () => {
    if( !email || !roleId || !auth0Id || !firstName || !lastName || !groupId || !jobTitle || !password ){
      setErrorMessage(`Missing information. Please double check to make sure input boxes are filled out.`)
      return
    }

    console.log(password);
    // Submit to server/database logic goes here.

    axios.post('/api/register', {
      email,
      roleId,
      auth0Id,
      firstName,
      lastName,
      groupId,
      jobTitle,
      password
    })
    .then(res => {
      setEmail('');
      setRoleId(2);
      setAuth0Id('');
      setFirstName('');
      setLastName('');
      setGroupId('');
      setJobTitle('');
      setPassword('');
      setSuccess(true);
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const randoPassword = randomatic('Aa0!', 15);
    setPassword(randoPassword);

    const randoId = randomatic('Aa0', 25);
    setAuth0Id(randoId);
  }, [])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        props.history.push('/employees');
      }, 5000)
      return () => {
        clearTimeout(timer);
      }
    }
  }, [success])

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
      <TextField
        name='roleId'
        label='Admin?'
        className={`${classes.input} ${classes.dropDown}`}
        variant='outlined'
        select
        value={roleId}
        onChange={(e) => setRoleId(e.target.value)}
       >
         <MenuItem value={1}>Yes</MenuItem>
         <MenuItem value={2}>No</MenuItem>
      </TextField>
      <TextField
        name='groupId'
        label='Team'
        className={`${classes.input} ${classes.dropDown}`}
        variant='outlined'
        select
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
       >
         <MenuItem value={1}>Accounting</MenuItem>
         <MenuItem value={2}>Marketiing</MenuItem>
         <MenuItem value={3}>Dev Team</MenuItem>
      </TextField>
      <TextField
        name='jobTitle'
        className={classes.input}
        variant='outlined'
        label='Job Title'
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)} />
      <Container className={`${classes.buttonContainer} ${classes.input}`}>
        <Button
          variant='contained'
          onClick={submit}
        >
          Submit
        </Button>
      </Container>

      {/* Error Dialog */}
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

      {/* Success Dialog */}
      <Dialog
        open={success}
      >
        <DialogTitle>Incomplete Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Employee Profile successfully created!
          </DialogContentText>
          {/* <DialogActions>
            <Button onClick={() => setErrorMessage('')}>OK</Button>
          </DialogActions> */}
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default CreateEmployee;

const useStyles = makeStyles({
  mainContainer: {
    height: '82.5vh',
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
  dropDown: {
    width: '65%'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})