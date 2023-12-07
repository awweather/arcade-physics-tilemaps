/**
 * @author Richard Davey <rich@photonstorm.com>
 * @copyright 2013-2023 Photon Storm Ltd.
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import GetFastValue from '../../../utils/object/GetFastValue'
import CreateGroupLayer from './CreateGroupLayer'

/**
 * Parses a Tiled JSON object into an array of objects with details about the image layers.
 *
 * @function Phaser.Tilemaps.Parsers.Tiled.ParseImageLayers
 * @since 3.0.0
 *
 * @param {object} json - The Tiled JSON object.
 *
 * @return {array} Array of objects that include critical info about the map's image layers
 */
const ParseImageLayers = (json: any): any[] => {
  const images: any[] = []

  // State inherited from a parent group
  const groupStack: any[] = []
  let curGroupState = CreateGroupLayer(json)

  while (curGroupState.i < curGroupState.layers.length || groupStack.length > 0) {
    if (curGroupState.i >= curGroupState.layers.length) {
      // Ensure the recursion stack is not empty first
      if (groupStack.length < 1) {
        console.warn('TilemapParser.parseTiledJSON - Invalid layer group hierarchy')
        break
      }

      // Return to the previous recursive state
      curGroupState = groupStack.pop()
      continue
    }

    // Get the current layer and advance the iterator
    const curi = curGroupState.layers[curGroupState.i]
    curGroupState.i++

    if (curi.type !== 'imagelayer') {
      if (curi.type === 'group') {
        // Compute the next state inherited from the group
        const nextGroupState = CreateGroupLayer(json, curi, curGroupState)

        // Preserve the current state before recursing
        groupStack.push(curGroupState)
        curGroupState = nextGroupState
      }

      // Skip this layer OR 'recurse' (iterative style) into the group
      continue
    }

    const layerOffsetX = GetFastValue(curi, 'offsetx', 0) + GetFastValue(curi, 'startx', 0)
    const layerOffsetY = GetFastValue(curi, 'offsety', 0) + GetFastValue(curi, 'starty', 0)
    images.push({
      name: curGroupState.name + curi.name,
      image: curi.image,
      x: curGroupState.x + layerOffsetX + curi.x,
      y: curGroupState.y + layerOffsetY + curi.y,
      alpha: curGroupState.opacity * curi.opacity,
      visible: curGroupState.visible && curi.visible,
      properties: GetFastValue(curi, 'properties', {})
    })
  }

  return images
}

export default ParseImageLayers
