import { connectMongo, disconnectMongo } from '@services'
import { S3 } from 'aws-sdk'
import Book from '@models'
const s3 = new S3()

export const main = async (event) => {

  try {
    await connectMongo()
    const s3Event = event.Records[0].s3
    const bucketName = s3Event.bucket.name
    const objectKey = s3Event.object.key

    // Retrieve the metadata using the headObject API
    const headObjectResponse = await s3.headObject({ Bucket: bucketName, Key: objectKey }).promise()

    const metadata = headObjectResponse.Metadata

    // Access specific metadata properties
    const bookId = metadata.bookid
    const documentId = metadata.documentid

    if(!bookId || !documentId){
      throw new Error('missing metadata!')
      return
    }
    
    //update db
    await Book.findOneAndUpdate({
      bookId
    },{
      $push : {
        bookCoversInS3 : bookId
      }
    })

    // Perform database update or any other operations here

    await disconnectMongo()

  } catch (error) {
    console.error('Error:', error)
    await disconnectMongo()
  }
}

