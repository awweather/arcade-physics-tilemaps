import Tilemap from './Tilemap.js'
import Parse from './parsers/Parse.js'

/**
 * Create a Tilemap from the given key or data. If neither is given, make a blank Tilemap. When
 * loading from CSV or a 2D array, you should specify the tileWidth & tileHeight. When parsing from
 * a map from Tiled, the tileWidth, tileHeight, width & height will be pulled from the map data. For
 * an empty map, you should specify tileWidth, tileHeight, width & height.
 *
 * @param scene - The Scene to which this Tilemap belongs.
 * @param key - The key in the Phaser cache that corresponds to the loaded tilemap data.
 * @param tileWidth - The width of a tile in pixels.
 * @param tileHeight - The height of a tile in pixels.
 * @param width - The width of the map in tiles.
 * @param height - The height of the map in tiles.
 * @param data - Instead of loading from the cache, you can also load directly from a 2D array of tile indexes.
 * @param insertNull - Controls how empty tiles, tiles with an index of -1, in the map data are handled.
 * @returns Phaser.Tilemaps.Tilemap
 */
const ParseToTilemap = (
  json: any,
  key?: string,
  tileWidth: number = 32,
  tileHeight: number = 32,
  width: number = 10,
  height: number = 10,
  data?: number[][],
  insertNull: boolean = false
): Tilemap | null => {
  const mapData = Parse(key!, 1, json, tileWidth, tileHeight, insertNull)

  return new Tilemap(mapData!)
}

export default ParseToTilemap
