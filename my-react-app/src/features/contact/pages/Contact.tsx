import type { ChangeEvent, FormEvent, JSX } from "react";
import { useState } from "react";
import { CONTACT_DATA, INITIAL_CONTACT_FORM } from "../../../mock";
import { useAuth } from "../../../shared/context/AuthContext";
import { ApiError, fileToBase64, submitContactRequest } from "../../../shared/lib/apiClient";
import ContactBanner from "./components/ContactBanner";
import ContactForm from "./components/ContactForm";
import GuidelinesSection from "./components/GuidelinesSection";
import FaqSection from "./components/FaqSection";

interface FormStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const INITIAL_STATUS: FormStatus = { loading: false, success: false, error: null };
const { form: contactFormText } = CONTACT_DATA;

function Contact(): JSX.Element {
  const auth = useAuth();
  const [formData, setFormData] = useState(INITIAL_CONTACT_FORM);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState<number>(0);
  const [status, setStatus] = useState<FormStatus>(INITIAL_STATUS);

  function handleFieldChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAttachmentChange(e: ChangeEvent<HTMLInputElement>): void {
    setAttachment(e.target.files?.[0] ?? null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!auth.token) {
      setStatus({ loading: false, success: false, error: contactFormText.authRequiredError });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const attachments = attachment ? [await fileToBase64(attachment)] : [];
      await submitContactRequest(
        {
          subject: formData.subject,
          message: formData.message,
          messageType: formData.messageType || undefined,
          attachments,
        },
        auth.token,
      );
      setStatus({ loading: false, success: true, error: null });
      setFormData(INITIAL_CONTACT_FORM);
      setAttachment(null);
      setFileInputKey((key) => key + 1);
    } catch (err) {
      const message =
        err instanceof ApiError && err.code === "unauthorized"
          ? contactFormText.authRequiredError
          : contactFormText.genericError;
      setStatus({ loading: false, success: false, error: message });
    }
  }

  return (
    <section className="flex flex-col gap-5 text-right" dir="rtl">
      <ContactBanner />
      <ContactForm
        formData={formData}
        attachment={attachment}
        fileInputKey={fileInputKey}
        status={status}
        onFieldChange={handleFieldChange}
        onAttachmentChange={handleAttachmentChange}
        onSubmit={handleSubmit}
      />
      <GuidelinesSection />
      <FaqSection />
    </section>
  );
}

export default Contact;
