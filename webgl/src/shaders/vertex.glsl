#version 300 es

// Recibe datos desde el buffer (CPU)
in vec4 a_position;
// Recibe el color desde el CPU (R, G, B)
in vec3 a_color;

//Variable de salida para enviarla al Fragment Shader
out vec3 v_color;

void main() {
    // Asignación: Le dice a la GPU dónde pintar este punto en la pantalla
    gl_Position = a_position;
    //Pasamos el color tal cual al siguiente paso
    v_color = a_color;
}