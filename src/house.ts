import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  TextureLoader,
} from 'three';

export const house = (scene: Scene) => {
  const groundBumpMap = new TextureLoader().load('ground.png');
  groundBumpMap.wrapS = RepeatWrapping;
  groundBumpMap.wrapT = RepeatWrapping;
  groundBumpMap.repeat.set(3, 3);

  const groundMaterial = new MeshStandardMaterial({
    color: 0x697787,
    side: DoubleSide,
    bumpMap: groundBumpMap,
    bumpScale: -1,
  });

  const groundGeom = new PlaneGeometry(400, 400);
  const groundMesh = new Mesh(groundGeom, groundMaterial);

  const wallBumpMap = new TextureLoader().load('wall.jpg');
  wallBumpMap.wrapS = RepeatWrapping;
  wallBumpMap.wrapT = RepeatWrapping;
  wallBumpMap.repeat.set(4, 4);

  const wallMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    side: DoubleSide,
    bumpMap: wallBumpMap,
    bumpScale: 0.2,
  });

  groundMesh.position.x = 400 / 2;
  groundMesh.position.z = 400 / 2;
  groundMesh.rotation.x = Math.PI / 2;

  const wallGeom1 = new PlaneGeometry(139, 248);
  const wallMesh1 = new Mesh(wallGeom1, wallMaterial);

  wallMesh1.position.x = 139 / 2;
  wallMesh1.position.y = 248 / 2;

  const wallGeom2 = new PlaneGeometry(87, 248);
  const wallMesh2 = new Mesh(wallGeom2, wallMaterial);

  wallMesh2.position.z = 87 / 2;
  wallMesh2.position.y = 248 / 2;
  wallMesh2.rotation.y = Math.PI / 2;

  const expedit = new Mesh(new BoxGeometry(80, 150, 40), new MeshStandardMaterial({ color: 0x333333 }));

  expedit.position.set(80 / 2 + 139, 150 / 2, 40 / 2);

  scene.add(groundMesh);
  scene.add(wallMesh1);
  scene.add(wallMesh2);
  scene.add(expedit);
};
