import * as THREE from 'three';
import "./style.css";
import vs from './shaders/vertex.glsl?raw';
import fs from './shaders/fragment.glsl?raw';

const main = () => {

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.5, 0.5, 0.5);
 
  // Cámara Ortográfica
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  // Geometría
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array([
    -0.4, -0.4,  0, 
     0, 0.87,  0, 
    0.4,  -0.4,  0,
  ]);

  const colors = new Float32Array([
    1, 0, 0, 
    0, 1, 0, 
    0, 0, 1, 

  ]);

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  // Programa de Shaders
  const material = new THREE.RawShaderMaterial({
    vertexShader: vs,
    fragmentShader: fs,
    uniforms: {
      projectionMatrix: { value: camera.projectionMatrix },
      viewMatrix: { value: camera.matrixWorldInverse },
      modelMatrix: { value: new THREE.Matrix4() },
    },
    glslVersion: THREE.GLSL3, 
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Render Loop
  const animate = (time) => {
    time *= 0.001;
    
    // Actualizamos el uniform

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  // Resize handler
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate(0);
};

main();