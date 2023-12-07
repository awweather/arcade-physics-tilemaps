/**
 * @author Richard Davey <rich@photonstorm.com>
 * @copyright 2013-2023 Photon Storm Ltd.
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Pick from '../../../utils/object/Pick'
import ParseGID from './ParseGID'

const copyPoints = (p: { x: number; y: number }) => ({ x: p.x, y: p.y })

const commonObjectProps: string[] = [
  'id',
  'name',
  'type',
  'rotation',
  'properties',
  'visible',
  'x',
  'y',
  'width',
  'height'
]

/**
 * Convert a Tiled object to an internal parsed object normalizing and copying properties over, while applying optional x and y offsets. The parsed object will always have the properties `id`, `name`, `type`, `rotation`, `properties`, `visible`, `x`, `y`, `width`, and `height`. Other properties will be added according to the object type (such as text, polyline, gid, etc.)
 *
 * @function Phaser.Tilemaps.Parsers.Tiled.ParseObject
 * @since 3.0.0
 *
 * @param {object} tiledObject - Tiled object to convert to an internal parsed object normalizing and copying properties over.
 * @param {number} [offsetX=0] - Optional additional offset to apply to the object's x property. Defaults to 0.
 * @param {number} [offsetY=0] - Optional additional offset to apply to the object's y property. Defaults to 0.
 *
 * @return {object} The parsed object containing properties read from the Tiled object according to its type with x and y values updated according to the given offsets.
 */
const ParseObject = (tiledObject: any, offsetX: number = 0, offsetY: number = 0): any => {
  const parsedObject: any = Pick(tiledObject, commonObjectProps)

  parsedObject.x += offsetX
  parsedObject.y += offsetY

  if (tiledObject.gid) {
    //  Object tiles
    const gidInfo = ParseGID(tiledObject.gid)
    parsedObject.gid = gidInfo.gid
    parsedObject.flippedHorizontal = gidInfo.flippedHorizontal
    parsedObject.flippedVertical = gidInfo.flippedVertical
    parsedObject.flippedAntiDiagonal = gidInfo.flippedAntiDiagonal
  } else if (tiledObject.polyline) {
    parsedObject.polyline = tiledObject.polyline.map(copyPoints)
  } else if (tiledObject.polygon) {
    parsedObject.polygon = tiledObject.polygon.map(copyPoints)
  } else if (tiledObject.ellipse) {
    parsedObject.ellipse = tiledObject.ellipse
  } else if (tiledObject.text) {
    parsedObject.text = tiledObject.text
  } else if (tiledObject.point) {
    parsedObject.point = true
  } else {
    // Otherwise, assume it is a rectangle
    parsedObject.rectangle = true
  }

  return parsedObject
}

export default ParseObject
