import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { randomUUID } from 'crypto'
import { extname } from 'path'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const mimeTypeRegex = /^(image|video)\/\w+/
    if (!mimeTypeRegex.test(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format' },
        { status: 400 },
      )
    }

    const fileId = randomUUID()
    const extension = extname(file.name)
    const fileName = fileId.concat(extension)

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString('base64')}`,
      {
        resource_type: 'auto',
        public_id: fileName,
        format: 'webp',
      },
    )

    return NextResponse.json({ fileUrl: result.secure_url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}
