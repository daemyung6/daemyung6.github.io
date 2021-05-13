import {hslToHex} from "./utils.js";

export class Particle {
  constructor(pos, groupRatio, indexRatio, texture) {
    this.sprite = new PIXI.Sprite(texture);
    const minScale = 0.1;
    const maxxScale = 0.9;
    const scale = (maxxScale - minScale) * indexRatio + minScale;
    this.sprite.scale.set(scale);

    const minLight = 10;
    const maxLight = 50;
    const light = (maxLight - minLight) * indexRatio + minLight;

    const minHue = 330;
    const maxHue = 280;
    const hue = (maxHue - minHue) * groupRatio + minHue;

    // this.sprite.tint = hslToHex(hue, 84, light);

    let r = pos.r
    let b = pos.b
    let g = pos.g

    r = r + light >= 225 ? 225 : r + light;
    r = Number(r).toString(16);
    r = r.length == 1 ? '0' + r : r;
  
    g = g + light >= 225 ? 225 : g + light;
    g = Number(g).toString(16)
    g = g.length == 1 ? '0' + g : g;


    b = b + light >= 225 ? 225 : b + light;
    b = Number(b).toString(16)
    b = b.length == 1 ? '0' + b : b;


    this.sprite.tint = '0x' + r + g + b;



    this.x = pos.x;
    this.y = pos.y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.vx = 0;
    this.vy = 0;

  }

  animate(index, total) {
    if(index < total) {
      this.x += this.vx;
      this.y += this.vy;
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}