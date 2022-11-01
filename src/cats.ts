import { Group, Scene } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const loader = new GLTFLoader();

export const mano = (scene: Scene) => {
  loader.load(
    'mano.glb',
    function (gltf) {
      const mesh: Group = gltf.scene;

      mesh.position.set(90, 110, 10);
      mesh.scale.multiplyScalar(0.7);
      mesh.rotateY(Math.PI * 2 - Math.PI / 2);
      mesh.rotateX(Math.PI * 2 - Math.PI / 6);

      scene.add(mesh);
    },
    undefined,
    function (error: any) {
      console.error(error);
    },
  );
};

export const raspout = (scene: Scene) => {
  loader.load(
    'raspout.glb',
    function (gltf) {
      const mesh: Group = gltf.scene;

      mesh.position.set(15, 200, 30);
      mesh.scale.multiplyScalar(0.08);
      mesh.rotateX(Math.PI * 2 - Math.PI / 2);

      scene.add(mesh);
    },
    undefined,
    function (error: any) {
      console.error(error);
    },
  );
};
