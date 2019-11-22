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
        console.log('hti get posts')
        const db = req.app.get('db')
        const {userId} = req.params
        console.log(userId)
        const mySubscribedPosts = await db.get_user_subscribed_posts(userId)

        res.status(200).send(mySubscribedPosts)
    }
}