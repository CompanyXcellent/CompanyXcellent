
import axios from 'axios'

export async function createPost() {
    let post = await axios.post("/api/createPost")
    this.setState({
        post: post.data
    })
}