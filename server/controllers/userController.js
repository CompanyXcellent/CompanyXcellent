const aws = require('aws-sdk')
const{S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

module.exports={
    storeProfilePic: (req, res) => {
        // console.log('hit backend')
        aws.config = {
            region: 'us-west-1',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
        const s3 = new aws.S3({signatureVersion: 'v4'})
        const fileName = req.query['file-name']
        const fileType = req.query['file-type']
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        }
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            // console.log('hit get signedurl', err, data)
            if(err){
                console.log(err)
                return res.end()
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3-us-west-1.amazonaws.com/${fileName}`
            }
            // console.log(fileName)
            // console.log(returnData)
            return res.send(returnData)
        })
    },
    getMySubscribedPosts: async (req, res) => {
        console.log('hit posts')
        const db = req.app.get('db')
        const {id} = req.params
        console.log(id)
        const mySubscribedPosts = await db.get_user_subscribed_posts(id)

        res.status(200).send(mySubscribedPosts)
    },
    updateProfile: (req, res) => {
        const db = req.app.get('db');
        const { profileImg, about, nickname } = req.body;
        const { id } = req.params;

        db.update_profile(profileImg, about, nickname, id);

        res.sendStatus(200);
    },
    makePost: async (req, res) => {
        const {content, id} = req.body
        const db = req.app.get('db')
        db.make_post(content, id)
        res.sendStatus(200)

    },
    deletePost: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        db.delete_post(id)
        res.sendStatus(200)       
    },
    getUserInfo: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        let userInfo = await db.get_user_info(id)
        res.status(200).send(userInfo)
    },
    getTeam: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        let team = await db.get_my_team(id)
        res.status(200).send(team)
    },
    getPoll: async (req, res) => {
        const db = req.app.get('db')
        let poll = await db.get_poll()
        res.status(200).send(poll)
    },
    submitPollResponse: (req, res) => {
        const {questionId, value, responderId, receiverId} = req.body
        const db = req.app.get('db')
        db.submit_response_to_poll(questionId, value, responderId, receiverId)
        res.sendStatus(200)
    },
    getEmployeeRating: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        db.get_employee_ratings(id)
        res.sendStatus(200)
     }
}