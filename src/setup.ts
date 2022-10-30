import * as THREE from 'three';

import { AmbientLight, DirectionalLight, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three';

window.THREE = THREE;
require('./OrbitControls');
require('./FlyControls');

type Context = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};

export const setup = (): Context => {
  const { innerWidth: width, innerHeight: height } = window;
  const aspectRatio = width / height;

  const renderer = new WebGLRenderer();

  renderer.setSize(width, height);

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, aspectRatio, 1, 10000);

  const sun = new DirectionalLight(0xffffff, 0.1);
  const ambiant = new AmbientLight(0xffffff, 0.2);
  const point = new PointLight(0xffffff, 0.4);

  scene.add(sun);
  scene.add(ambiant);
  scene.add(point);

  camera.position.x = 180;
  camera.position.y = 150;
  camera.position.z = 180;

  // const controls = new window.THREE.FlyControls(camera, renderer.domElement);

  // controls.dragToLook = true;
  // controls.movementSpeed = 400;
  // controls.rollSpeed = 1;

  const controls = new window.THREE.OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.target.y = 100;
  controls.target.x = 50;

  point.position.set(camera.position.x, 248, camera.position.z);

  let move: 'up' | 'down' | undefined;

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      move = 'up';
    } else if (event.key == 'ArrowDown') {
      move = 'down';
    }
  });

  window.addEventListener('keyup', () => {
    move = undefined;
  });

  requestAnimationFrame(function animate() {
    controls.update(0.01);

    if (move === 'up') {
      camera.translateY(2);
      controls.target.y += 2;
    } else if (move === 'down') {
      camera.translateY(-2);
      controls.target.y -= 2;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  });

  return {
    scene,
    camera,
    renderer,
  };
};
