import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {v4 as randomString} from 'uuid'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close';

// import ProfileImagePreview from './ProfileImgPreview';
import ImageFile from './ProfileImgPreview';

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
    overflow:'scroll'
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

  const [aboutMe, setAboutMe] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [profileImg, setProfileImg] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [imageURI, setImageURI] = useState(null);

  useEffect(() => {
    setAboutMe(props.employee.about);
    setNickname(props.employee.nickname);
    setProfileImg(props.employee.profile_img);
  }, [props.employee])

  const handleClose = () => {
    setImageURI(null);
    props.setEdit(false);
  };

  //--------------------S3 functions start----------------------

  const getSignedRequest = (imgFile) => {
    console.log(imgFile);
    const fileName = `${randomString()}-${imgFile.name.replace(/\s/g, '-')}`

    axios.get('/api/signs3', {
      params: {
        'file-name': fileName,
        'file-type': imgFile.type
      }
    })
      .then((res) => {
        const { signedRequest, url } = res.data
        uploadFile(imgFile, signedRequest, url)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(res => {
        axios.put(`/api/profile/${props.user.user_id}`, {profileImg: url, about: aboutMe, nickname})
        .then(res => {
          console.log(res)
          props.setEdit(false);
        })
        .catch(err => console.log(err))
      })
      .catch(err => {
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
            err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };


  //----------------------S3 functions end

  const handleSubmit = async () => {
    if (imageURI === null || !imgFile) {
      axios.put(`/api/profile/${props.user.user_id}`, {about: aboutMe, nickname})
        .then(res => {
          console.log(res)
          props.setEdit(false);
        })
        .catch(err => console.log(err))
      return;
    }
    // if (!aboutMe || !nickname || imageURI === null || !imgFile) {
    //   // setError(true);
    //   return;
    // }

    await getSignedRequest(imgFile);

    
    
    // setSuccess(true);
    // props.history.push('/admin/applications');
  }

  return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.edit}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Enter info
        </DialogTitle>
        <DialogContent dividers className={classes.dialogContentContainer}>
          <ImageFile profileImg={profileImg} setImgFile={setImgFile} imageURI={imageURI} setImageURI={setImageURI} />
          <TextField
            label='Nickname'
            variant='outlined'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={classes.nicknameInput}
          />
          <TextField 
            label='About'
            variant='outlined'
            multiline
            fullWidth
            rows="4"
            value={aboutMe} 
            onChange={(e) => setAboutMe(e.target.value)} 
            id='about-me-input'
            className={classes.aboutInput}
          />

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleSubmit()} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
  );
}

const useStyles = makeStyles({
  dialogContentContainer: {
    height: '70vh',
    // paddingTop:

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'scroll'
  },
  avatar: {
    width: 100,
    height: 100
  },
  nicknameInput: {
    marginTop: 10
  },
  aboutInput: {
    marginTop: 10
  }
})