import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Privacy Policy
          </p>
          <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Your Privacy Matters to Us
          </h1>
          <p className="mb-8 text-base leading-7 text-slate-600">
            At Job Portal, we are committed to protecting the personal
            information of job seekers, employers, and recruiters. This Privacy
            Policy explains how we collect, use, share, and protect information
            when you use our platform to search jobs, apply for positions, and
            connect with hiring teams.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                1. Information We Collect
              </h2>
              <p className="leading-7 text-slate-600">
                We may collect personal details such as your name, email
                address, phone number, location, resume, work experience,
                education, professional skills, job preferences, and account
                credentials. For employers, we may collect company details,
                hiring-related information, and contact details for recruiting
                purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                2. How We Use Your Information
              </h2>
              <p className="leading-7 text-slate-600">
                We use your information to provide access to job listings,
                personalize recommendations, process applications, improve user
                experience, manage accounts, communicate important updates, and
                support recruitment-related services. We may also use data to
                help detect fraud and maintain platform security.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                3. Sharing of Information
              </h2>
              <p className="leading-7 text-slate-600">
                We may share your information with employers, recruiters, or
                authorized hiring partners when you apply to a job, express
                interest in a role, or register as a company representative. We
                do not sell personal data. Information may also be shared with
                service providers who help us operate the platform securely and
                efficiently.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                4. Data Security
              </h2>
              <p className="leading-7 text-slate-600">
                We implement reasonable technical and organizational safeguards
                to protect user data from unauthorized access, misuse,
                alteration, or disclosure. However, no digital platform can
                guarantee absolute security, and users should also protect their
                account credentials.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                5. Cookies and Analytics
              </h2>
              <p className="leading-7 text-slate-600">
                We may use cookies and analytics tools to understand visitor
                behavior, improve site performance, and personalize user
                experiences. You can manage cookie preferences through your
                browser settings, although certain features may be limited if
                cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                6. Your Rights
              </h2>
              <p className="leading-7 text-slate-600">
                You may have the right to access, update, delete, or correct
                your personal information. If you wish to withdraw consent,
                update your preferences, or request data removal, please contact
                our support team using the details listed below.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                7. Contact Us
              </h2>
              <p className="leading-7 text-slate-600">
                If you have any questions about this Privacy Policy or how we
                handle your information, please contact us at
                support@jobportal.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
