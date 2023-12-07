/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2013-2023 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import MapData from '../mapdata/MapData.js'
import ParseJSONTiled from './tiled/ParseJSONTiled'

/**
 * Parses raw data of a given Tilemap format into a new MapData object. If no recognized data format
 * is found, returns `null`. When loading from CSV or a 2D array, you should specify the tileWidth &
 * tileHeight. When parsing from a map from Tiled, the tileWidth & tileHeight will be pulled from
 * the map data.
 *
 * @function Phaser.Tilemaps.Parsers.Parse
 * @since 3.0.0
 *
 * @param {string} name - The name of the tilemap, used to set the name on the MapData.
 * @param {number} mapFormat - See ../Formats.js.
 * @param {(number[][]|string|object)} data - 2D array, CSV string or Tiled JSON object.
 * @param {number} tileWidth - The width of a tile in pixels. Required for 2D array and CSV, but
 * ignored for Tiled JSON.
 * @param {number} tileHeight - The height of a tile in pixels. Required for 2D array and CSV, but
 * ignored for Tiled JSON.
 * @param {boolean} insertNull - Controls how empty tiles, tiles with an index of -1, in the map
 * data are handled. If `true`, empty locations will get a value of `null`. If `false`, empty
 * location will get a Tile object with an index of -1. If you've a large sparsely populated map and
 * the tile data doesn't need to change then setting this value to `true` will help with memory
 * consumption. However if your map is small or you need to update the tiles dynamically, then leave
 * the default value set.
 *
 * @return {MapData} The created `MapData` object.
 */
const Parse = function (
  name: string,
  mapFormat: number,
  data: number[][] | string | object,
  tileWidth: number,
  tileHeight: number,
  insertNull: boolean
): MapData | null {
  return ParseJSONTiled(name, data as any, insertNull as any)
}

export default Parse
