import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar'

import axios from 'axios'

const Team = () => {
  const classes = useStyles();
  const [team, setTeam] = useState([])
  useEffect(() => {
    getTeam()
  }, [])

  const getTeam = () => {
    axios.get(`/api/getTeam/${3}`)
    .then(res => setTeam(res.data))
  }
  console.log(team)
  return (
    <Container className={classes.mainContainer}>
      <h1>Team</h1>
      {team.map(e => {return(
        <div key={e.user_id} id='mini-view-employee-div'>
          <Avatar src={e.profile_img}/>
          <div  id='username-and-dialog-employees-div'>
            <h3>{e.username}</h3>
            <button>test rating button</button>
          </div>
        </div>
      )})}
    </Container>
  )
}

export default Team;

const useStyles = makeStyles({
  mainContainer: {

  }
})