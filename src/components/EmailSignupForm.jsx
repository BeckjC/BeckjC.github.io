import { useState } from 'react'

import { submitSignupEmail } from '../lib/signup.js'

export default function EmailSignupForm({
  source = 'homepage',
  placeholder = 'your email here',
  buttonLabel = 'send me the good stuff →',
  inputLabel = 'Email address',
  successMessage = 'You’re in. I saved your email.',
  className = '',
  formClassName = '',
  rowClassName = '',
}) {
  const [email, setEmail] = useState('')
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState({ status: 'loading', message: 'Saving…' })

    try {
      const result = await submitSignupEmail({ email, source })
      setEmail('')
      setSubmitState({
        status: 'success',
        message: result.duplicate ? 'You’re already on the list.' : successMessage,
      })
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Could not save your email right now.',
      })
    }
  }

  return (
    <div className={className}>
      <form className={`signup-form ${formClassName}`.trim()} onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={`${source}-email`}>
          {inputLabel}
        </label>
        <div className={`signup-row ${rowClassName}`.trim()}>
          <input
            id={`${source}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={placeholder}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (submitState.status !== 'idle') {
                setSubmitState({ status: 'idle', message: '' })
              }
            }}
            aria-label={inputLabel}
            aria-describedby={`${source}-signup-status`}
            disabled={submitState.status === 'loading'}
          />
          <button
            type="submit"
            className="button button-accent"
            disabled={submitState.status === 'loading'}
          >
            {submitState.status === 'loading' ? 'saving…' : buttonLabel}
          </button>
        </div>
        <p
          id={`${source}-signup-status`}
          className={`signup-status signup-status-${submitState.status}`}
          aria-live="polite"
        >
          {submitState.message}
        </p>
      </form>
    </div>
  )
}
