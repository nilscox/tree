import { raspout } from './raspout';
import { house } from './house';
import { setup } from './setup';
import { tree } from './tree';
import { mano } from './mano';

const ctx = setup();
house(ctx.scene);
tree(ctx.scene);
raspout(ctx.scene);
mano(ctx.scene);

document.body.style.margin = '0';
document.body.appendChild(ctx.renderer.domElement);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
