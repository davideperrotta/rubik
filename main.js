import './style.css'
import * as THREE from 'three';

// Crea una scena
const scene = new THREE.Scene();

// Crea una telecamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Crea un renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crea una geometria (sfera)
const geometry = new THREE.BoxGeometry();

// Crea un materiale
//const material = new THREE.MeshBasicMaterial({ color: 0x007FFF });
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Materiale Standard per supportare le ombre

// Crea un mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Funzione per creare un cubie
function createCubie(x, y, z) {
  const geometry = new THREE.BoxGeometry();
  //const normalMap = new THREE.TextureLoader().load('javascript.svg');
  //const material = new THREE.MeshStandardMaterial({ color: color, normalMap });

  // Creazione della canvas e disegno del testo
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 256;

  context.font   
  = "30px Arial";
  context.fillStyle = "pink";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(`${x},${y},${z}`, 128, 128);

  const normalMap = new THREE.CanvasTexture(canvas);

  const materials = [
    new THREE.MeshStandardMaterial({ color: 'white', normalMap }),
    new THREE.MeshStandardMaterial({ color: 'yellow', normalMap }),
    new THREE.MeshStandardMaterial({ color: 'blue', normalMap }),
    new THREE.MeshStandardMaterial({ color: 'green', normalMap }),
    new THREE.MeshStandardMaterial({ color: 'red', normalMap }),
    new THREE.MeshStandardMaterial({ color: 'orange', normalMap }),
];
  const cubie = new THREE.Mesh(geometry, materials);
  cubie.position.set(x, y, z);
  return cubie;
}

// Creazione della struttura del cubo di Rubik
const rubikCube = new THREE.Object3D();

// Creazione dei cubies e aggiunta alla struttura
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
          const cubie = createCubie(x, y, z); // Assegna un colore iniziale
          rubikCube.add(cubie);
      }
  }
}

scene.add(rubikCube);

// Aggiungi una luce
//const light = new THREE.AmbientLight(0xffffff);
const light = new THREE.HemisphereLight(0xffffff, 2);
//light.position.set(1, 1, 1);
scene.add(light);

// Funzione di animazione
function animate() {
  requestAnimationFrame(animate);
  rubikCube.rotation.y += 0.01; // Rotazione continua
  rubikCube.rotation.x += 0.01; // Rotazione continua
  rubikCube.rotation.z += 0.02; // Rotazione continua
  renderer.render(scene, camera);
}

animate();