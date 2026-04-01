import React from "react";
import { Avatar } from "@heroui/react";
import { Person } from "@gravity-ui/icons";

export interface UserAvatarProps {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  isButton?: boolean;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  firstName = "",
  lastName = "",
  imageUrl,
  size = "md",
  showName = false,
  isButton = false,
  className = "",
}) => {
  // Generar iniciales del nombre
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  // Estilos del contenedor button (solo en desktop)
  const buttonContainerStyles = isButton
    ? `
      hidden md:flex
      px-3 py-2 rounded-lg 
      border border-border bg-surface-secondary 
      hover:border-accent/50 hover:bg-surface-secondary/80 
      transition duration-200 cursor-pointer select-none active:scale-95
    `
    : "";

  // Avatar solo en mobile (sin border)
  const mobileAvatarStyles = isButton
    ? `
      md:hidden
      cursor-pointer 
      transition duration-200 
      hover:opacity-80 active:scale-95
    `
    : "";

  return (
    <>
      {/* Desktop: Avatar con nombre y border (Button style) */}
      {isButton && (
        <div className={`flex items-center gap-2 ${buttonContainerStyles} ${className}`}>
          <Avatar size={size} color="accent">
            {imageUrl ? (
              <>
                <Avatar.Image alt={`${firstName} ${lastName}`} src={imageUrl} />
                <Avatar.Fallback>{initials || <Person className="size-4" />}</Avatar.Fallback>
              </>
            ) : (
              <Avatar.Fallback className="bg-accent/20 text-accent font-semibold">
                {initials || <Person className="size-4" />}
              </Avatar.Fallback>
            )}
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {firstName} {lastName}
            </span>
            <span className="text-xs text-muted">Player</span>
          </div>
        </div>
      )}

      {/* Mobile: Solo Avatar (sin border) */}
      {isButton && (
        <div className={`flex items-center gap-2 ${mobileAvatarStyles} ${className}`}>
          <Avatar size="sm" color="accent">
            {imageUrl ? (
              <>
                <Avatar.Image alt={`${firstName} ${lastName}`} src={imageUrl} />
                <Avatar.Fallback>{initials || <Person className="size-4" />}</Avatar.Fallback>
              </>
            ) : (
              <Avatar.Fallback className="bg-accent/20 text-accent font-semibold">
                {initials || <Person className="size-4" />}
              </Avatar.Fallback>
            )}
          </Avatar>
        </div>
      )}

      {/* Modo no-button: Renderizado normal */}
      {!isButton && (
        <div className={`flex items-center gap-2 ${className}`}>
          <Avatar size={size} color="accent">
            {imageUrl ? (
              <>
                <Avatar.Image alt={`${firstName} ${lastName}`} src={imageUrl} />
                <Avatar.Fallback>{initials || <Person className="size-4" />}</Avatar.Fallback>
              </>
            ) : (
              <Avatar.Fallback className="bg-accent/20 text-accent font-semibold">
                {initials || <Person className="size-4" />}
              </Avatar.Fallback>
            )}
          </Avatar>

          {showName && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {firstName} {lastName}
              </span>
              <span className="text-xs text-muted">Player</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};