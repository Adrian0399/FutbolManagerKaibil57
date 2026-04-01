import Otp from "../models/otpModel.js";

// Generar código OTP aleatorio (6 dígitos)
export const generateOtpCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Crear y guardar OTP
export const createOtp = async (email?: string, phoneNumber?: string): Promise<string> => {
  if (!email && !phoneNumber) {
    throw new Error("Email or phone number is required");
  }

  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expira en 10 minutos

  // Eliminar OTPs anteriores no verificados
  if (email) {
    await Otp.destroy({
      where: { email, isVerified: false },
    });
  }
  if (phoneNumber) {
    await Otp.destroy({
      where: { phoneNumber, isVerified: false },
    });
  }

  // Crear nuevo OTP - filtrar propiedades undefined
  const otpData: any = {
    code,
    attempts: 0,
    expiresAt,
    isVerified: false,
  };

  if (email) otpData.email = email;
  if (phoneNumber) otpData.phoneNumber = phoneNumber;

  await Otp.create(otpData);

  return code;
};

// Verificar OTP
export const verifyOtp = async (
  code: string,
  email?: string,
  phoneNumber?: string
): Promise<boolean> => {
  if (!email && !phoneNumber) {
    throw new Error("Email or phone number is required");
  }

  const whereClause = email ? { email } : { phoneNumber };

  const otp = await Otp.findOne({
    where: whereClause,
    order: [["createdAt", "DESC"]],
  });

  if (!otp) {
    throw new Error("OTP not found");
  }

  // Verificar si expiró
  if (new Date() > otp.expiresAt) {
    throw new Error("OTP expired");
  }

  // Verificar intentos (máximo 3)
  if (otp.attempts >= 3) {
    await otp.destroy();
    throw new Error("Maximum attempts reached");
  }

  // Incrementar intentos
  otp.attempts += 1;
  await otp.save();

  // Verificar código
  if (otp.code !== code) {
    throw new Error("Invalid OTP code");
  }

  // Marcar como verificado
  otp.isVerified = true;
  await otp.save();

  return true;
};