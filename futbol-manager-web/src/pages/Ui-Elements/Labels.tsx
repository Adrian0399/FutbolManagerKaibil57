import { Label } from "@/components/atoms/Label";

export const Labels = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Label Components</h1>
          <p className="text-gray-600 mt-2">
            Diferentes variantes y casos de uso
          </p>
        </div>

        {/* Título */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label variant="title">Título Principal</Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Para títulos principales en la página
          </p>
        </section>

        {/* Subtítulo */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label variant="subtitle">Subtítulo Secundario</Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Para subtítulos y encabezados secundarios
          </p>
        </section>

        {/* Texto Regular */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label variant="text">Texto Regular</Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Para etiquetas estándar
          </p>
        </section>

        {/* Texto Informativo (Cursiva) */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label variant="info">
            Este es un texto informativo en cursiva que proporciona contexto
            adicional
          </Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Para mensajes informativos o ayudas
          </p>
        </section>

        {/* Link */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label variant="link" onClick={() => console.log("Link clicked")}>
            Haz clic aquí para más información
          </Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Para enlaces de navegación
          </p>
        </section>

        {/* Con Required Indicator */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label isRequired variant="text">
            Campo Requerido
          </Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Para indicar campos obligatorios
          </p>
        </section>

        {/* Disabled State */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label isDisabled variant="text">
            Etiqueta Deshabilitada
          </Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Para etiquetas de campos deshabilitados
          </p>
        </section>

        {/* Invalid State */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label isInvalid variant="text">
            Etiqueta con Error
          </Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Para etiquetas de campos con errores
          </p>
        </section>

        {/* Required + Invalid */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label isRequired isInvalid variant="text">
            Campo Requerido con Error
          </Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Combinación de requerido e inválido
          </p>
        </section>

        {/* Custom ClassName */}
        <section className="bg-white p-6 rounded-lg shadow">
          <Label variant="text" className="text-purple-600 text-lg">
            Etiqueta con Estilos Personalizados
          </Label>
          <p className="text-gray-600 text-sm mt-4">
            Uso: Con clases personalizadas para estilos adicionales
          </p>
        </section>
      </div>
    </div>
  );
};
