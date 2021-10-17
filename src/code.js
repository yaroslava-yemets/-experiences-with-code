import * as GLM from './../node_modules/gl-matrix/gl-matrix'
console.log(GLM);

Math.TAU = Math.PI * 2;

Math.RAD = Math.PI / 180;

Math.DEG = 180 / Math.PI;

Math.PHI = 0.5 + 0.5 * Math.sqrt(5);

Math.random = (function(x) {
  return function() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return 1 - (x >>> 0) / 0xFFFFFFFF;
  };
})(1);

window.addEventListener('load', function() {
  var _, buffer, canvas, colors, context, data, j, k, l, model, mvp, palette, points, projection, render, v, view, x, y, z, zero, θ, ρ, φ;
  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');
  document.body.appendChild(canvas);
  buffer = GLM.mat4.create();
  model = GLM.mat4.create();
  view = GLM.mat4.create();
  projection = GLM.mat4.create();
  mvp = GLM.mat4.create();
  points = [];
  colors = [];
  palette = [[1.00, 0.50, 0.25, 0.75], [0.25, 0.50, 1.00, 0.75]].map(GLM.vec4.clone);
  for (_ = j = 0; j < 25000; _ = ++j) {
    ρ = 4 / 5;
    θ = Math.acos(Math.random() * 2 - 1);
    φ = Math.random() * Math.PI * 2;
    x = ρ * Math.sin(θ) * Math.cos(φ);
    y = ρ * Math.sin(θ) * Math.sin(φ);
    z = ρ * Math.cos(θ);
    points.push(v = GLM.vec4.fromValues(x, y, z, 1));
    colors.push(palette[0]);
  }
  for (_ = k = 0; k < 25000; _ = ++k) {
    x = (1 - Math.random() ** 5) * ((Math.random() * 2 << 1) - 1);
    y = (1 - Math.random() ** 5) * ((Math.random() * 2 << 1) - 1);
    z = (1 - Math.random() ** 5) * ((Math.random() * 2 << 1) - 1);
    points.push(v = GLM.vec4.fromValues(x, y, z, 1));
    colors.push(palette[1]);
  }
  for (_ = l = 0; l < 50000; _ = ++l) {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    z = Math.random() * 2 - 1;
    points.push(v = GLM.vec4.fromValues(x, y, z, 1));
    colors.push(palette[ρ < GLM.vec3.len(v) ? 1 : 0]);
  }
  data = null;
  zero = null;
  return (render = function() {
    var H, T, W, a, b, g, i, len, m, n, point, r, ref, w;
    requestAnimationFrame(render);
    T = 1e-3 * Date.now();
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    if (W !== canvas.width || H !== canvas.height) {
      canvas.width = W;
      canvas.height = H;
      data = context.createImageData(W, H);
      zero = context.createImageData(W, H);
      for (i = m = 3, ref = zero.data.length; m < ref; i = m += 4) {
        zero.data[i] = 0xFF;
      }
      data.data.set(zero.data);
    }
    GLM.mat4.identity(model);
    GLM.mat4.rotateX(model, model, T / 5);
    GLM.mat4.rotateY(model, model, T / 6);
    GLM.mat4.rotateZ(model, model, T / 7);
    GLM.mat4.lookAt(view, [0, 0, 3], [0, 0, 0], [0, 1, 0]);
    GLM.mat4.perspective(projection, 30 * Math.RAD, W / H, 1e-3, 1e3);
    [model, view, projection].reduce(function(a, b) {
      return GLM.mat4.mul(mvp, b, a);
    });
    for (i = n = 0, len = points.length; n < len; i = ++n) {
      point = points[i];
      GLM.vec4.transformMat4(buffer, point, mvp);
      GLM.vec3.scale(buffer, buffer, 1 / buffer[3]);
      [x, y, z, w] = buffer;
      if ((-1 < z && z < 1) && (-1 < y && y < 1) && (-1 < x && x < 1)) {
        [r, g, b, a] = colors[i];
        x = (1 + x) * 0.5 * W | 0;
        y = (1 - y) * 0.5 * H | 0;
        i = x + y * W << 2;
        a = a * H / w;
        data.data[i++] += r * a;
        data.data[i++] += g * a;
        data.data[i++] += b * a;
      }
    }
    context.putImageData(data, 0, 0);
    return data.data.set(zero.data);
  })();
});

