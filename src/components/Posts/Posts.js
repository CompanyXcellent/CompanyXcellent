import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RootRef } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { connect } from 'react-redux';
import { getUser } from '../../redux/reducers/userReducer';

import CreatPost from './CreatePost';

const Posts = (props) => {
  const classes = useStyles();
  const [posts, setPosts] = useState([])
  const [reRender, setReRender] = useState(false)

  const checkRerender = () => {
    if(reRender === false){
      setReRender(true)
    }
    setReRender(false)
  }

  useEffect(() => {
    props.getUser()
    getMyPosts()
  }, [props.userReducer.user.user_id])


  const getMyPosts = async () => {
    if(props.userReducer.user.user_id){
      await axios.get(`/api/posts/${props.userReducer.user.user_id}`)
      .then(res => {
        setPosts(res.data)
      })
    }     
  }

  const deletePost = (id) => {
    axios.delete(`/api/deletePost/${id}`)
    getMyPosts()
  }

  console.log(posts);

  return (
    <Container className={classes.mainContainer}>
      <h1>Posts</h1>
      <CreatPost props={props} getMyPosts={getMyPosts}/>
      {
        posts.map((e, i) => {
          return(
            <Container 
              key={e.post_id} 
              className={classes.postContainer}>
              <Container className={classes.avatarName}>
                <Avatar className={classes.avatar} src={e.profile_img} />
                <Typography variant='h6' className={classes.name}>{e.first_name} {e.last_name}</Typography>
              </Container>
              <Typography variant='body1'>{e.content}</Typography>
              {e.user_id === props.userReducer.user.user_id ?
                <Button
                  onClick={() => deletePost(e.post_id)}
                >delete</Button> :
                null
              }              
            </Container>
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

  },
  postContainer: {
    padding: 0
  },
  avatarName: {
    display: 'flex',
    alignItems: 'center',

    padding: 0
  },
  avatar: {
    margin: 0
  },
  name: {
    marginLeft: 16
  }
})