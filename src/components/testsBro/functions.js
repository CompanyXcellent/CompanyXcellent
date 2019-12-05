
import axios from 'axios'

export async function createPost() {
    let post = await axios.post("/api/createPost")
    this.setState({
        post: post.data
    })
}

export async function getEmployeeRating(){
    // const endval = ''
    const variable = await axios.post('http://localhost:3030/api/employeeRatingsRetrieval', { questionId: 0, receiverId: 1 })
    .then(res => {
        return res.data
    })
    .catch(err => err)
    return variable
    //you have to make it match this format witht the axuis request for it to return what you wnat
}