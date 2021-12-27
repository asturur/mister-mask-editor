import { fabric } from 'fabric';

fabric.ActiveSelection.prototype.controls = {};
fabric.ActiveSelection.prototype.hasBorders = false;
fabric.ActiveSelection.prototype.lockMovementX = true;
fabric.ActiveSelection.prototype.lockMovementY = true;
fabric.ActiveSelection.prototype.perPixelTargetFind = true;

const MaskItem = fabric.util.createClass(fabric.Object, {
  type: 'maskItem',
  size: 48,
  strokeWidth: 0,
  // from 0 to 7
  bitValue: 4,
  // bright value from 0 to 15,
  onIntensity: 2,
  // dark value from 0 to 15,
  offIntensity: 6,
  // we need a truthy value but we are not going to use this.
  fill: 'not-used',
  lockMovementX: true,
  lockMovementY: true,
  borderColor: 'black',
  controls: {},
  // activeOn: 'up',

  cacheProperties: fabric.Object.prototype.cacheProperties.concat('bitValue', 'size', 'onIntensity', 'offIntensity'),

  initialize: function(options) {
    fabric.Object.prototype.initialize.call(this, options);
    this.width = this.size;
    this.height = this.size;
  },

  _render(ctx) {
    const isR = this.bitValue & 4;
    const isG = this.bitValue & 2;
    const isB = this.bitValue & 1;

    ctx.fillStyle = `rgb(${isR ? 255 : 0},${isG ? 255 : 0},${isB ? 255 : 0})`;
    ctx.fillRect(-this.size/2, -this.size/2, this.size - 7, this.size);

    this.drawBar(ctx, 'red', isR, 6);
    this.drawBar(ctx, 'green', isG, 4);
    this.drawBar(ctx, 'blue', isB, 2);
  },

  drawBar(ctx, color, isOn, position) {
    const intensityScale = this.size / 2 / 16;
    const start = isOn ? - intensityScale * (this.onIntensity + 1) : 0;
    const size = isOn ? intensityScale * (this.onIntensity + 1) : intensityScale * (this.offIntensity + 1)
    ctx.fillStyle = color;
    ctx.fillRect(
      (this.size / 2) - position,
      start,
      2,
      size
    );
  },

  toObject() {
    return fabric.Object.prototype.toObject.call(this, ['size', 'bitValue', 'onIntensity', 'offIntensity']);
  }
});

MaskItem.fromObject = function (_object, callback) {

};


fabric.MaskItem = MaskItem;

export default MaskItem;
