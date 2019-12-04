import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RootRef } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';

import PostAddIcon from '@material-ui/icons/PostAdd';

import { connect } from 'react-redux';
import { getUser } from '../../redux/reducers/userReducer';

import CreatPost from './CreatePost';

const Posts = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState('');

  useEffect(() => {
    props.getUser()
    getMyPosts()
  }, [props.userReducer.user.user_id])


  const getMyPosts = async () => {
    if(props.userReducer.user.user_id){
      console.log(props.userReducer)
      await axios.get(`/api/posts/${props.userReducer.user.user_id}`)
      .then(res => {
        // console.log(res.data);
        setPosts(res.data)
      })
    }     
  }

  const deletePost = (id) => {
    axios.delete(`/api/deletePost/${id}`)
    getMyPosts()
  }

  const makeNewPost = () => {
    console.log('creating new post')
    axios.post('/api/post', {content: post, id: props.userReducer.user.user_id})
  }

  const createPost = async (e) => {
    e.preventDefault();

    await makeNewPost();
    setPost('');
    getMyPosts();
  }

  // console.log(posts);

  return (
    <Container className={classes.mainContainer}>
      <CreatPost props={props} getMyPosts={getMyPosts}/>
      <Container className={classes.makePostContainer}>
        <TextField 
          label='Make a post ...'
          className={classes.makePostInput}
          variant='filled'
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment className={classes.inputAdornment} position="end">
                <PostAddIcon onClick={createPost} className={classes.icon} />
              </InputAdornment>
            ),
         }}
          multiline
          rows='6'
          value={post}
          onChange={e => setPost(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? createPost(e) : null} />
      </Container>
      {
        posts.map((e, i) => {
          return(
            <Paper 
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
            </Paper>
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

const useStyles = makeStyles(theme => ({
  mainContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: 32,

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  makePostContainer: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      width: '80%',
      height: '100%',

      display: 'flex',
      flexDirection: 'column',

    }
  },
  makePostInput: {
    [theme.breakpoints.up('lg')]: {
      // padding: 16
    }
  },
  inputAdornment: {
    // width: '100%',
    height: '100px',
    fontSize: 100,
    
    display: 'flex',
    alignItems: 'flex-end'
  },
  icon: {
    fontSize: 35
  },
  postContainer: {
    padding: 8,

    marginTop: 16,

    [theme.breakpoints.up('lg')]: {
      width: '75%',

      padding: 32,

      borderRadius: 20
    }
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
}))