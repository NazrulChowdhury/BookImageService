import { Handler } from 'aws-lambda'
import axios from 'axios'
import { S3 } from 'aws-sdk'
import Jimp from 'jimp'
import fs from 'fs'

interface EventDetail {
  bookId : string 
  imageLink: string
  documentId: string
}

const s3 = new S3()

export const main: Handler = async (event) => {

  try {
    
    const { bookId , imageLink, documentId }:EventDetail = event.detail

    if(!bookId || !imageLink || !documentId){
      throw new Error('invalid parameter!')
    }
    const imageName = `${documentId}-${bookId}.jpeg`

    // Fetch the image
    const response = await axios.get(imageLink, { responseType: 'arraybuffer' })
    const imageBuffer = Buffer.from(response.data, 'binary')

    // Load the image using Jimp
    const image = await Jimp.read(imageBuffer)

    // Convert to JPEG if not already in JPEG format
    if (!isJPEGFormat(imageLink)) {
      const tempFilePath = '/tmp/temp.jpg'
      await image.quality(100).writeAsync(tempFilePath) // conversion happens based on the path's extension

      const convertedBuffer = await Jimp.read(tempFilePath)
      fs.unlinkSync(tempFilePath) // Delete the temporary file

      await s3
        .putObject({
          Bucket: process.env.BUCKET_NAME!,
          Key: imageName,
          Body: await convertedBuffer.getBufferAsync(Jimp.MIME_JPEG),
          ContentType: 'image/jpeg',
        })
        .promise()
    } else {
      await s3
        .putObject({
          Bucket: process.env.BUCKET_NAME!,
          Key: imageName,
          Body: imageBuffer,
          ContentType: 'image/jpeg',
        })
        .promise()
    }
  } catch (error) {
    console.error('Image upload error:', error)
  }
}

function isJPEGFormat(imageLink: string): boolean {
  const extension = imageLink.split('.').pop()?.toLowerCase()
  return extension === 'jpg' || extension === 'jpeg'
}


