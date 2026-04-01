import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { userService } from "../services/userService";
import { User } from "../types/user";
import { UiElementsPage } from "./Ui-Elements/UiElementsPage";

export const HomePage = () => {
  const { user, accessToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!accessToken) return;

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await userService.getAllUsers(accessToken);
        setUsers(response.users);
        setError("");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al obtener usuarios"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-surface text-surface-foreground rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">
              ¡Bienvenido, {user?.firstName}!
            </h2>
            <p className="text-surface-foreground/80">
              Aquí puedes ver todos los usuarios del sistema.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Users Table Section */}
          <div className="bg-surface text-surface-foreground rounded-lg shadow-lg overflow-hidden">
            <div className="bg-accent text-accent-foreground p-6">
              <h3 className="text-2xl font-bold">Listado de Usuarios</h3>
              <p className="text-accent-foreground/90 mt-1">
                Total de usuarios: {users.length}
              </p>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                  <span className="ml-3 text-surface-foreground">
                    Cargando usuarios...
                  </span>
                </div>
              </div>
            ) : users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-secondary border-b-2 border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-surface-foreground">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-surface-foreground">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-surface-foreground">
                        Apellido
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-surface-foreground">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-surface-foreground">
                        Teléfono
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-surface-foreground">
                        Género
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-surface-foreground">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-surface-foreground">
                        Fecha Nacimiento
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userItem, idx) => (
                      <tr
                        key={userItem.id}
                        className={`border-b border-border ${
                          idx % 2 === 0 ? "bg-surface" : "bg-surface-secondary"
                        } hover:bg-accent/10 transition`}
                      >
                        <td className="px-6 py-4 text-sm text-surface-foreground">
                          {userItem.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-foreground">
                          {userItem.firstName}
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-foreground">
                          {userItem.lastName}
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-foreground">
                          {userItem.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-foreground">
                          {userItem.phoneNumber || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-foreground">
                          {userItem.gender || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-foreground">
                          <span className="bg-accent-soft text-accent-soft-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            {userItem.role?.name || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-foreground">
                          {userItem.birthDate
                            ? new Date(userItem.birthDate).toLocaleDateString(
                                "es-ES"
                              )
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-surface-foreground/70">
                No hay usuarios disponibles.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="ui-elements">
        <UiElementsPage />
      </div>
    </div>
  );
};