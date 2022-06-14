// Rotating objects
const objects = [];

// Creating a renderer
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ canvas });

// create a camera
const camera = new THREE.PerspectiveCamera(
  75,
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
const light = new THREE.PointLight(0xffffff, 3);
scene.add(light);

// creating solar system
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

// Creating sun
const sphereGeometry = new THREE.SphereGeometry(1, 18, 18);
const sun = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
);
sun.scale.set(5, 5, 5);
solarSystem.add(sun);
objects.push(sun);

// creating earth
const earthOrbit = new THREE.Object3D();
earthOrbit.position.set(20, 0, 0);
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earth = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 })
);
earthOrbit.add(earth);
objects.push(earth);

// creating moon
const moonOrbit = new THREE.Object3D();
moonOrbit.position.set(2, 0, 0);
earthOrbit.add(moonOrbit);
const moon = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshPhongMaterial({ color: 0x222222, emissive: 0x888888 })
);
moon.scale.set(0.5, 0.5, 0.5);
moonOrbit.add(moon);
objects.push(moon);

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

const animate = (time) => {
  time *= 0.001;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  // rotating the objects
  objects.forEach((object) => {
    object.rotation.y = time;
  });

  // rendering the scene
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
