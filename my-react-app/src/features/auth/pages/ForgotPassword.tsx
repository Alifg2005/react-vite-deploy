import type { FormEvent, JSX } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import { FORGOT_PASSWORD_DATA, FIELD_CLASS, SUBMIT_CLASS } from "../../../mock";

const { layout, form, success } = FORGOT_PASSWORD_DATA;

export default function ForgotPassword(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <AuthLayout
      backTo={layout.backTo}
      panelTitle={layout.panelTitle}
      panelSubtitle={layout.panelSubtitle}
      heading={layout.heading}
      subheading={layout.subheading}
    >
      {sent ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center font-semibold leading-7 text-emerald-800">
            {success.message}
          </div>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={SUBMIT_CLASS}
          >
            {success.backToLoginLabel}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold text-brand-text">
              {form.emailLabel}
            </label>
            <input
              type="email"
              placeholder={form.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={FIELD_CLASS}
            />
          </div>

          <button type="submit" disabled={loading} className={SUBMIT_CLASS}>
            {loading ? form.loadingLabel : form.submitLabel}
          </button>

          <p className="text-center text-brand-muted">
            {form.rememberPasswordText}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mr-2 font-bold text-brand-main hover:opacity-80"
            >
              {form.backToLoginLabel}
            </button>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
