// El sufijo ?raw le dice a Vite: "Tráeme esto como texto plano, no como código JS"
import './style.css';
import vertexShaderSource from './shaders/vertex.glsl?raw';
import fragmentShaderSource from './shaders/fragment.glsl?raw';

// INICIALIZACIÓN DEL CONTEXTO
const canvas = document.getElementById("glCanvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("Lo siento, tu navegador no soporta WebGL 2.");
}

// FUNCIONES DE AYUDA (Compiladores)
// Estas funciones toman el texto de los shaders y lo convierten en un programa binario para la GPU
function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    // Verificar errores de compilación
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Error en Shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    // Verificar errores de enlace
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Error en Programa:", gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}

// PREPARAR EL PROGRAMA
const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

if (!vs || !fs) throw new Error("Error creando shaders");

const program = createProgram(gl, vs, fs);

if (!program) throw new Error("Error creando programa");


// DEFINIR LOS DATOS DEL CUADRADO
// Coordenadas: X, Y
const positions = new Float32Array([
    -0.3, -0.2,
    -0.0, 0.87, 
     0.3, -0.2, 
]);

// Definimos un color RGB por cada vértice
const colors = new Float32Array([
    1.0, 0.0, 0.0, // Rojo   
    0.0, 1.0, 0.0, // Verde  
    0.0, 0.0, 1.0, // Azul   
]);

// SUBIR DATOS A LA GPU (Buffers)

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

// Creamos un buffer separado para los colores
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// CONFIGURAR EL VAO (Vertex Array Object)
// El VAO es como una "carpeta" que recuerda cómo leer los buffers.
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

// Activamos el buffer de posiciones
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); 

// Buscar la variable "a_position" en el shader compilado
const positionLocation = gl.getAttribLocation(program, "a_position");

// Activar el atributo
gl.enableVertexAttribArray(positionLocation);

// Explicar cómo leer los datos: (location, size, type, normalize, stride, offset)
// size=2 porque mandamos X, Y
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); // Activamos el buffer de colores
const colorLoc = gl.getAttribLocation(program, "a_color"); // Buscamos la variable en el shader
gl.enableVertexAttribArray(colorLoc);
// (size=3 porque enviamos R,G,B)
gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);

// FUNCIÓN DE DIBUJADO (Render Loop)
function draw() {
    // Ajustar el tamaño del canvas al tamaño de la ventana
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    console.log(`Tamaño del canvas: ${displayWidth} x ${displayHeight}`);
    
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        console.log(`tamaño cambiado a: ${displayWidth} x ${displayHeight}`);
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl!.viewport(0, 0, gl!.canvas.width, gl!.canvas.height);
    }

    // Limpiar la pantalla (Fondo gris)
    gl!.clearColor(0.5, 0.5, 0.5, 1.0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    
    // Usar nuestro programa
    gl!.useProgram(program);

    // Usar nuestra configuración de vértices (VAO)
    gl!.bindVertexArray(vao);

    // DIBUJAR
    // TRIANGLE conecta los puntos automáticamente para formar superficie
    // count = 3 vértices
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
}

// Llamamos a dibujar
draw();

// Opcional: Si cambias el tamaño de ventana, redibujar
window.addEventListener('resize', draw);