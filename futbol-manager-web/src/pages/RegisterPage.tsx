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

export const RegisterPage = () => {
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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setError("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validaciones
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.birthDate ||
        !formData.gender
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (!isValidEmail(formData.email)) {
        throw new Error("Please enter a valid email");
      }

      if (!isValidPassword(formData.password)) {
        throw new Error("Password must be at least 6 characters");
      }

      await registerService.registerUser(formData);

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

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="bg-surface text-surface-foreground p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Label variant="title">Futbol Manager</Label>
          <Label variant="text" className="text-muted mt-2">
            Crea tu cuenta
          </Label>
        </div>

        {/* Formulario de Registro */}
        <form onSubmit={handleRegister} className="space-y-4">
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
              formData.password.length > 0 && !isValidPassword(formData.password)
            }
            errorMessage={
              formData.password.length > 0 && !isValidPassword(formData.password)
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
            label="Teléfono (Opcional)"
            placeholder="+52 55 1234 5678"
            value={formData.phoneNumber}
            onChange={(value) => handleInputChange("phoneNumber", value)}
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
            loadingText="Registrando..."
          >
            Registrarse
          </Button>

          {/* Link to Login */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-muted text-sm">
              ¿Ya tienes cuenta?{" "}
              <Label variant="link" onClick={() => navigate("/login")}>
                Inicia sesión aquí
              </Label>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};