/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2013-2023 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Tile from '../Tile.js'
import GetTileAt from './GetTileAt.js'
import GetTilesWithin from './GetTilesWithin.js'

/**
 * Calculates interesting faces within the rectangular area specified (in tile coordinates) of the
 * layer. Interesting faces are used internally for optimizing collisions against tiles. This method
 * is mostly used internally.
 *
 * @function Phaser.Tilemaps.Components.CalculateFacesWithin
 * @since 3.0.0
 *
 * @param {number} tileX - The left most tile index (in tile coordinates) to use as the origin of the area.
 * @param {number} tileY - The top most tile index (in tile coordinates) to use as the origin of the area.
 * @param {number} width - How many tiles wide from the `tileX` index the area will be.
 * @param {number} height - How many tiles tall from the `tileY` index the area will be.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 */
var CalculateFacesWithin = function (tileX, tileY, width, height, layer) {
  var above: Tile | null = null
  var below: Tile | null = null
  var left: Tile | null = null
  var right: Tile | null = null

  var tiles = GetTilesWithin(tileX, tileY, width, height, null, layer)

  for (var i = 0; i < tiles.length; i++) {
    var tile = tiles[i]

    if (tile) {
      if (tile.collides) {
        above = GetTileAt(tile.x, tile.y - 1, true, layer)
        below = GetTileAt(tile.x, tile.y + 1, true, layer)
        left = GetTileAt(tile.x - 1, tile.y, true, layer)
        right = GetTileAt(tile.x + 1, tile.y, true, layer)

        tile.faceTop = above && above.collides ? false : true
        tile.faceBottom = below && below.collides ? false : true
        tile.faceLeft = left && left.collides ? false : true
        tile.faceRight = right && right.collides ? false : true
      } else {
        tile.resetFaces()
      }
    }
  }
}

export default CalculateFacesWithin
