import config from "@/config";
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  url: "https://api.eu.mailgun.net/",
  key: process.env.MAILGUN_API_KEY || "dummy",
});

if (!process.env.MAILGUN_API_KEY && process.env.NODE_ENV === "development") {
  console.group("⚠️ MAILGUN_API_KEY missing from .env");
  console.error("It's not mandatory but it's required to send emails.");
  console.error("If you don't need it, remove the code from /libs/mailgun.js");
  console.groupEnd();
}

/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 * @returns {Promise} A Promise that resolves when the email is sent.
 */
export const sendEmail = async ({ to, subject, html }) => {
  const data = {
    from: config.mailgun.fromNoReply,
    to: [to],
    subject,
    html,
  };

  await mg.messages.create(
    (config.mailgun.subdomain ? `${config.mailgun.subdomain}.` : "") +
      config.domainName,
    data
  );
};
