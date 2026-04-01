import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/registerService";
import { Input } from "@/components/atoms/Input";
import { InputPassword } from "@/components/atoms/InputPassword";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";
import { DateInput } from "@/components/atoms/DateInput";

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

const isValidMexicanPhone = (phone: string): boolean => {
  const mexicanPhoneRegex = /^\+52\s?(55|56)\s?\d{4}\s?\d{4}$/;
  return mexicanPhoneRegex.test(phone.replace(/[\s-]/g, ""));
};

export const RegisterPage = () => {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
    phoneNumber: "",
  });
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  // Timer para reenviar OTP
  const handleTimerStart = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setError("");
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validaciones
      if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
        throw new Error("Please fill in required fields");
      }

      if (!isValidMexicanPhone(formData.phoneNumber)) {
        throw new Error("Invalid Mexican phone format. Use: +52 55 xxxx xxxx or +52 56 xxxx xxxx");
      }

      await registerService.requestOtp(formData.phoneNumber);
      setStep("otp");
      handleTimerStart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!otpCode) {
        throw new Error("Please enter the OTP code");
      }

      if (otpCode.length !== 6) {
        throw new Error("OTP must be 6 digits");
      }

      if (!isValidPassword(formData.password)) {
        throw new Error("Password must be at least 6 characters");
      }

      if (!isValidEmail(formData.email)) {
        throw new Error("Please enter a valid email");
      }

      const response = await registerService.registerUser({
        ...formData,
        otpCode,
      });

      // Registro exitoso, redirigir a login
      navigate("/login", {
        state: {
          message: "Registration successful! Please login with your credentials.",
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setIsLoading(true);

    try {
      await registerService.requestOtp(formData.phoneNumber);
      handleTimerStart();
      setOtpCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="bg-surface text-surface-foreground p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Label variant="title">Futbol Manager</Label>
          <Label variant="text" className="text-muted mt-2">
            {step === "form"
              ? "Crea tu cuenta"
              : "Verifica tu teléfono"}
          </Label>
        </div>

        {step === "form" ? (
          // Formulario de Registro
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <Input
              id="firstName"
              name="firstName"
              type="text"
              label="Nombre"
              placeholder="Juan"
              value={formData.firstName}
              onChange={(value) => handleInputChange("firstName", value)}
              isRequired={true}
              className="w-full"
            />

            <Input
              id="lastName"
              name="lastName"
              type="text"
              label="Apellido"
              placeholder="Pérez"
              value={formData.lastName}
              onChange={(value) => handleInputChange("lastName", value)}
              isRequired={true}
              className="w-full"
            />

            <Input
              id="middleName"
              name="middleName"
              type="text"
              label="Segundo Nombre (Opcional)"
              placeholder="Carlos"
              value={formData.middleName}
              onChange={(value) => handleInputChange("middleName", value)}
              className="w-full"
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Correo Electrónico"
              placeholder="usuario@example.com"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              isRequired={true}
              isInvalid={
                formData.email.length > 0 && !isValidEmail(formData.email)
              }
              errorMessage={
                formData.email.length > 0 && !isValidEmail(formData.email)
                  ? "Por favor ingresa un email válido"
                  : ""
              }
              className="w-full"
            />

            <InputPassword
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              isRequired={true}
              isInvalid={
                formData.password.length > 0 &&
                !isValidPassword(formData.password)
              }
              errorMessage={
                formData.password.length > 0 &&
                !isValidPassword(formData.password)
                  ? "La contraseña debe tener mínimo 6 caracteres"
                  : ""
              }
              className="w-full"
            />

            <DateInput
              id="birthDate"
              name="birthDate"
              label="Fecha de Nacimiento"
              value={formData.birthDate}
              onChange={(value) => handleInputChange("birthDate", value)}
              isRequired={true}
              description="Selecciona tu fecha de nacimiento"
              className="w-full"
            />

            <div>
              <Label>Género</Label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="">Selecciona tu género</option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </select>
            </div>

            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              label="Teléfono Móvil"
              placeholder="+52 55 xxxx xxxx"
              value={formData.phoneNumber}
              onChange={(value) => handleInputChange("phoneNumber", value)}
              isRequired={true}
              isInvalid={
                formData.phoneNumber.length > 0 &&
                !isValidMexicanPhone(formData.phoneNumber)
              }
              errorMessage={
                formData.phoneNumber.length > 0 &&
                !isValidMexicanPhone(formData.phoneNumber)
                  ? "Formato: +52 55 xxxx xxxx o +52 56 xxxx xxxx"
                  : ""
              }
              className="w-full"
            />

            {error && (
              <Label variant="invalid" className="block text-center">
                {error}
              </Label>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth={true}
              isLoading={isLoading}
              loadingText="Enviando código..."
            >
              Continuar
            </Button>

            {/* Link to Login */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-muted text-sm">
                ¿Ya tienes cuenta?{" "}
                <Label
                  variant="link"
                  onClick={() => navigate("/login")}
                >
                  Inicia sesión aquí
                </Label>
              </p>
            </div>
          </form>
        ) : (
          // Verificación OTP
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="bg-accent/10 border border-accent rounded-lg p-4">
              <Label className="text-sm">
                Hemos enviado un código de 6 dígitos por SMS a:{" "}
                <span className="font-semibold">{formData.phoneNumber}</span>
              </Label>
            </div>

            <Input
              id="otp"
              name="otp"
              type="text"
              label="Código OTP"
              placeholder="000000"
              value={otpCode}
              onChange={setOtpCode}
              maxLength={6}
              isRequired={true}
              className="w-full text-center text-2xl tracking-widest"
            />

            {error && (
              <Label variant="invalid" className="block text-center">
                {error}
              </Label>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth={true}
              isLoading={isLoading}
              loadingText="Verificando..."
            >
              Verificar y Registrar
            </Button>

            {/* Resend OTP */}
            <div className="text-center">
              {timer > 0 ? (
                <Label className="text-sm text-muted">
                  Reenviar en {timer}s
                </Label>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  fullWidth={true}
                  onClick={handleResendOtp}
                  isLoading={isLoading}
                >
                  Reenviar Código
                </Button>
              )}
            </div>

            {/* Back button */}
            <Button
              type="button"
              variant="secondary"
              size="lg"
              fullWidth={true}
              onClick={() => {
                setStep("form");
                setOtpCode("");
                setError("");
              }}
            >
              Volver
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};