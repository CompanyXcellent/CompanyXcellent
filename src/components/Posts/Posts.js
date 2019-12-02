import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreatPost from './CreatePost'
import { getUser } from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import { RootRef } from '@material-ui/core';
import axios from 'axios'
import Button from '@material-ui/core/Button'

const Posts = (props) => {
  const classes = useStyles();
  const [posts, setPosts] = useState([])
  const [reRender, setReRender] = useState(false)

  const checkRerender = () => {
    if(reRender === false){
      setReRender(true)
    }
    setReRender(false)
    console.log('rerendered')
  }

  useEffect(() => {
    props.getUser()
    getMyPosts()
  }, [props.userReducer.user.user_id])


  const getMyPosts = async () => {
    console.log(props.userReducer.user)
    if(props.userReducer.user.user_id){
      await axios.get(`/api/getMySubscribedPosts/${props.userReducer.user.user_id}`)
      .then(res => {
        setPosts(res.data)
        console.log(res.data)
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
                <Button
                  onClick={() => deletePost(e.post_id)}
                >delete</Button> :
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