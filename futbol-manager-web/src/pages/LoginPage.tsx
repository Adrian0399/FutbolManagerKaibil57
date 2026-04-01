import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/atoms/Input";
import { InputPassword } from "@/components/atoms/InputPassword";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isEmailInvalid = email.length > 0 && !isValidEmail(email);
  const isPasswordInvalid = password.length > 0 && !isValidPassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
            Inicia sesión en tu cuenta
          </Label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <Input
            id="email"
            name="email"
            type="email"
            label="Correo Electrónico"
            placeholder="usuario@example.com"
            value={email}
            onChange={setEmail}
            isRequired={true}
            isInvalid={isEmailInvalid}
            errorMessage={
              isEmailInvalid ? "Por favor ingresa un email válido" : ""
            }
            description="Usaremos esto para tu cuenta"
            className="w-full"
          />

          {/* Password Input */}
          <InputPassword
            name="password"
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            isRequired={true}
            isInvalid={isPasswordInvalid}
            errorMessage={
              isPasswordInvalid
                ? "La contraseña debe tener mínimo 6 caracteres"
                : ""
            }
            className="w-full"
          />

          {/* Error Message */}
          {error && (
            <Label variant="invalid" className="block text-center">
              {error}
            </Label>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth={true}
            isLoading={isLoading}
            loadingText="Iniciando sesión..."
          >
            Iniciar sesión
          </Button>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-muted text-sm">
              ¿No tienes cuenta?{" "}
              <Label variant="link" onClick={() => navigate("/register")}>
                Regístrate aquí
              </Label>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
