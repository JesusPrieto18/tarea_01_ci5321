#version 300 es

// Definimos la precisión de los números flotantes (obligatorio en fragment shader)
precision highp float;

//Recibimos el color mezclado desde el Vertex Shader
// Tiene que llamarse IGUAL que la salida del vertex (v_color)
in vec3 v_color;

// Variable de salida (el color final del píxel)
out vec4 outColor;

void main() {
    outColor = vec4(v_color, 1.0);
}