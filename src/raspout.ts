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

export const raspout = (scene: Scene) => {
  setupBody(scene);

  setupHead(scene);

  setupTail(scene);
};

const setupBody = (scene: Scene) => {
  const bottomGeometry = new SphereGeometry(10, 32, 16);
  const bottomMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const bottom = new Mesh(bottomGeometry, bottomMaterial);

  bottom.position.set(30 / 2, 200 + 10, 139 - 90 - 10);

  scene.add(bottom);

  const bodyGeometry = new CylinderGeometry(5, 7, 12, 32);
  const bodyMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const body = new Mesh(bodyGeometry, bodyMaterial);

  body.position.set(30 / 2, 200 + 10 * 2, 139 - 90 - 10);

  scene.add(body);
};

const setupHead = (scene: Scene) => {
  const headGeometry = new SphereGeometry(7, 32, 16);
  const headMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const head = new Mesh(headGeometry, headMaterial);

  head.position.set(30 / 2, 200 + (12 + 7 * 2), 139 - 90 - 10);

  scene.add(head);

  const leftEar = ear(10, 200 + (12 + 7 * 2 + 7), 139 - 90 - 10);
  leftEar.rotateZ(Math.PI / 6);

  scene.add(leftEar);

  const rightEar = ear(20, 200 + (12 + 7 * 2 + 7), 139 - 90 - 10);
  rightEar.rotateZ(2 * Math.PI - Math.PI / 6);

  scene.add(rightEar);

  const { eyeBall: leftEyeBall, eyePupil: leftEyePupil } = eye(12, 200 + (12 + 7 * 2 + 2), 139 - 90 - 4);

  scene.add(leftEyeBall);
  scene.add(leftEyePupil);

  const { eyeBall: rightEyeBall, eyePupil: rightEyePupil } = eye(18, 200 + (12 + 7 * 2 + 2), 139 - 90 - 4);

  scene.add(rightEyeBall);
  scene.add(rightEyePupil);
};

const setupTail = (scene: Scene) => {
  const tailPath = new CustomSinCurve(7);
  const tailGeometry = new TubeGeometry(tailPath, 100, 2, 8, false);
  const tailMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const tail = new Mesh(tailGeometry, tailMaterial);

  tail.position.set(27, 200 + 12, 139 - 90 - 15);
  tail.rotateZ(Math.PI / 4);
  tail.rotateY(Math.PI);

  scene.add(tail);

  const endTailGeometry = new CapsuleGeometry(2, 3, 4, 8);
  const endTailMaterial = new MeshStandardMaterial({ color: 0x222222, bumpMap: furBumpMap, bumpScale: -1 });
  const endTail = new Mesh(endTailGeometry, endTailMaterial);

  endTail.position.set(27 + 8.7, 200 + 12 + 7, 139 - 90 - 15);
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
  const eyeBallMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
  const eyeBall = new Mesh(eyeBallGeometry, eyeBallMaterial);

  eyeBall.position.set(x, y, z);

  const eyePupilGeometry = new CylinderGeometry(1, 1, 0.3, 32);
  const eyePupilMaterial = new MeshStandardMaterial({ color: 0x222222 });
  const eyePupil = new Mesh(eyePupilGeometry, eyePupilMaterial);

  eyePupil.position.set(x, y, z);
  eyePupil.rotateZ(Math.PI / 2);

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
