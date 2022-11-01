import {
  CapsuleGeometry,
  ConeGeometry,
  Curve,
  CylinderGeometry,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  TextureLoader,
  TubeGeometry,
  Vector3,
} from 'three';

const furBumpMap = new TextureLoader().load('fur.jpg');
furBumpMap.wrapS = RepeatWrapping;
furBumpMap.wrapT = RepeatWrapping;
furBumpMap.repeat.set(4, 4);

export const mano = (scene: Scene) => {
  setupBody(scene);

  setupHead(scene);

  // setupTail(scene);
};

const setupBody = (scene: Scene) => {
  const bottomGeometry = new SphereGeometry(10, 32, 16);
  const bottomMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const bottom = new Mesh(bottomGeometry, bottomMaterial);

  bottom.position.set(130, 150 + 10, 30 - 10);

  scene.add(bottom);

  const bodyGeometry = new CylinderGeometry(6, 7, 12, 32);
  const bodyMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const body = new Mesh(bodyGeometry, bodyMaterial);

  body.position.set(120, 150 + 10, 30 - 10);
  body.rotateZ(Math.PI / 2);

  scene.add(body);

  const bodyWhiteGeometry = new CylinderGeometry(7.5, 7.5, 2, 32);
  const bodyWhiteMaterial = new MeshStandardMaterial({ color: 0xeeeeee, bumpMap: furBumpMap, bumpScale: -1 });
  const bodyWhite = new Mesh(bodyWhiteGeometry, bodyWhiteMaterial);

  bodyWhite.position.set(114, 150 + 9, 30 - 10);
  bodyWhite.rotateZ(Math.PI / 2);

  scene.add(bodyWhite);
};

const setupHead = (scene: Scene) => {
  const headGeometry = new SphereGeometry(7, 32, 16);
  const headMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const head = new Mesh(headGeometry, headMaterial);

  head.position.set(112, 150 + 15, 30 - 10);

  scene.add(head);

  const leftEar = ear(111, 150 + 22, 30 - 15);
  leftEar.rotateX(Math.PI * 2 - Math.PI / 6);

  scene.add(leftEar);

  const rightEar = ear(111, 150 + 22, 30 - 5);
  rightEar.rotateX(Math.PI / 6);

  scene.add(rightEar);

  const { eyeBall: leftEyeBall, eyePupil: leftEyePupil } = eye(106, 150 + 17, 30 - 13);

  scene.add(leftEyeBall);
  scene.add(leftEyePupil);

  const { eyeBall: rightEyeBall, eyePupil: rightEyePupil } = eye(106, 150 + 17, 30 - 7);

  scene.add(rightEyeBall);
  scene.add(rightEyePupil);
};

const setupTail = (scene: Scene) => {
  const tailPath = new CustomSinCurve(7);
  const tailGeometry = new TubeGeometry(tailPath, 130, 2, 8, false);
  const tailMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const tail = new Mesh(tailGeometry, tailMaterial);

  tail.position.set(32, 150 + 12, 30 - 15);
  tail.rotateZ(Math.PI / 4);
  tail.rotateY(Math.PI);

  scene.add(tail);

  const endTailGeometry = new CapsuleGeometry(2, 3, 4, 8);
  const endTailMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const endTail = new Mesh(endTailGeometry, endTailMaterial);

  endTail.position.set(32 + 8.7, 150 + 12 + 7, 30 - 15);
  endTail.rotateZ(Math.PI / 2.5);

  scene.add(endTail);
};

const ear = (x: number, y: number, z: number) => {
  const earGeometry = new ConeGeometry(2, 5, 32);
  const earMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const ear = new Mesh(earGeometry, earMaterial);

  ear.position.set(x, y, z);

  return ear;
};

const eye = (x: number, y: number, z: number) => {
  const eyeBallGeometry = new SphereGeometry(1, 32, 16);
  const eyeBallMaterial = new MeshStandardMaterial({ color: 0xccff00 });
  const eyeBall = new Mesh(eyeBallGeometry, eyeBallMaterial);

  eyeBall.position.set(x, y, z);

  const eyePupilGeometry = new CylinderGeometry(1, 1, 0.3, 32);
  const eyePupilMaterial = new MeshStandardMaterial({ color: 0x222222 });
  const eyePupil = new Mesh(eyePupilGeometry, eyePupilMaterial);

  eyePupil.position.set(x, y, z);
  eyePupil.rotateX(Math.PI / 2);

  return { eyeBall, eyePupil };
};

class CustomSinCurve extends Curve<Vector3> {
  private scale: number;

  constructor(scale = 1) {
    super();

    this.scale = scale;
  }

  getPoint(t: number, optionalTarget = new Vector3()) {
    const tx = t * 3 - 1.5;
    const ty = Math.sin(2 * Math.PI * t);
    const tz = 0;

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}
