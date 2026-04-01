import nodemailer from "nodemailer";
import twilio from "twilio";

// Configuración (puedes usar variables de entorno)
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "tu-email@gmail.com";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "tu-password";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@futbolmanager.com";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_PHONE = process.env.TWILIO_PHONE || "";

// Crear transporter de Nodemailer
const emailTransporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

// Cliente de Twilio
const twilioClient = TWILIO_ACCOUNT_SID
  ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  : null;

// Enviar OTP por Email
export const sendOtpByEmail = async (email: string, otpCode: string): Promise<void> => {
  try {
    await emailTransporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "Tu código de verificación - Futbol Manager",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verificación de Email</h2>
          <p>Hola,</p>
          <p>Gracias por registrarte en <strong>Futbol Manager</strong>.</p>
          <p>Tu código de verificación es:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #333; letter-spacing: 5px; margin: 0;">${otpCode}</h1>
          </div>
          <p style="color: #666;">Este código expira en 10 minutos.</p>
          <p style="color: #666;">Si no solicitaste este código, ignora este email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">© 2026 Futbol Manager. Todos los derechos reservados.</p>
        </div>
      `,
      text: `Tu código de verificación es: ${otpCode}. Este código expira en 10 minutos.`,
    });

    console.log(`OTP enviado por email a: ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

// Enviar OTP por SMS
export const sendOtpBySms = async (phoneNumber: string, otpCode: string): Promise<void> => {
  try {
    if (!twilioClient) {
      throw new Error("Twilio no está configurado");
    }

    await twilioClient.messages.create({
      body: `Tu código de verificación de Futbol Manager es: ${otpCode}. Expira en 10 minutos. No compartas este código.`,
      from: TWILIO_PHONE,
      to: phoneNumber,
    });

    console.log(`OTP enviado por SMS a: ${phoneNumber}`);
  } catch (error) {
    console.error("Error sending OTP SMS:", error);
    throw new Error("Failed to send OTP SMS");
  }
};

// Validar formato de teléfono mexicano
export const isValidMexicanPhone = (phoneNumber: string): boolean => {
  // Formato: +52 55 xxxx xxxx o +52 56 xxxx xxxx
  const mexicanPhoneRegex = /^\+52\s?(55|56)\s?\d{4}\s?\d{4}$/;
  return mexicanPhoneRegex.test(phoneNumber.replace(/[\s-]/g, ""));
};