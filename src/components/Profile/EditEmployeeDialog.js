import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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
  // const [selectedEmployee, setSelectedEmployee] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [team, setTeam] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
  //   axios.get(`/api/employees/${props.match.params.id}`)
    setFirstName(props.employee.first_name);
    setLastName(props.employee.last_name);
    setTeam(props.employee.group_name);
    setJobTitle(props.employee.job_title);
  }, [props.employee])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {

  }

  return (
      <Dialog
        aria-labelledby="customized-dialog-title" 
        open={props.update} >
        <DialogTitle>
          Enter info
        </DialogTitle>
        <DialogContent className={classes.DialogContentContainer}>
          {/* <Avatar alt="Remy Sharp" src="" className={classes.icon}/> */}
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
            <MenuItem value={1}>Accounting</MenuItem>
            <MenuItem value={2}>Marketiing</MenuItem>
            <MenuItem value={3}>Dev Team</MenuItem>
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
          <Button autoFocus onClick={handleClose} color="primary">
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