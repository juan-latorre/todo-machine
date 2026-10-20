import React from "react";
import { ReactComponent as CheckSVG } from "./check.svg";
import { ReactComponent as DeleteSVG } from "./delete.svg";
import "./TodoIcon.css";

// Diccionario que mapea cada "type" a su SVG. Recibe el color para pintar el relleno.
const iconTypes = {
  check: (color) => <CheckSVG className="Icon-svg" fill={color} />,
  delete: (color) => <DeleteSVG className="Icon-svg" fill={color} />,
};

// Componente genérico de icono: elige el SVG por "type" y lo pinta del "color" dado.
// onClick se dispara al hacer clic sobre el contenedor.
function TodoIcon({ type, color, onClick }) {
  return (
    <span
      className={`Icon-container Icon-container-${type}`}
      onClick={onClick}
    >
      {iconTypes[type](color)}
    </span>
  );
}

export { TodoIcon };
