import EmailResetPassword from "@/components/email-templates/email-reset-password";
import EmailVerification from "@/components/email-templates/email-verification";
import React from "react";

export default function EmailPage() {
  return (
    <div>
      <EmailResetPassword />
      <EmailVerification />
    </div>
  );
}
