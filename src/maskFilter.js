import { fabric } from 'fabric';

/**
 * misterFPGA v2 mask filter class
 * @class fabric.Image.filters.maskFilter
 * @memberOf fabric.Image.filters
 * @extends fabric.Image.filters.BaseFilter
 * @see {@link fabric.Image.filters.maskFilter#initialize} for constructor definition
 * @example
 * var filter = new fabric.Image.filters.Pixelate({
 *   maskWidth: 8,
 *   maskHeight: 8,
 *   mask: []
 * });
 * object.filters.push(filter);
 * object.applyFilters();
 */
export const maskFilter = fabric.util.createClass(fabric.Image.filters.BaseFilter, /** @lends fabric.Image.filters.Pixelate.prototype */ {

  /**
   * Filter type
   * @param {String} type
   * @default
   */
  type: 'MaskFilter',

  maskWidth: 8,

  maskHeight: 8,

  mainParameter: 'maskWidth',

  initialize: function(options) {
    this.callSuper('initialize', options);
    const { maskBit, maskOnIntensity, maskOffIntensity, maskWidth, maskHeight } = options;
    this.setMaskTexture(this.createImageData({ maskWidth, maskHeight, maskBit, maskOnIntensity, maskOffIntensity }));
  },

  /**
   * Fragment source for the Pixelate program
   */
  fragmentSource: 'precision highp float;\n' +
    'uniform sampler2D uTexture;\n' +
    'uniform sampler2D uImage;\n' +
    'uniform float uStepW;\n' +
    'uniform float uStepH;\n' +
    'uniform float uMaskWidth;\n' +
    'uniform float uMaskHeight;\n' +
    'varying vec2 vTexCoord;\n' +
    'void main() {\n' +
      'float posX = vTexCoord.x / uStepW;\n' +
      'float posY = vTexCoord.y / uStepH;\n' +
      'float maskPositionX = mod(posX, uMaskWidth) / uMaskWidth;\n' + // mod(posX, uMaskWidth) / uMaskWidth;\n' +
      'float maskPositionY = mod(posY, uMaskHeight) / uMaskHeight;\n' + // mod(posY, uMaskHeight) / uMaskHeight;\n' +
      'vec4 maskInfo = texture2D(uImage, vec2(maskPositionX, maskPositionY));\n' +
      'float maskBit = maskInfo.r * 255.0;\n' +
      'float onIntensity = 1.0 + maskInfo.g * 255.0 / 256.0;\n' +
      'float offIntensity = maskInfo.b * 255.0 / 256.0;\n' +
      'bvec3 channels = bvec3(false);\n' +
      'if (maskBit >= 4.0) {\n' +
      '  channels.r = true;\n' +
      '  maskBit = maskBit - 4.0;\n' +
      '}\n' +
      'if (maskBit >= 2.0) {\n' +
      '  channels.g = true;\n' +
      '  maskBit = maskBit - 2.0;\n' +
      '}\n' +
      'if (maskBit >= 1.0) {\n' +
      '  channels.b = true;\n' +
      '}\n' +
      'vec4 color = texture2D(uTexture, vTexCoord);\n' +
      'color.r = color.r * (channels.r ? onIntensity : offIntensity);\n' +
      'color.g = color.g * (channels.g ? onIntensity : offIntensity);\n' +
      'color.b = color.b * (channels.b ? onIntensity : offIntensity);\n' +
      'gl_FragColor = color;\n' +
    '}',

  /**
   * Apply the Pixelate operation to a Uint8ClampedArray representing the pixels of an image.
   *
   * @param {Object} options
   * @param {ImageData} options.imageData The Uint8ClampedArray to be filtered.
   */
  applyTo2d: function(options) {
    var imageData = options.imageData,
        data = imageData.data,
        iLen = imageData.height,
        jLen = imageData.width,
        index, i, j, r, g, b, a,
        _i, _j, _iLen, _jLen;

    for (i = 0; i < iLen; i += this.blocksize) {
      for (j = 0; j < jLen; j += this.blocksize) {

        index = (i * 4) * jLen + (j * 4);

        r = data[index];
        g = data[index + 1];
        b = data[index + 2];
        a = data[index + 3];

        _iLen = Math.min(i + this.blocksize, iLen);
        _jLen = Math.min(j + this.blocksize, jLen);
        for (_i = i; _i < _iLen; _i++) {
          for (_j = j; _j < _jLen; _j++) {
            index = (_i * 4) * jLen + (_j * 4);
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = a;
          }
        }
      }
    }
  },

  createImageData: function({ maskWidth, maskHeight, maskBit, maskOnIntensity, maskOffIntensity }) {
    const imageData = new ImageData(maskWidth, maskHeight);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const realIndex = i / 4;
      data[i] = maskBit[realIndex];
      data[i + 1] = maskOnIntensity[realIndex] * 16;
      data[i + 2] = maskOffIntensity[realIndex] * 16;
      data[i + 3] = 255;
    }
    return imageData;
  },

  setMaskTexture: function(imageData) {
    const backend = fabric.filterBackend;
    if (this.maskTexture) {
      // remove previous texture
      backend.gl.deleteTexture(this.maskTexture);
    }
    this.maskTexture = backend.createTexture(backend.gl, imageData.width, imageData.height, imageData);
  },

  applyToWebGL: function(options) {
    // load texture to blend.
    const gl = options.context;
    this.bindAdditionalTexture(gl, this.maskTexture, gl.TEXTURE1);
    this.callSuper('applyToWebGL', options);
    this.unbindAdditionalTexture(gl, gl.TEXTURE1);
  },

  /**
   * Indicate when the filter is not gonna apply changes to the image
   **/
  isNeutralState: function() {
    return false;
  },

  /**
   * Return WebGL uniform locations for this filter's shader.
   *
   * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
   * @param {WebGLShaderProgram} program This filter's compiled shader program.
   */
  getUniformLocations: function(gl, program) {
    return {
      uMaskWidth: gl.getUniformLocation(program, 'uMaskWidth'),
      uMaskHeight: gl.getUniformLocation(program, 'uMaskHeight'),
      uImage: gl.getUniformLocation(program, 'uImage'),
    };
  },

  /**
   * Send data from this filter to its shader program's uniforms.
   *
   * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
   * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
   */
  sendUniformData: function(gl, uniformLocations) {
    gl.uniform1i(uniformLocations.uImage, 1); // texture unit 1.
    gl.uniform1f(uniformLocations.uMaskWidth, this.maskWidth);
    gl.uniform1f(uniformLocations.uMaskHeight, this.maskHeight);
  },
});

fabric.Image.filters.MaskFilter = maskFilter;

/**
 * Returns filter instance from an object representation
 * @static
 * @param {Object} object Object to create an instance from
 * @param {Function} [callback] to be invoked after filter creation
 * @return {fabric.Image.filters.Pixelate} Instance of fabric.Image.filters.Pixelate
 */
fabric.Image.filters.MaskFilter.fromObject = fabric.Image.filters.BaseFilter.fromObject;
