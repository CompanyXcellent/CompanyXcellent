import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';

const EditEmployeeDialog = () => {
  const classes = useStyles();

  return (
    <Dialog className={classes.mainContainer}>

    </Dialog>
  )
}

export default EditEmployeeDialog;

const useStyles = makeStyles({
  mainContainer: {

  }
})