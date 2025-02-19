export function distance(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function pointCircle(px, py, cx, cy, r) {
  if(distance(px, py, cx, cy) <= r) {
    return true;
  }
  else {
    return false;
  }
}
export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let red = 0;
  let green = 0;
  let blue = 0;

  if(0 <= h && h < 60) {
    red = c;
    green = x;
    blue = 0;
  }
  else if(60 <= h && h < 120) {
    red = x;
    green = c;
    blue = 0;
  }
  else if(120 <= h && h < 180) {
    red = 0;
    green = c;
    blue = x;
  }
  else if(180 <= h && h < 240) {
    red = 0;
    green = x;
    blue = c;
  }
  else if(240 <= h && h < 300) {
    red = x;
    green = 0;
    blue = c;
  }
  else if(300 <= h && h < 360) {
    red = c;
    green = 0;
    blue = x;
  }

  red = red + m;
  green = green + m;
  blue = blue + m;

  return ((red * 225) << 16) + ((green * 225) << 8) + ((blue * 225) | 0)
}