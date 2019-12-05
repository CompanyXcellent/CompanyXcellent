import React from 'react';
import Dropzone from 'react-dropzone';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { relative } from 'path';

const ImageFile = (props) => {
  const classes = useStyles();

  const readURI = (file) => {
    if (file) {
      let reader = new FileReader();
      reader.onload = (ev) => {
        props.setImageURI(ev.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleChange = (acceptedFiles) => {
    let file = acceptedFiles[0];
    props.setImgFile(file);
    readURI(file); // maybe call this with webworker or async library?
    if (props.onChange !== undefined)
      props.onChange(file); // propagate to parent component
  }


  return (
    <Container className={classes.imagePreviewContainer}>
        <CardMedia
          component='img'
          className={classes.img}
          src={ props.imageURI ? props.imageURI : props.profileImg ? props.profileImg : 'https://resol-donee-pictures.s3-us-west-1.amazonaws.com/upload-icon-png-8.jpg'}
        />
      <Dropzone onDrop={acceptedFiles => handleChange(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <Container>
            <Container className={classes.center} {...getRootProps()}>
              <input {...getInputProps()} />
              <Button
                variant='contained'
                className={classes.marginTop10}
              >
                SELECT IMAGE
                </Button>
            </Container>
          </Container>
        )}
      </Dropzone>
    </Container>
  );
}

export default ImageFile;

const useStyles = makeStyles({
  imagePreviewContainer: {
    height: 'auto',
    // marginTop: 50,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // position: 'fixed',

    ['@media (min-width: 1280px)']: {
      alignItems: 'center'
    }
  },
  img: {
    borderRadius: '50%',

  },
  card: {
    height: '80%',
    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '50%',

    ['@media (min-width: 1280px)']: {
      width: '50%'
    }
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBotton: 10


  },
  marginTop10: {
    marginTop: 10,
  }
})
