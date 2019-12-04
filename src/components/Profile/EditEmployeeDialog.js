import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { MenuItem } from '@material-ui/core';


// const styles = theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)(props => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {props.setShowEdit ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={(e) => props.setShowEdit(false)}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles(theme => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles(theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

const EditEmployeeDialog = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [team, setTeam] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    setFirstName(props.employee.first_name);
    setLastName(props.employee.last_name);
    setTeam(props.employee.group_id);
    setJobTitle(props.employee.job_title);
  }, [props.employee])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if(!firstName || !lastName || !team || !jobTitle){
      return
    }

    axios.put(`/api/employees/${props.employee.user_id}`, {firstName, lastName, team, jobTitle})
    .then(res => {
      console.log(res);
      props.setUpdate(false);
    })
    .catch(err => console.log(err));
  }

  return (
      <Dialog
        aria-labelledby="customized-dialog-title" 
        open={props.update} >
        <DialogTitle>
          Enter info
        </DialogTitle>
        <DialogContent className={classes.DialogContentContainer}>
          <TextField
            name='firstName'
            label='First Name'
            variant='outlined'
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            name='lastName'
            label='Last Name'
            variant='outlined'
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            name='team'
            label='Team'
            variant='outlined'
            fullWidth
            value={team}
            select
            onChange={(e) => setTeam(e.target.value)}
          >
            <MenuItem value={8}>Accounting</MenuItem>
            <MenuItem value={7}>Marketing</MenuItem>
            <MenuItem value={4}>Dev Team</MenuItem>
            <MenuItem value={6}>Sales</MenuItem>
          </TextField>
          <TextField
            name='jobTitle'
            label='Job Title'
            variant='outlined'
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => props.setUpdate(false)} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={() => handleSubmit()} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default EditEmployeeDialog;

const useStyles = makeStyles({
  DialogContentContainer: {
    height: '45vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
})