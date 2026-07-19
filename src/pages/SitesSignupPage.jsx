import EmailSignupForm from '../components/EmailSignupForm.jsx'

export default function SitesSignupPage() {
  return (
    <section className="section page-section site-intake-shell">
      <div className="section-heading">
        <h1>Sign me up!</h1>
        <p>
          The old intake form is deprecated. Drop your email here and Beck + E.C.H.O. will follow
          up with the next steps for the $10 website offer.
        </p>
      </div>

      <EmailSignupForm
        source="sites-signup-page"
        className="services-inline-signup"
        formClassName="signup-form-compact"
        rowClassName="signup-row-inline"
        inputLabel="Email address for website offer"
        buttonLabel="send me the next steps"
        successMessage="Nice — check your inbox. The next steps are on the way."
      />
    </section>
  )
}
