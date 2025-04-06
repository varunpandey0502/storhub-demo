'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormField {
  blockType: string
  name: string
  label: string
  required?: boolean
  defaultValue?: any
  width?: string
  options?: { label: string; value: string }[]
  message?: any
}

interface FormProps {
  form: {
    id: string
    title: string
    fields: FormField[]
    submitButtonLabel: string
    confirmationType: string
    confirmationMessage?: any
    redirect?: {
      url: string
    }
    emails?: {
      to: string[]
      from: string
      subject: string
      html: string
    }[]
  }
}

export const QuoteForm: React.FC<FormProps> = ({ form }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: form.id,
          submissionData: data,
        }),
      })

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.')
      }

      setSuccess(true)
      reset()

      // Handle redirect if configured
      if (form.confirmationType === 'redirect' && form.redirect?.url) {
        window.location.href = form.redirect.url
      }

      // Scroll to top to show confirmation message
      window.scrollTo(0, 0)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // If form submission was successful and confirmation type is message
  if (success && form.confirmationType === 'message') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-4">Thank You!</h3>
        <div className="prose prose-lg mx-auto text-green-700">
          {form.confirmationMessage ? (
            <div dangerouslySetInnerHTML={{ __html: form.confirmationMessage }} />
          ) : (
            <p>Your form has been submitted successfully.</p>
          )}
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">{form.title}</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {form.fields.map((field) => {
            const fieldProps = {
              ...register(field.name, {
                required: field.required ? `${field.label} is required` : false,
              }),
              id: field.name,
              placeholder: field.label,
              defaultValue: field.defaultValue || '',
              className: `w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[field.name] ? 'border-red-500' : ''
              }`,
            }

            // Determine field width
            const fieldWidth = field.width === 'full' ? 'md:col-span-2' : ''

            switch (field.blockType) {
              case 'text':
                return (
                  <div key={field.name} className={fieldWidth}>
                    <label htmlFor={field.name} className="block text-gray-700 font-medium mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input type="text" {...fieldProps} />
                    {errors[field.name] && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors[field.name]?.message as string}
                      </p>
                    )}
                  </div>
                )

              case 'textarea':
                return (
                  <div key={field.name} className="md:col-span-2">
                    <label htmlFor={field.name} className="block text-gray-700 font-medium mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                      {...fieldProps}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors[field.name] && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors[field.name]?.message as string}
                      </p>
                    )}
                  </div>
                )

              case 'email':
                return (
                  <div key={field.name} className={fieldWidth}>
                    <label htmlFor={field.name} className="block text-gray-700 font-medium mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input type="email" {...fieldProps} />
                    {errors[field.name] && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors[field.name]?.message as string}
                      </p>
                    )}
                  </div>
                )

              case 'select':
                return (
                  <div key={field.name} className={fieldWidth}>
                    <label htmlFor={field.name} className="block text-gray-700 font-medium mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <select
                      {...register(field.name, {
                        required: field.required ? `${field.label} is required` : false,
                      })}
                      id={field.name}
                      defaultValue=""
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Select {field.label}
                      </option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors[field.name] && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors[field.name]?.message as string}
                      </p>
                    )}
                  </div>
                )

              case 'checkbox':
                return (
                  <div key={field.name} className={`flex items-start ${fieldWidth}`}>
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        {...register(field.name, {
                          required: field.required ? `${field.label} is required` : false,
                        })}
                        id={field.name}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={field.name} className="text-gray-700">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                    </div>
                    {errors[field.name] && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors[field.name]?.message as string}
                      </p>
                    )}
                  </div>
                )

              case 'message':
                return (
                  <div key={field.name} className="md:col-span-2">
                    <div className="prose prose-blue max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: field.message }} />
                    </div>
                  </div>
                )

              default:
                return null
            }
          })}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isSubmitting ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuoteForm
