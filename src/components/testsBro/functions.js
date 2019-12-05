
import axios from 'axios'

export async function createPost() {
    let post = await axios.post("/api/createPost")
    this.setState({
        post: post.data
    })
}

export async function getEmployeeRating(){
    const variable = await axios.post('http://localhost:3030/api/employeeRatingsRetrieval', { questionId: 0, receiverId: 1 })
    .then(res => {
        return res.data
    })
    .catch(err => err)
    return variable
}

export async function testingGetTeamEndpoint(){
    const team = await axios.get('http://localhost:3030/api/team/1')
    .then(res => {
        return res.data
    })
    .catch(err => err)
    return team
}

export async function testingGetPosts(){
    const posts = await axios('http://localhost:3030/api/posts/1')
    .then(res => res.data)
    .catch(err => err)
    return posts
}

export async function testGetPoll(){
    const poll = await axios('http://localhost:3030/api/poll')
    .then(res => res.data)
    .catch(err => err)
    return poll

}