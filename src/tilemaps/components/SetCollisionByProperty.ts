import HasValue from '../../utils/object/HasValue'
import LayerData from '../mapdata/LayerData.js'
import CalculateFacesWithin from './CalculateFacesWithin'
import SetTileCollision from './SetTileCollision'

/**
 * Sets collision on the tiles within a layer by checking tile properties. If a tile has a property
 * that matches the given properties object, its collision flag will be set. The `collides`
 * parameter controls if collision will be enabled (true) or disabled (false).
 *
 * @param properties - An object with tile properties and corresponding values that should be checked.
 * @param collides - If true it will enable collision. If false it will clear collision.
 * @param recalculateFaces - Whether or not to recalculate the tile faces after the update.
 * @param layer - The Tilemap Layer to act upon.
 */
const SetCollisionByProperty = (
  properties: { [key: string]: any | any[] },
  collides: boolean = true,
  recalculateFaces: boolean = true,
  layer: LayerData
): void => {
  for (let ty = 0; ty < layer.height; ty++) {
    for (let tx = 0; tx < layer.width; tx++) {
      const tile = layer.data[ty][tx]
      if (!tile) continue

      for (const property in properties) {
        if (!HasValue(tile.properties, property)) continue

        let values = properties[property]
        if (!Array.isArray(values)) {
          values = [values]
        }

        for (let i = 0; i < values.length; i++) {
          if (tile.properties[property] === values[i]) {
            SetTileCollision(tile, collides)
          }
        }
      }
    }
  }

  if (recalculateFaces) {
    CalculateFacesWithin(0, 0, layer.width, layer.height, layer)
  }
}

export default SetCollisionByProperty
