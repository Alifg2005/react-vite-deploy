import type { FormEvent, ChangeEvent, JSX } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../../shared/context/RoleContext";
import { useAuth } from "../../../shared/context/AuthContext";
import AuthLayout from "../../../layouts/AuthLayout";
import {
  FIELD_CLASS,
  SUBMIT_CLASS,
  ACCOUNT_TYPES,
  REGISTER_DATA,
} from "../../../mock";
import { ApiError, registerRequest } from "../../../shared/lib/apiClient";

const { layout, form } = REGISTER_DATA;

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  accountType: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const INITIAL_FORM: RegisterForm = {
  fullName: "",
  email: "",
  phone: "",
  accountType: "student",
  password: "",
  confirmPassword: "",
  agree: false,
};

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const auth = useAuth();
  const [formData, setFormData] = useState<RegisterForm>(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(form.passwordMismatchAlert);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const { token, user } = await registerRequest({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        accountType: formData.accountType,
        password: formData.password,
      });
      auth.login(token, user);
      setRole(user.accountType);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError && err.code === "email_exists"
          ? form.emailExistsError
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
          <label className="mb-2 block font-semibold text-brand-text">{form.fullNameLabel}</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={FIELD_CLASS} />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-brand-text">{form.emailLabel}</label>
          <input type="email" name="email" placeholder={form.emailPlaceholder} value={formData.email} onChange={handleChange} required className={FIELD_CLASS} />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-brand-text">{form.phoneLabel}</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={FIELD_CLASS} />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-brand-text">{form.passwordLabel}</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder={form.passwordPlaceholder} value={formData.password} onChange={handleChange} required className={FIELD_CLASS} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-main hover:opacity-80">
              {showPassword ? form.hidePasswordLabel : form.showPasswordLabel}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-brand-text">{form.confirmPasswordLabel}</label>
          <div className="relative">
            <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder={form.passwordPlaceholder} value={formData.confirmPassword} onChange={handleChange} required className={FIELD_CLASS} />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-main hover:opacity-80">
              {showConfirm ? form.hidePasswordLabel : form.showPasswordLabel}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-brand-text">{form.accountTypeLabel}</label>
          <select name="accountType" value={formData.accountType} onChange={handleChange} className={FIELD_CLASS}>
            {ACCOUNT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-brand-muted">
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required className="accent-brand-main" />
          <span>{form.agreeLabel}</span>
        </label>

        <button type="submit" disabled={submitting} className={SUBMIT_CLASS}>{form.submitLabel}</button>

        <p className="text-center text-brand-muted">
          {form.hasAccountText}
          <button type="button" onClick={() => navigate("/login")} className="mr-2 font-bold text-brand-main hover:opacity-80">
            {form.loginLabel}
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
