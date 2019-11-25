import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { MenuItem } from '@material-ui/core';


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {props.setShowEdit ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={(e) => props.setShowEdit(false)}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [team, setTeam] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    console.log(props.userId)
    axios.get(`/api/employees/${props.userId}`)
    .then(res => {
      console.log(res);
      // setSelectedEmployee(res.data);
      setFirstName(res.data.first_name);
      setLastName(res.data.last_name);
      setTeam(res.data.group_id);
      setJobTitle(res.data.job_title);
    })
    .catch(err => console.log(err));
  }, [props.showEdit]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // console.log(selectedEmployee);

  return (
    // <Container className={classes.mainContainer}>
      
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.showEdit} className={classes.mainContainer}>
        <DialogTitle id="customized-dialog-title" setShowEdit={props.setShowEdit}>
          Enter info
        </DialogTitle>
        <Container className={classes.mainContainerTest}>

        
        {/* <DialogContent dividers className={classes.center}> */}
          <Avatar alt="Remy Sharp" src="" className={classes.icon}/>
          {/* <h3>First Name</h3> */}
          <TextField
            name='firstName'
            label='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* <h3>Last Name</h3> */}
          <TextField
            name='lastName'
            label='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {/* <h3>Team</h3> */}
          <TextField
            name='team'
            label='Team'
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <MenuItem value={1}>Accounting</MenuItem>
            <MenuItem value={2}>Marketiing</MenuItem>
            <MenuItem value={3}>Dev Team</MenuItem>
          </TextField>
          {/* <h3>Job Title</h3> */}
          <TextField
            name='jobTitle'
            label='Job Title'
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        {/* </DialogContent> */}
        </Container>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    // </Container>
  );
}

const useStyles = makeStyles({
  mainContainer: {
    width: '100vw'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  icon: {
    width: 100,
    height: 100
  },
  mainContainerTest: {
    width: '100%',
    height: '60vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    margin: 0
  }
})