import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()

    const { form, submissionData } = body

    if (!form || !submissionData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create the form submission
    const submission = await payload.create({
      collection: 'form-submissions',
      data: {
        form,
        submissionData,
      },
    })

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json(
      { error: 'An error occurred while submitting the form' },
      { status: 500 },
    )
  }
}
