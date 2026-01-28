# tarea_01_ci5321

Nombre: Jesus Prieto

Este repositorio contiene tres implementaciones diferentes de un mismo ejercicio usando distintas librerías y enfoques para gráficos por computadora:

- **three/**: Utiliza Three.js
- **twgl/**: Utiliza TWGL.js
- **webgl/**: Implementación directa con WebGL2

Cada carpeta es un proyecto independiente basado en Vite y TypeScript.

## Requisitos previos

- Tener [Node.js](https://nodejs.org/) instalado (recomendado v18+)
- Tener [npm](https://www.npmjs.com/) instalado (se incluye con Node.js)

## Instrucciones generales

Para cada carpeta (`three`, `twgl`, `webgl`):

1. Abre una terminal y navega a la carpeta deseada. Por ejemplo:
	```sh
	cd three
	```
2. Instala las dependencias:
	```sh
	npm install
	```
3. Inicia el servidor de desarrollo:
	```sh
	npm run dev
	```
4. Abre el navegador en la URL que aparece en la terminal (usualmente http://localhost:5173 o similar).

---

## Descripción de cada carpeta

### three/
Implementación usando [Three.js](https://threejs.org/). Renderiza un triángulo coloreado usando shaders personalizados. El punto de entrada es `src/main.ts` y la página principal es `index.html`.

### twgl/
Implementación usando [TWGL.js](https://twgljs.org/), una librería para facilitar el uso de WebGL. También renderiza un triángulo coloreado con shaders personalizados. El punto de entrada es `src/main.ts` y la página principal es `index.html`.

### webgl/
Implementación "pura" de WebGL2 sin frameworks adicionales. Todo el manejo de shaders, buffers y renderizado se hace manualmente. El punto de entrada es `src/main.ts` y la página principal es `index.html`.

---

Puedes modificar los shaders en `src/shaders/vertex.glsl` y `src/shaders/fragment.glsl` en cada carpeta para experimentar con los efectos visuales.
