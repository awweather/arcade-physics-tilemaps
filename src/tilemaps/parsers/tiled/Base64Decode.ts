/**
 * @author Richard Davey <rich@photonstorm.com>
 * @copyright 2013-2023 Photon Storm Ltd.
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Decode base-64 encoded data, for example as exported by Tiled.
 *
 * @function Phaser.Tilemaps.Parsers.Tiled.Base64Decode
 * @since 3.0.0
 *
 * @param {string} data - Base-64 encoded data to decode.
 *
 * @return {number[]} Array containing the decoded bytes.
 */
const Base64Decode = (data: string): number[] => {
  const binaryString = window.atob(data)
  const len = binaryString.length
  const bytes: number[] = new Array(len / 4)

  // Interpret binaryString as an array of bytes representing little-endian encoded uint32 values.
  for (let i = 0; i < len; i += 4) {
    bytes[i / 4] =
      (binaryString.charCodeAt(i) |
        (binaryString.charCodeAt(i + 1) << 8) |
        (binaryString.charCodeAt(i + 2) << 16) |
        (binaryString.charCodeAt(i + 3) << 24)) >>>
      0
  }

  return bytes
}

export default Base64Decode
