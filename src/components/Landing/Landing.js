import React, { useEffect } from "react";
import axios from 'axios';


const Landing = (props) => {

  useEffect(() => {
    axios.get('/api/getUser')
    .then(res => {
      // console.log(props.location.state.from === true)
      if(props.location.state !== undefined){
        props.history.push(props.location.state.from.pathname)
        return
      }

      if(res.data.user_id){
        props.history.push('/posts');
      }
    })
    .catch(err => {
      if(err){
        window.location.href = process.env.REACT_APP_LOGIN_REDIRECT;
      }
    });
  }, [])

  return (
      <div>

      </div>
    )
}

export default Landing;