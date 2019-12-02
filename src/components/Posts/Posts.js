import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreatPost from './CreatePost'
import { getUser } from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import { RootRef } from '@material-ui/core';
import axios from 'axios'

const Posts = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.getUser()
    getMyPosts()
  }, [props.userReducer.user.user_id])

  const [posts, setPosts] = useState([])

  const getMyPosts = async () => {
    if(props.userReducer.user.user_id){
      await axios.get(`/api/getMySubscribedPosts/${props.userReducer.user.user_id}`)
      .then(res => {
        setPosts(res.data)
      })
    }     
  }

  const deletePost = (id) => {
    axios.delete(`/api/deletePost/${id}`)
    getMyPosts()
  }

  return (
    <Container className={classes.mainContainer}>
      <h1>Posts</h1>
      <CreatPost props={props} getMyPosts={getMyPosts}/>
      {
        posts.map((e, i) => {
          return(
            <div key={e.post_id} id='mini-view-employee-div'>
              <h3>{e.username}</h3>
              <p>{e.content}</p>
              {e.user_id === props.userReducer.user.user_id ?
                <button
                  onClick={() => deletePost(e.post_id)}
                >delete</button> :
                null
              }              
            </div>
          )
        })
      }
    </Container>
  )
}
const mapStateToProps = (rootReducer) => {
  return {
    userReducer: rootReducer.userReducer
  }
}

export default connect(mapStateToProps, { getUser })(Posts);

const useStyles = makeStyles({
  mainContainer: {

  }
})