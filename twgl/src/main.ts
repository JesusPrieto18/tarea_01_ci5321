import * as twgl from 'twgl';
import './style.css'
// Importamos los shaders como texto plano (gracias a Vite)
// Nota: Si no usas Vite, tendrías que usar fetch() o strings literales.
import vs from './shaders/vertex.glsl?raw';
import fs from './shaders/fragment.glsl?raw';

const main = () => {
  // 1. Obtener el contexto WebGL2
  const canvas = document.getElementById("c");
  const gl = canvas.getContext("webgl2");

  if (!gl) {
    console.error("WebGL2 no está soportado en este navegador.");
    return;
  }

  // 2. Crear el programa (compila shaders y linkea el programa)
  // TWGL hace todo el trabajo sucio de crear shaders, adjuntar y linkear
  const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

  // 3. Crear los datos (Buffers)
  // createBufferInfoFromArrays crea los buffers y los configura automáticamente.
  // Aquí definimos el triangulo
  const arrays = {
    position: {
      numComponents: 3,
      data: [
        -0.4, -0.2,  0, // Triángulo 1
        -0.0, 0.87,  0,
        0.4,  -0.2,  0,
      ],
    },
    // NUEVO: Agregamos el array de colores
    // TWGL emparejará automáticamente este array con 'in vec3 color' en el shader
    color: {
      numComponents: 3, // Indicamos que son 3 valores por vértice (R, G, B)
      data: [
        // Colores para el Primer triángulo (RGB)
        1, 0, 0,  // Rojo (para -1,-1)
        0, 1, 0,  // Verde (para 1,-1)
        0, 0, 1,  // Azul (para -1, 1)
      ],
    },
  };
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  // Función de renderizado (Loop)
  const render = (time) => {
    time *= 0.001; // Convertir a segundos

    // 4. Ajustar el tamaño del canvas automáticamente si la ventana cambia
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // 5. Configurar el programa y los buffers
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);


    // 6. Dibujar
    twgl.drawBufferInfo(gl, bufferInfo);

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

main();