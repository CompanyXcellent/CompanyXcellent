import React from 'react';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

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
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [postContent, setPostContent] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPostContent('');
  };

  const makeNewPost = () => {
    axios.post('/api/post', {content: postContent, id: props.props.userReducer.user.user_id})
    
  }

  const send = async () => {
    await makeNewPost()
    handleClose()
    props.getMyPosts()
  }
  return (
    <Container className={classes.mainContainer}>
      <Button 
        variant="contained" 
        color="secondary"
        className={classes.addPostButton} 
        onClick={handleClickOpen}>
        Make Post
      </Button>
      <Dialog 
        onClose={handleClose} 
        aria-labelledby="customized-dialog-title" 
        open={open} 
        className={classes.mainContainer}
        // maxWidth='lg'
        fullWidth >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          What do you want to say?
        </DialogTitle>
        <DialogContent dividers>
          <TextField 
            name='post'
            label='Post'
            variant='outlined'
            fullWidth
            multiline
            rows='4'
            rowsMax='4'
            value={postContent}
            onChange={e => setPostContent(e.target.value)} />

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={send} color="primary">
            Create Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


export default CustomizedDialogs;

const useStyles = makeStyles( theme => ({
  mainContainer: {
    width: '100%',

    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  addPostButton: {
    position: 'fixed',
    bottom: 16,
    right: 16
  }
}))
