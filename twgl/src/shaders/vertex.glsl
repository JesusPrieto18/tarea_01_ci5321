#version 300 es

// Atributos (Datos que vienen de los buffers en JS)
in vec4 position;
in vec3 color; 

// Salida hacia el fragment shader
out vec3 vColor;

void main() {
  // Pasamos el color recibido al fragment shader
  vColor = color;
  gl_Position = position;
}