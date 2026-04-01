import { Input } from "@/components/atoms/Input";
import { useState } from "react";

export const Inputs = () => {
  // Estados para validación
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  // Validaciones
  const isEmailInvalid = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isUsernameInvalid = username.length > 0 && username.length < 3;
  const isPasswordInvalid = password.length > 0 && password.length < 8;
  const isAgeInvalid = age.length > 0 && (parseInt(age) < 18 || parseInt(age) > 120);
  const isBioInvalid = bio.length > 0 && bio.length < 10;

  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">Ejemplos de Input Reutilizable</h1>

      {/* CASO 1: Input Simple de Texto */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">1. Input Simple (Texto)</h2>
        <Input
          name="fullName"
          type="text"
          label="Nombre Completo"
          placeholder="Juan Pérez"
          description="Ingresa tu nombre completo"
        />
      </div>

      {/* CASO 2: Input de Email con Validación */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">2. Email con Validación</h2>
        <Input
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
        />
      </div>

      {/* CASO 3: Input de Contraseña Requerido */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">3. Contraseña Requerida</h2>
        <Input
          name="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          isRequired={true}
          isInvalid={isPasswordInvalid}
          errorMessage={
            isPasswordInvalid ? "La contraseña debe tener mínimo 8 caracteres" : ""
          }
          description="Mínimo 8 caracteres"
          minLength={8}
        />
      </div>

      {/* CASO 4: Input de Número con Rango */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">4. Número con Rango (18-120)</h2>
        <Input
          name="age"
          type="number"
          label="Edad"
          placeholder="18"
          value={age}
          onChange={setAge}
          isRequired={true}
          isInvalid={isAgeInvalid}
          errorMessage={
            isAgeInvalid ? "Debes tener entre 18 y 120 años" : ""
          }
          min={18}
          max={120}
          description="Debes ser mayor de 18 años"
        />
      </div>

      {/* CASO 5: Username con Límite de Caracteres */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">5. Username con Validación y Límite</h2>
        <Input
          name="username"
          type="text"
          label="Nombre de Usuario"
          placeholder="jane_doe"
          value={username}
          onChange={setUsername}
          isRequired={true}
          isInvalid={isUsernameInvalid}
          errorMessage={
            isUsernameInvalid ? "El usuario debe tener mínimo 3 caracteres" : ""
          }
          description="Elige un nombre de usuario único"
          maxLength={20}
        />
      </div>

      {/* CASO 6: URL */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">6. URL</h2>
        <Input
          name="website"
          type="url"
          label="Sitio Web"
          placeholder="https://example.com"
          value={website}
          onChange={setWebsite}
          description="Ingresa la URL de tu sitio web"
        />
      </div>

      {/* CASO 7: Teléfono */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">7. Teléfono</h2>
        <Input
          name="phone"
          type="tel"
          label="Teléfono"
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={setPhone}
          isRequired={true}
          description="Formato: +1 (555) 000-0000"
        />
      </div>

      {/* CASO 8: Textarea con Límite de Caracteres y Validación */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          8. Bio con Límite y Validación (10-200 caracteres)
        </h2>
        <Input
          name="bio"
          type="text"
          label="Biografía"
          placeholder="Cuéntanos sobre ti..."
          value={bio}
          onChange={setBio}
          isRequired={true}
          isInvalid={isBioInvalid}
          errorMessage={
            isBioInvalid ? "La biografía debe tener mínimo 10 caracteres" : ""
          }
          minLength={10}
          maxLength={200}
          description="Mínimo 10 caracteres para una buena biografía"
          className="w-full"
        />
      </div>

      {/* Resumen de Datos */}
      <div className="bg-blue-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Datos Ingresados (Estado)</h2>
        <pre className="bg-white p-4 rounded overflow-auto text-sm">
          {JSON.stringify(
            {
              fullName: "No capturado",
              email,
              password,
              age,
              username,
              website,
              phone,
              bio,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}