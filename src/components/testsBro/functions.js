
import axios from 'axios'

export async function createPost() {
    let post = await axios.post("/api/createPost")
    this.setState({
        post: post.data
    })
}

export async function getEmployeeRating() {
    const variable = await axios.post('http://localhost:3030/api/employeeRatingsRetrieval', { questionId: 0, receiverId: 1 })
        .then(res => {
            return res.data
        })
        .catch(err => err)
    return variable
}

export async function testingGetTeamEndpoint() {
    const team = await axios.get('http://localhost:3030/api/team/1')
        .then(res => {
            return res.data
        })
        .catch(err => err)
    return team
}

export async function testingGetPosts() {
    const posts = await axios('http://localhost:3030/api/posts/1')
        .then(res => res.data)
        .catch(err => err)
    return posts
}

export async function testGetPoll() {
    const poll = await axios('http://localhost:3030/api/poll')
        .then(res => res.data)
        .catch(err => err)
    return poll

}

export async function testPostPoll() {
    const questions = await axios('http://localhost:3030/api/poll')
        .then(res => res.data)
        .catch(err => err)
    return questions
}

export async function testResponses() {
    const responses = await axios('http://localhost:3030/api/poll')
        .then(res => res.data)
        .catch(err => err)
    return responses
}

export async function testRatingsRetrieval() {
    const ratings = await axios('http://localhost:3030/api/employeeRatingsRetrieval')
        .then(res => res.data)
        .catch(err => err)
    return ratings
}

export async function testUsersInfo() {
    const userInfo = await axios(`http://localhost:3030/api/profile/1`)
        .then(res => res.data)
        .catch(err => err)
    return userInfo
}

export async function testUpdateProfile() {
    const newInfo = await axios('http://localhost:303/api/profile/')
        .then(res => res.data)
        .catch(err => err)
    return newInfo
}

export async function testGetEmployees() {
    const employees = await axios('http://localhost:3030/api/employees')
        .then(res => res.data)
        .catch(err => err)
    return employees
}

export async function testEmployee() {
    const employee = await axios('http://localhost:3030/api/employees/1')
        .then(res => res.data)
        .catch(err => err)
    return employee
}
