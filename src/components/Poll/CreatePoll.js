import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './pollStyling.css';

const CreatePoll = () => {
  const classes = useStyles();

  const [numberOfQuestions, setNumbersOfQuestions] = useState(5);

  const [question1, setQuestion1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [question3, setQuestion3] = useState('')
  const [question4, setQuestion4] = useState('')
  const [question5, setQuestion5] = useState('')
  const [question6, setQuestion6] = useState('')
  const [question7, setQuestion7] = useState('')
  const [question8, setQuestion8] = useState('')
  const [question9, setQuestion9] = useState('')
  const [question10, setQuestion10] = useState('')
  const [question11, setQuestion11] = useState('')
  const [question12, setQuestion12] = useState('')
  const [question13, setQuestion13] = useState('')
  const [question14, setQuestion14] = useState('')
  const [question15, setQuestion15] = useState('')

  const handleSubmit = () => {
    const body = {};

    for (let i = 0; i < 15; i++) {
      if(i >= questions.length){
        body[`q${i + 1}`] = ''  
      } else {
        body[`q${i + 1}`] = questions[i].question
      }
    }
    console.log(body);

    axios.post('/api/poll', body);
    setQuestions([{...blankQuestion}]);
    alert('poll submitted');
  }

  const blankQuestion = { number: 0, question: '' }
  const [questions, setQuestions] = useState([
    { ...blankQuestion }
  ]);

  const addQuestion = () => {
    if (questions.length >= 15) {
      return;
    }
    setQuestions([...questions, { ...blankQuestion }]);
  };

  const handleQuestionChange = (e) => {
    const updatedQuestions = [...questions];

    updatedQuestions[e.target.name].question = e.target.value;

    setQuestions(updatedQuestions);
  };

  console.log(questions);
  const renderQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    renderQuestions.push(
      <TextField
        key={`q${i}`}
        name={`${i}`}
        label={`Question ${i + 1}`}
        variant='outlined'
        className={`${classes.marginTop16} ${classes.input}`}
        multiline
        rowsMax='3'
        value={questions[i].question}
        onChange={e => handleQuestionChange(e)}
      />
    )
  }

  return (
    <Container className={classes.mainContainer}>
      <Typography variant='h3' className={`${classes.textAlignCenter} ${classes.padding16}`}>Enter Questions</Typography>
      <Typography variant='h5' className={`${classes.textAlignCenter} ${classes.padding16}`}>15 Question Limit</Typography>
      <Button
        variant='contained'
        color='primary'
        size='large'
        className={classes.button}
        onClick={addQuestion}
      >
        Add Question
        </Button>
      {renderQuestions}
      <Button
        variant='contained'
        color='primary'
        size='large'
        className={`${classes.button} ${classes.marginTop16}`}
        onClick={handleSubmit}
      >
        Submit Poll
      </Button>
    </Container>
  )
}

export default CreatePoll;

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  padding16: {
    padding: 16
  },
  marginTop16: {
    marginTop: 16
  },
  button: {
    maxWidth: 175
  },
  input: {
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: '90%'

    },

    [theme.breakpoints.up('lg')]: {
      width: '75%'

    }
  }
}))
