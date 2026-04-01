"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@iconify/react";

// Simular iconos disponibles en Hero UI
const SearchIcon = () => <Icon icon="mdi:search" />;
const PlusIcon = () => <Icon icon="mdi:plus" />;
const EnvelopeIcon = () => <Icon icon="mdi:email" />;
const TrashIcon = () => <Icon icon="mdi:trash" />;
const EllipsisIcon = () => <Icon icon="mdi:dots-horizontal" />;
const GearIcon = () => <Icon icon="mdi:cog" />;
const PaperclipIcon = () => <Icon icon="mdi:paperclip" />;

export const Buttons = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingPress = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-10 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Componentes de Button</h1>

      {/* CASO 1: Button Básico */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">1. Button Básico</h2>
        <div className="flex gap-3">
          <Button onClick={() => console.log("Button pressed")}>
            Click me
          </Button>
        </div>
      </section>

      {/* CASO 2: Variantes */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">2. Variantes</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger-soft">Danger Soft</Button>
        </div>
      </section>

      {/* CASO 3: Con Iconos */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">3. Buttons con Iconos</h2>
        <div className="flex flex-wrap gap-3">
          <Button icon={<SearchIcon />} variant="primary">
            Search
          </Button>
          <Button icon={<PlusIcon />} variant="secondary">
            Add Member
          </Button>
          <Button icon={<EnvelopeIcon />} variant="tertiary">
            Email
          </Button>
          <Button icon={<TrashIcon />} variant="danger">
            Delete
          </Button>
        </div>
      </section>

      {/* CASO 4: Solo Icono */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">4. Buttons Solo Icono</h2>
        <div className="flex gap-3">
          <Button
            isIconOnly
            variant="tertiary"
            ariaLabel="Más opciones"
          >
            <EllipsisIcon />
          </Button>
          <Button
            isIconOnly
            variant="secondary"
            ariaLabel="Configuración"
          >
            <GearIcon />
          </Button>
          <Button
            isIconOnly
            variant="danger"
            ariaLabel="Eliminar"
          >
            <TrashIcon />
          </Button>
        </div>
      </section>

      {/* CASO 5: Estados de Carga */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">5. Estado de Carga</h2>
        <div className="flex gap-3">
          <Button isLoading loadingText="Uploading...">
            Upload File
          </Button>
          <Button
            isLoading={isLoading}
            onPress={handleLoadingPress}
            icon={!isLoading && <PaperclipIcon />}
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </section>

      {/* CASO 6: Tamaños */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">6. Tamaños</h2>
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* CASO 7: Ancho Completo */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">7. Ancho Completo</h2>
        <div className="w-full max-w-sm space-y-3">
          <Button fullWidth variant="primary">
            Primary Button
          </Button>
          <Button fullWidth variant="secondary" icon={<PlusIcon />}>
            With Icon
          </Button>
          <Button fullWidth variant="tertiary">
            Another Button
          </Button>
        </div>
      </section>

      {/* CASO 8: Estado Deshabilitado */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">8. Estados Deshabilitados</h2>
        <div className="flex flex-wrap gap-3">
          <Button isDisabled variant="primary">
            Primary
          </Button>
          <Button isDisabled variant="secondary">
            Secondary
          </Button>
          <Button isDisabled variant="tertiary">
            Tertiary
          </Button>
          <Button isDisabled variant="outline">
            Outline
          </Button>
          <Button isDisabled variant="ghost">
            Ghost
          </Button>
          <Button isDisabled variant="danger">
            Danger
          </Button>
        </div>
      </section>

      {/* CASO 9: Buttons Sociales */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">9. Buttons Sociales</h2>
        <div className="w-full max-w-sm space-y-3">
          <Button
            fullWidth
            variant="tertiary"
            icon={<Icon icon="devicon:google" />}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="tertiary"
            icon={<Icon icon="mdi:github" />}
          >
            Sign in with GitHub
          </Button>
          <Button
            fullWidth
            variant="tertiary"
            icon={<Icon icon="ion:logo-apple" />}
          >
            Sign in with Apple
          </Button>
        </div>
      </section>

      {/* CASO 10: Combinaciones */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">10. Combinaciones Comunes</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Grupo de acciones:</h3>
            <div className="flex gap-2">
              <Button variant="primary">Save</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Botón destructivo:</h3>
            <div className="flex gap-2">
              <Button variant="danger" size="lg">
                Delete Account
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Botón con icono + texto + tamaño:</h3>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="lg"
                icon={<PlusIcon />}
                fullWidth
              >
                Create New Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CASO 11: Ejemplos de Formulario */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">11. En un Formulario</h2>
        <form className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex gap-2">
            <Button variant="primary" type="submit" fullWidth>
              Submit
            </Button>
            <Button variant="outline" type="reset" fullWidth>
              Reset
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};