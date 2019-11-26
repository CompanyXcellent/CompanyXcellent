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

  // useEffect(() => {
  //   console.log(props.userId)
  //   axios.get(`/api/employees/${props.userId}`)
  //   .then(res => {
  //     console.log(res);
  //     // setSelectedEmployee(res.data);
  //     setFirstName(res.data.first_name);
  //     setLastName(res.data.last_name);
  //     setTeam(res.data.group_id);
  //     setJobTitle(res.data.job_title);
  //   })
  //   .catch(err => console.log(err));
  // }, [props.showEdit]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log(props);

  return (
      // <Dialog 
      //   aria-labelledby="customized-dialog-title" 
      //   open={props.showEdit} >
      <>
        <DialogTitle>
          Enter info
        </DialogTitle>
        <Container className={classes.mainContainerTest}>
          <Avatar alt="Remy Sharp" src="" className={classes.icon}/>
          <TextField
            name='firstName'
            label='First Name'
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            name='lastName'
            label='Last Name'
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            name='team'
            label='Team'
            fullWidth
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <MenuItem value={1}>Accounting</MenuItem>
            <MenuItem value={2}>Marketiing</MenuItem>
            <MenuItem value={3}>Dev Team</MenuItem>
          </TextField>
          <TextField
            name='jobTitle'
            label='Job Title'
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Container>
        <DialogActions>
          <Button autoFocus onClick={() => props.setShowEdit(false)} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      {/* </Dialog> */}
      </>
  );
}

export default EditEmployeeDialog;

const useStyles = makeStyles({
  mainContainer: {
    width: '100vw'
  },
})