import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'

const CreatePoll = () => {
  const classes = useStyles();

  const[question1, setQuestion1] = useState('')
  const[question2, setQuestion2] = useState('')
  const[question3, setQuestion3] = useState('')
  const[question4, setQuestion4] = useState('')
  const[question5, setQuestion5] = useState('')
  const[question6, setQuestion6] = useState('')
  const[question7, setQuestion7] = useState('')
  const[question8, setQuestion8] = useState('')
  const[question9, setQuestion9] = useState('')
  const[question10, setQuestion10] = useState('')
  const[question11, setQuestion11] = useState('')
  const[question12, setQuestion12] = useState('')
  const[question13, setQuestion13] = useState('')
  const[question14, setQuestion14] = useState('')
  const[question15, setQuestion15] = useState('')

  const handleSubmit = () => {
    axios.post('/api/makePoll', {
      q1: question1,
      q2: question2,
      q3: question3,
      q4: question4,
      q5: question5,
      q6: question6,
      q7: question7,
      q8: question8,
      q9: question9,
      q10: question10,
      q11: question11,
      q12: question12,
      q13: question13,
      q14: question14,
      q15: question15,
    })
    setQuestion1('')
    setQuestion2('')
    setQuestion3('')
    setQuestion4('')
    setQuestion5('')
    setQuestion6('')
    setQuestion7('')
    setQuestion8('')
    setQuestion9('')
    setQuestion10('')
    setQuestion11('')
    setQuestion12('')
    setQuestion13('')
    setQuestion14('')
    setQuestion15('')
    alert('poll submitted')
  }

  return (
    <Container className={classes.mainContainer}>
      <h1>Poll form</h1>
      <form>
        Question 1: <input name='question1' value={question1} onChange={(e) => {setQuestion1(e.target.value)}}/>
        Question 2: <input name='question2' value={question2} onChange={(e) => {setQuestion2(e.target.value)}}/>
        Question 3: <input name='question3' value={question3} onChange={(e) => {setQuestion3(e.target.value)}}/>
        Question 4: <input name='question4' value={question4} onChange={(e) => {setQuestion4(e.target.value)}}/>
        Question 5: <input name='question5' value={question5} onChange={(e) => {setQuestion5(e.target.value)}}/>
        Question 6: <input name='question6' value={question6} onChange={(e) => {setQuestion6(e.target.value)}}/>
        Question 7: <input name='question7' value={question7} onChange={(e) => {setQuestion7(e.target.value)}}/>
        Question 8: <input name='question8' value={question8} onChange={(e) => {setQuestion8(e.target.value)}}/>
        Question 9: <input name='question9' value={question9} onChange={(e) => {setQuestion9(e.target.value)}}/>
        Question 10: <input name='question10' value={question10} onChange={(e) => {setQuestion10(e.target.value)}}/>
        Question 11: <input name='question11' value={question11} onChange={(e) => {setQuestion11(e.target.value)}}/>
        Question 12: <input name='question12' value={question12} onChange={(e) => {setQuestion12(e.target.value)}}/>
        Question 13: <input name='question13' value={question13} onChange={(e) => {setQuestion13(e.target.value)}}/>
        Question 14: <input name='question14' value={question14} onChange={(e) => {setQuestion14(e.target.value)}}/>
        Question 15: <input name='question15' value={question15} onChange={(e) => {setQuestion15(e.target.value)}}/>
      </form>
      <button
        onClick={handleSubmit}
      >Put Out Poll</button>
    </Container>
  )
}

export default CreatePoll;

const useStyles = makeStyles({
  mainContainer: {

  }
})