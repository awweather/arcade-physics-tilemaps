import LayerData from '../mapdata/LayerData.js'

/**
 * Converts from tile X coordinates (tile units) to world X coordinates (pixels), factoring in the
 * layer's position and scale.
 *
 * @param tileX - The x coordinate, in tiles, not pixels.
 * @param layer - The Tilemap Layer to act upon.
 *
 * @return The world X coordinate in pixels.
 */
const TileToWorldX = (tileX: number, layer: LayerData): number => {
  let tileWidth: number = layer.baseTileWidth
  const tilemapLayer = layer.tilemapLayer
  let layerWorldX: number = 0

  if (tilemapLayer) {
    // Use layer's position and scale
    layerWorldX = tilemapLayer.x
    tileWidth *= tilemapLayer.scaleX
  }

  return layerWorldX + tileX * tileWidth
}

export default TileToWorldX
