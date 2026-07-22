import type { FormEvent, JSX } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../../shared/context/RoleContext";
import { useAuth } from "../../../shared/context/AuthContext";
import AuthLayout from "../../../layouts/AuthLayout";
import { FIELD_CLASS, SUBMIT_CLASS, LOGIN_DATA } from "../../../mock";
import SocialLoginButtons from "../components/SocialLoginButtons";
import { ApiError, loginRequest } from "../../../shared/lib/apiClient";

const { layout, form } = LOGIN_DATA;

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const auth = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { token, user } = await loginRequest(email, password);
      auth.login(token, user);
      setRole(user.accountType);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError && err.code === "invalid_credentials"
          ? form.invalidCredentialsError
          : form.genericError,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      backTo={layout.backTo}
      panelTitle={layout.panelTitle}
      panelSubtitle={layout.panelSubtitle}
      heading={layout.heading}
      subheading={layout.subheading}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800">
            {error}
          </div>
        )}

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

        <div>
          <label className="mb-2 block font-semibold text-brand-text">
            {form.passwordLabel}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={form.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={FIELD_CLASS}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-main hover:opacity-80"
            >
              {showPassword ? form.hidePasswordLabel : form.showPasswordLabel}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-brand-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-brand-main"
            />
            {form.rememberLabel}
          </label>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="font-semibold text-brand-main transition hover:opacity-80"
          >
            {form.forgotPasswordLabel}
          </button>
        </div>

        <button type="submit" disabled={submitting} className={SUBMIT_CLASS}>
          {form.submitLabel}
        </button>

        <p className="text-center text-brand-muted">
          {form.noAccountText}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mr-2 font-bold text-brand-main hover:opacity-80"
          >
            {form.registerLabel}
          </button>
        </p>

        <SocialLoginButtons dividerText={form.socialDividerText} />
      </form>
    </AuthLayout>
  );
}
