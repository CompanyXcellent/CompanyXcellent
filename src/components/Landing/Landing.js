import React, { useEffect } from "react";
import axios from 'axios';


const Landing = (props) => {

  useEffect(() => {
    axios.get('/api/getUser')
    .then(res => {
      if(res.data.user_id){
        props.history.push('/posts');
      }
    })
    .catch(err => {
      if(err){
        window.location.href = "http://localhost:3030/api/auth";
      }
    });
  }, [])

  return (
      <div>

      </div>
    )
}

export default Landing;