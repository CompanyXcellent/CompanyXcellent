import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

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

function RatingDialog(props) {
  const [open, setOpen] = React.useState(false);
  //rating
  const[poll, setPoll] = React.useState([])
  const[question0, setQuestion0] = React.useState(0)
  const[question1, setQuestion1] = React.useState(0)
  const[question2, setQuestion2] = React.useState(0)
  const[question3, setQuestion3] = React.useState(0)
  const[question4, setQuestion4] = React.useState(0)
  const[question5, setQuestion5] = React.useState(0)
  const[question6, setQuestion6] = React.useState(0)
  const[question7, setQuestion7] = React.useState(0)
  const[question8, setQuestion8] = React.useState(0)
  const[question9, setQuestion9] = React.useState(0)
  const[question10, setQuestion10] = React.useState(0)
  const[question11, setQuestion11] = React.useState(0)
  const[question12, setQuestion12] = React.useState(0)
  const[question13, setQuestion13] = React.useState(0)
  const[question14, setQuestion14] = React.useState(0)
  const[question15, setQuestion15] = React.useState(0)
 

  const stateFunctions = [
    {num:0, func:setQuestion0, out:question0}, 
    {num:1, func:setQuestion1, out:question1}, 
    {num:2, func:setQuestion2, out:question2}, 
    {num:3, func:setQuestion3, out:question3}, 
    {num:4, func:setQuestion4, out:question4}, 
    {num:5, func:setQuestion5, out:question5}, 
    {num:6, func:setQuestion6, out:question6}, 
    {num:7, func:setQuestion7, out:question7}, 
    {num:8, func:setQuestion8, out:question8}, 
    {num:9, func:setQuestion9, out:question9},
    {num:10, func:setQuestion10, out:question10},
    {num:11, func:setQuestion11, out:question11},
    {num:12, func:setQuestion12, out:question12},
    {num:13, func:setQuestion13, out:question13},
    {num:14, func:setQuestion14, out:question14},
    {num:15, func:setQuestion15, out:question15},
    
  ]
  
  useEffect(() => {
    axios.get('/api/poll').then(res => setPoll(res.data))
  }, [])

  
  const handleSubmitPoll = async () => {
    let questionsArr = [
      question0,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
      question11,
      question12,
      question13,
      question14,
      question15,
    ]
    await questionsArr.map((e, i) => {      
      if(e !== 0){
        axios.post('/api/pollResponseSubmition', {questionId: i, value: e, responderId: 2, receiverId: props.empId})
      }
    })
    // if you want  people to only be able to vote one time, you will have to incorporate redux and use the id value of the person logged in to go in the responderId value in place of 2, and then revamp a little the code so that before anything else it checks to make sure that the user hasnt already voted

    handleClose()
    setQuestion0(0)
    setQuestion1(0)
    setQuestion2(0)
    setQuestion3(0)
    setQuestion4(0)
    setQuestion5(0)
    setQuestion6(0)
    setQuestion7(0)
    setQuestion8(0)
    setQuestion9(0)
    setQuestion10(0)
    setQuestion11(0)
    setQuestion12(0)
    setQuestion13(0)
    setQuestion14(0)
    setQuestion15(0)
    props.keepUpdated()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  //rating
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  //rating
  function IconContainer(props) {
    const { value, ...other } = props;
    return (
      <Tooltip title={labels[value] || ''}>
        <span {...other} />
      </Tooltip>
    );
  }

  //rating
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  // console.log('empId', props.empId)
  return (
    <>
      <Button variant="contained" color="secondary" size='small' onClick={handleClickOpen} className={props.buttonClass}>
        Take Poll
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Poll
        </DialogTitle>
        <DialogContent dividers>
          
            {/* rating */}
            {poll.map((e, i) => {
              if(e.question !== ''){
                let id = i
                    return (
                        <div key={`question: ${id}`}>  
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">{e.question}</Typography>
                                <Rating
                                name={`${i}`}
                                value={stateFunctions[i].out}
                                precision={.5}
                                IconContainerComponent={IconContainer}
                                onChange={(event, newValue) => {
                                    stateFunctions[id].func(newValue)
                                }}
                                />
                            </Box>
                        </div>
                    );
            }})}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmitPoll} color="primary">
            Submit Poll
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RatingDialog