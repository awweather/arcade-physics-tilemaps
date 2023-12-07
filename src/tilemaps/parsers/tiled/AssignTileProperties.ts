/**
 * @author Richard Davey <rich@photonstorm.com>
 * @copyright 2013-2023 Photon Storm Ltd.
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Extend from '../../../utils/object/Extend'
import TilemapLayer from '../../TilemapLayer.js'
import MapData from '../../mapdata/MapData.js'

/**
 * Copy properties from tileset to tiles.
 *
 * @function Phaser.Tilemaps.Parsers.Tiled.AssignTileProperties
 * @since 3.0.0
 *
 * @param {Phaser.Tilemaps.MapData} mapData - The Map Data object.
 */
const AssignTileProperties = (mapData: MapData): void => {
  let layerData: TilemapLayer
  let tile: any
  let sid: number
  let set: any
  let row: any[]

  // go through each of the map data layers
  for (let i = 0; i < mapData.layers.length; i++) {
    layerData = mapData.layers[i]

    set = null

    // rows of tiles
    for (let j = 0; j < layerData.data.length; j++) {
      row = layerData.data[j]

      // individual tiles
      for (let k = 0; k < row.length; k++) {
        tile = row[k]

        if (tile === null || tile.index < 0) {
          continue
        }

        // find the relevant tileset
        sid = mapData.tiles[tile.index][2]
        set = mapData.tilesets[sid]

        // Ensure that a tile's size matches its tileset
        tile.width = set.tileWidth
        tile.height = set.tileHeight

        // if that tile type has any properties, add them to the tile object
        if (set.tileProperties && set.tileProperties[tile.index - set.firstgid]) {
          tile.properties = Extend(tile.properties, set.tileProperties[tile.index - set.firstgid])
        }
      }
    }
  }
}

export default AssignTileProperties
