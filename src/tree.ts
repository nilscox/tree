import { BoxGeometry, Mesh, MeshStandardMaterial, Scene } from 'three';

export const tree = (scene: Scene) => {
  shelf(scene, {
    width: 75,
    length: 40,
    height: 70,
    x: 75 / 2 + 64,
    y: 40 / 2,
  });

  shelf(scene, {
    width: 40,
    length: 87,
    height: 110,
    x: 40 / 2,
    y: 87 / 2,
  });

  shelf(scene, {
    width: 60,
    length: 40,
    height: 150,
    x: 139 - 60 / 2,
    y: 40 / 2,
  });

  shelf(scene, {
    width: 30,
    length: 50,
    height: 200,
    x: 30 / 2,
    y: 50 / 2,
  });

  const bridge = shelf(scene, {
    width: 70,
    length: 20,
    height: 92,
    x: 70,
    y: 20 / 2,
  });

  bridge.rotateZ(-Math.PI / 6);

  const clim = shelf(scene, {
    width: 82,
    length: 26,
    thickness: 26,
    height: 210 + 26 / 2,
    x: 70 + 82 / 2,
    y: 26 / 2,
  });

  clim.material.color.set(0xffffff);
};

type Shelf = {
  width: number;
  length: number;
  height: number;
  thickness?: number;
  x: number;
  y: number;
};

const shelf = (scene: Scene, { width, length, height, thickness = 2, x, y }: Shelf) => {
  const geometry = new BoxGeometry(width, thickness, length);
  const material = new MeshStandardMaterial({ color: 0x333333 });
  const mesh = new Mesh(geometry, material);

  mesh.position.set(x, height, y);

  scene.add(mesh);

  return mesh;
};
