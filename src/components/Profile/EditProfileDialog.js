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
import './EditProfileDialog.css'
import {v4 as randomString} from 'uuid'
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

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [aboutMe, setAboutMe] = React.useState('')
  const [nickname, setNickname] = React.useState('')
  const [img, setImg] = React.useState('')

  console.log({aboutMe: aboutMe, nickname: nickname, imgURL: img})

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //--------------------S3 functions start----------------------

  const upLoadFile = (file, signedRequest, url) => {
    const options = {
        headers: {
            'Content-Type': file.type
        }
    }
    setImg(url)
    axios.put(signedRequest, file, options)
    //this put request goes and edits the file giving it an acutal value
    .catch(err => console.log(err))
  }

  const handleImage = () => {
    const file = document.getElementById('image-file').files[0]

    //makes it so that if we upload the same image twice they wont have conflicting names
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
    
    //here it makes the file and then calls upLoadFile which sends the file to s3 storage.
    axios.get('/api/signs3',{
        params:{
            'file-name': fileName,
            'file-type': file.type
        }
    })
    .then(res => {
        const{signedRequest, url} = res.data
        setImg(signedRequest)
        // makes the value of img on state to be the URL of the image in the s3 storage. through this url is how it is accessed later on the runner side.
        upLoadFile(file, signedRequest, url)
    })
    .catch(err => console.log(err))        
  }


  //----------------------S3 functions end


  const onSave = () => {
    handleClose()
    handleImage(img)
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Enter info
        </DialogTitle>
        <DialogContent dividers>
          <Avatar alt="Remy Sharp" src=""/>
          <br/>
          <input
            placeholder='profile pic'
            type='file'
            id='image-file'
          />
          <h3>NickName</h3>
          <input
            placeholder='nickname'
            onChange={(e) => setNickname(e.target.value)}
          />
          <h3>About</h3>
          <textarea onChange={(e) => setAboutMe(e.target.value)} placeholder='About me' rows="4" cols="50" id='about-me-input'/>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => onSave()} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
