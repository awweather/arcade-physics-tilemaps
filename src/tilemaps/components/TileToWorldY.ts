// /**
//  * @author       Richard Davey <rich@photonstorm.com>
//  * @copyright    2013-2023 Photon Storm Ltd.
//  * @license      {@link https://opensource.org/licenses/MIT|MIT License}
//  */

import { LayerData } from '../index.js'

// /**
//  * Converts from tile Y coordinates (tile units) to world Y coordinates (pixels), factoring in the
//  * layer's position, scale and scroll.
//  *
//  * @function Phaser.Tilemaps.Components.TileToWorldY
//  * @since 3.0.0
//  *
//  * @param {number} tileY - The y coordinate, in tiles, not pixels.
//  * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera to use when calculating the tile index from the world values.
//  * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
//  *
//  * @return {number} The Y location in world coordinates.
//  */
// var TileToWorldY = function (tileY, camera, layer) {
//   var tileHeight = layer.baseTileHeight
//   var tilemapLayer = layer.tilemapLayer
//   var layerWorldY = 0

//   if (tilemapLayer) {
//     if (!camera) {
//       camera = tilemapLayer.scene.cameras.main
//     }

//     layerWorldY = tilemapLayer.y + camera.scrollY * (1 - tilemapLayer.scrollFactorY)

//     tileHeight *= tilemapLayer.scaleY
//   }

//   return layerWorldY + tileY * tileHeight
// }

// export default TileToWorldY

/**
 * Converts from tile Y coordinates (tile units) to world Y coordinates (pixels), factoring in the
 * layer's position and scale.
 *
 * @param tileY - The y coordinate, in tiles, not pixels.
 * @param layer - The Tilemap Layer to act upon.
 *
 * @return The world Y coordinate in pixels.
 */
const TileToWorldY = (tileY: number, layer: LayerData): number => {
  let tileHeight: number = layer.baseTileHeight
  const tilemapLayer = layer.tilemapLayer
  let layerWorldY: number = 0

  if (tilemapLayer) {
    // Use layer's position and scale
    layerWorldY = tilemapLayer.y
    tileHeight *= tilemapLayer.scaleY
  }

  return layerWorldY + tileY * tileHeight
}

export default TileToWorldY
