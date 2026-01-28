#version 300 es
precision mediump float;

// Varying (Entrada que viene del vertex shader)
in vec3 vColor; // <--- Ya no calculamos el color aquí, lo recibimos

out vec4 fragColor;

void main() {
  // Usamos el color interpolado. Añadimos 1.0 para el canal Alpha.
  fragColor = vec4(vColor, 1.0);
}