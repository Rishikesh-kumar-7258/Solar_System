// Rotating objects
const objects = [];

// Creating a renderer
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ canvas });

// create a camera
const camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

// creating a scene
const scene = new THREE.Scene();

// creating a light
const light = new THREE.PointLight(0xffffff, 2);

// creating solar system
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

// Creating sun
const sphereGeometry = new THREE.SphereGeometry(1, 6, 6);
const sun = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffff00 })
);
sun.scale.set(5, 5, 5);
solarSystem.add(sun);
objects.push(sun);

const animate = (time) => {
  time *= 0.001;
  requestAnimationFrame(animate);

  // rotating the objects
  objects.forEach((object) => {
    object.rotation.y = time;
  });

  // rendering the scene
  renderer.render(scene, camera);
};

requestAnimationFrame(animate);
