import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'

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
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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



function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [aboutMe, setAboutMe] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const makeNewPost = () => {
    axios.post('/api/makePost', {content: aboutMe, id: props.props.userReducer.user.user_id})
    
  }

  const send = async () => {
    await makeNewPost()
    handleClose()
    props.getMyPosts()
  }
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Make Post
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          What do you want to say?
        </DialogTitle>
        <DialogContent dividers>
          <Avatar alt="Remy Sharp" src=""/>
          <br/>
          {/* <h3>Title</h3>
          <input
            placeholder='Title'
          /> */}
          {/* right here some extra functionality, making it so that the posts can have a title as well. it will require minor changes to posts in the data base, as well as some of the display and code on the backend and the Posts component */}
          <h3>Content</h3>
          <textarea onChange={(e) => setAboutMe(e.target.value)} placeholder='Content' rows="4" cols="50" id='about-me-input'/>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={send} color="primary">
            Create Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default CustomizedDialogs
