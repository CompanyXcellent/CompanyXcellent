
import axios from 'axios'

export async function createPost() {
    let post = await axios.post("/api/createPost")
    this.setState({
        post: post.data
    })
}

export function getEmployeeRating(){
    // const endval = ''
    axios.post('/api/employeeRatingsRetrieval', { questionId: 0, receiverId: 1 })
    // .then(res => {
    //     endval = res.data[0].avg
    // })
    // .catch(err => err)
    // return endval
}