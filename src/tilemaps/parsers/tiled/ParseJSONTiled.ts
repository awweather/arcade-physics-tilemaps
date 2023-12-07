import DeepCopy from '../../../utils/object/DeepCopy.js'
import Formats from '../../Formats.js'
import MapData from '../../mapdata/MapData.js'
import FromOrientationString from '../FromOrientationString.js'
import AssignTileProperties from './AssignTileProperties.js'
import BuildTilesetIndex from './BuildTilesetIndex.js'
import ParseImageLayers from './ParseImageLayers.js'
import ParseObjectLayers from './ParseObjectLayers.js'
import ParseTileLayers from './ParseTileLayers.js'
import ParseTilesets from './ParseTilesets.js'

/**
 * Parses a Tiled JSON object into a new MapData object.
 *
 * @param name - The name of the tilemap, used to set the name on the MapData.
 * @param source - The original Tiled JSON object. This is deep copied by this function.
 * @param insertNull - Controls how empty tiles, tiles with an index of -1, in the map
 * data are handled.
 * @returns The created MapData object, or `null` if the data can't be parsed.
 */
export function ParseJSONTiled(name: string, source: any, insertNull: boolean): MapData | null {
  const json = DeepCopy(source)

  // Map data will consist of: layers, objects, images, tilesets, sizes
  const mapData = new MapData({
    width: json.width,
    height: json.height,
    name: name,
    tileWidth: json.tilewidth,
    tileHeight: json.tileheight,
    orientation: FromOrientationString(json.orientation),
    format: Formats.TILED_JSON,
    version: json.version,
    properties: json.properties,
    renderOrder: json.renderorder,
    infinite: json.infinite
  })

  //   if (mapData.orientation === CONST.HEXAGONAL) {
  //     mapData.hexSideLength = json.hexsidelength
  //     mapData.staggerAxis = json.staggeraxis
  //     mapData.staggerIndex = json.staggerindex
  //   }

  mapData.layers = ParseTileLayers(json, insertNull)
  mapData.images = ParseImageLayers(json)

  const sets = ParseTilesets(json)

  mapData.tilesets = sets.tilesets
  mapData.imageCollections = sets.imageCollections

  mapData.objects = ParseObjectLayers(json)

  mapData.tiles = BuildTilesetIndex(mapData)

  AssignTileProperties(mapData)

  return mapData
}

export default ParseJSONTiled
