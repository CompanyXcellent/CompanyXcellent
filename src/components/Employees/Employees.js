import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EditEmployeeDialog from './EditEmployeeDialog'

const Employees = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <h1>Employees</h1>
      <EditEmployeeDialog/>
    </Container>
  )
}

export default Employees;

const useStyles = makeStyles({
  mainContainer: {

  }
})