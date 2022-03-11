
import {
  DataTexture,
  LuminanceFormat,
  RedFormat,
  RGFormat,
  RGBFormat,
  RGBAFormat,
  UnsignedByteType
} from "three";

/**
 * Generates noise.
 *
 * @private
 * @param {Number} size - The linear texture size.
 * @param {Number} format - The texture format.
 * @param {Number} type - The texture type.
 * @return {TypedArray} The noise data.
 */

function getNoise(size, format, type) {

  const channels = new Map([
    [LuminanceFormat, 1],
    [RedFormat, 1],
    [RGFormat, 2],
    [RGBFormat, 3],
    [RGBAFormat, 4]
  ]);

  let data;

  if (!channels.has(format)) {

    console.error("Invalid noise texture format");

  }

  if (type === UnsignedByteType) {

    data = new Uint8Array(size * channels.get(format));

    for (let i = 0, l = data.length; i < l; ++i) {

      data[i] = Math.random() * 255;

    }

  } else {

    data = new Float32Array(size * channels.get(format));

    for (let i = 0, l = data.length; i < l; ++i) {

      data[i] = Math.random();

    }

  }

  return data;

}

/**
 * A simple noise texture.
 */

export class NoiseTexture extends DataTexture {

  constructor(
    width,
    height,
    format = LuminanceFormat,
    type = UnsignedByteType
  ) {

    super(getNoise(width * height, format, type), width, height, format, type);

  }

}
