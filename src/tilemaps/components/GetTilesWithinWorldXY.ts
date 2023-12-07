// import { Vector2 } from '../../math/Vector2'
// import Tile from '../Tile.js'
// import LayerData from '../mapdata/LayerData.js'
// import GetTilesWithin from './GetTilesWithin.js'

// const pointStart = new Vector2()
// const pointEnd = new Vector2()

// /**
//  * Gets the tiles in the given rectangular area (in world coordinates) of the layer.
//  *
//  * @function Phaser.Tilemaps.Components.GetTilesWithinWorldXY
//  * @since 3.0.0
//  *
//  * @param {number} worldX - The world x coordinate for the top-left of the area.
//  * @param {number} worldY - The world y coordinate for the top-left of the area.
//  * @param {number} width - The width of the area.
//  * @param {number} height - The height of the area.
//  * @param {FilteringOptions} filteringOptions - Optional filters to apply when getting the tiles.
//  * @param {Camera} camera - The Camera to use when factoring in which tiles to return.
//  * @param {LayerData} layer - The Tilemap Layer to act upon.
//  *
//  * @return {Phaser.Tilemaps.Tile[]} Array of Tile objects.
//  */
// export default function GetTilesWithinWorldXY(
//   worldX: number,
//   worldY: number,
//   width: number,
//   height: number,
//   filteringOptions: any,
//   camera: any,
//   layer: LayerData
// ): Tile[] {
//   const worldToTileXY = layer.tilemapLayer.tilemap._convert.WorldToTileXY

//   // Top left corner of the rect, rounded down to include partial tiles
//   worldToTileXY(worldX, worldY, true, pointStart, camera, layer)

//   const xStart = pointStart.x
//   const yStart = pointStart.y

//   // Bottom right corner of the rect, rounded up to include partial tiles
//   worldToTileXY(worldX + width, worldY + height, false, pointEnd, camera, layer)

//   const xEnd = Math.ceil(pointEnd.x)
//   const yEnd = Math.ceil(pointEnd.y)

//   return GetTilesWithin(xStart, yStart, xEnd - xStart, yEnd - yStart, filteringOptions, layer)
// }

import { Vector2 } from '../../math/Vector2'
import Tile from '../Tile.js'
import LayerData from '../mapdata/LayerData.js'
import GetTilesWithin from './GetTilesWithin.js'

const pointStart = new Vector2()
const pointEnd = new Vector2()

/**
 * Gets the tiles in the given rectangular area (in world coordinates) of the layer.
 *
 * @param worldX - The world x coordinate for the top-left of the area.
 * @param worldY - The world y coordinate for the top-left of the area.
 * @param width - The width of the area.
 * @param height - The height of the area.
 * @param filteringOptions - Optional filters to apply when getting the tiles.
 * @param layer - The Tilemap Layer to act upon.
 *
 * @return Array of Tile objects.
 */
export default function GetTilesWithinWorldXY(
  worldX: number,
  worldY: number,
  width: number,
  height: number,
  layer: LayerData,
  filteringOptions: any
): Tile[] {
  const worldToTileXY = layer.tilemapLayer.tilemap._convert.WorldToTileXY

  // Convert world coordinates to tile coordinates
  worldToTileXY(worldX, worldY, true, pointStart, layer)
  const xStart = pointStart.x
  const yStart = pointStart.y

  worldToTileXY(worldX + width, worldY + height, false, pointEnd, layer)
  const xEnd = Math.ceil(pointEnd.x)
  const yEnd = Math.ceil(pointEnd.y)

  return GetTilesWithin(xStart, yStart, xEnd - xStart, yEnd - yStart, filteringOptions, layer)
}
