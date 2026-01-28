import * as twgl from 'twgl';
import './style.css'
import vs from './shaders/vertex.glsl?raw';
import fs from './shaders/fragment.glsl?raw';

const main = () => {
  // Obtener el contexto WebGL2
  const canvas = document.getElementById("c");
  const gl = canvas.getContext("webgl2");

  if (!gl) {
    console.error("WebGL2 no está soportado en este navegador.");
    return;
  }

  // Crear el programa (compila shaders y linkea el programa)
  const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

  // Crear los datos (Buffers)
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
    // TWGL emparejará automáticamente este array con 'in vec3 color' en el shader
    color: {
      numComponents: 3, // Indicamos que son 3 valores por vértice (R, G, B)
      data: [
        1, 0, 0,  // Rojo 
        0, 1, 0,  // Verde
        0, 0, 1,  // Azul 
      ],
    },
  };
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  // Función de renderizado (Loop)
  const render = (time) => {
    time *= 0.001; // Convertir a segundos

    // Ajustar el tamaño del canvas automáticamente si la ventana cambia
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    // Agregar color gris de fondo
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Configurar el programa y los buffers
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);


    // Dibujar
    twgl.drawBufferInfo(gl, bufferInfo);

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

main();