import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Terms of Service
          </p>
          <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mb-8 text-base leading-7 text-slate-600">
            By using Job Portal, you agree to the terms below. These terms
            govern your access to and use of our platform for job searching,
            applications, and recruitment services.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                1. Eligibility
              </h2>
              <p className="leading-7 text-slate-600">
                You must be at least 18 years old or have the necessary legal
                authority to use our services. Users are responsible for
                ensuring the information they provide is accurate and lawful.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                2. Account Responsibility
              </h2>
              <p className="leading-7 text-slate-600">
                You agree to keep your account secure, protect your login
                credentials, and provide truthful information. We reserve the
                right to suspend or restrict accounts that violate these rules.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                3. Job Applications
              </h2>
              <p className="leading-7 text-slate-600">
                Job Portal acts as a platform for connecting job seekers with
                employers. We are not responsible for the content, hiring
                decisions, or outcomes of third-party employers or recruiters
                using the platform.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                4. Prohibited Activities
              </h2>
              <p className="leading-7 text-slate-600">
                Users may not misuse the platform, submit false profiles, spam
                other users, or engage in unlawful activities. We reserve the
                right to remove content or restrict access when necessary.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                5. Platform Changes
              </h2>
              <p className="leading-7 text-slate-600">
                We may update features, layout, functionality, or these terms at
                any time. Continued use of the platform indicates your
                acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                6. Contact Information
              </h2>
              <p className="leading-7 text-slate-600">
                For support or questions regarding these terms, contact us at
                support@jobportal.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
