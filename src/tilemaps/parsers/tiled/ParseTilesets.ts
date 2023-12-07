/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2013-2023 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import ImageCollection from '../../ImageCollection'
import Tileset from '../../Tileset'
import ParseObject from './ParseObject'
import ParseWangsets from './ParseWangsets'

/**
 * Tilesets and Image Collections.
 *
 * @function Phaser.Tilemaps.Parsers.Tiled.ParseTilesets
 * @since 3.0.0
 *
 * @param {object} json - The Tiled JSON data.
 *
 * @return {object} An object containing the tileset and image collection data.
 */
function ParseTilesets(json: any): { tilesets: Tileset[]; imageCollections: ImageCollection[] } {
  const tilesets: Tileset[] = []
  const imageCollections: ImageCollection[] = []
  let lastSet: any = null
  let stringID: string

  for (let i = 0; i < json.tilesets.length; i++) {
    //  name, firstgid, width, height, margin, spacing, properties
    const set = json.tilesets[i]

    if (set.source) {
      console.warn('External tilesets unsupported. Use Embed Tileset and re-export')
    } else if (set.image) {
      const newSet = new Tileset(
        set.name,
        set.firstgid,
        set.tilewidth,
        set.tileheight,
        set.margin,
        set.spacing,
        undefined,
        undefined,
        set.tileoffset
      )

      if (json.version > 1) {
        let datas: any = undefined
        let props: any = undefined

        if (Array.isArray(set.tiles)) {
          datas = datas || {}
          props = props || {}

          // Tiled 1.2+
          for (let t = 0; t < set.tiles.length; t++) {
            const tile = set.tiles[t]

            //  Convert tileproperties.
            if (tile.properties) {
              const newPropData: { [key: string]: any } = {}

              tile.properties.forEach(function (propData: any) {
                newPropData[propData['name']] = propData['value']
              })

              props[tile.id] = newPropData
            }

            //  Convert objectgroup
            if (tile.objectgroup) {
              ;(datas[tile.id] || (datas[tile.id] = {})).objectgroup = tile.objectgroup

              if (tile.objectgroup.objects) {
                const parsedObjects2 = tile.objectgroup.objects.map(function (obj: any) {
                  return ParseObject(obj)
                })

                datas[tile.id].objectgroup.objects = parsedObjects2
              }
            }

            // Copy animation data
            if (tile.animation) {
              ;(datas[tile.id] || (datas[tile.id] = {})).animation = tile.animation
            }

            // Copy tile `type` field
            // (see https://doc.mapeditor.org/en/latest/manual/custom-properties/#typed-tiles).
            if (tile.type) {
              ;(datas[tile.id] || (datas[tile.id] = {})).type = tile.type
            }
          }
        }

        if (Array.isArray(set.wangsets)) {
          datas = datas || {}
          props = props || {}

          ParseWangsets(set.wangsets, datas)
        }

        if (datas) {
          // Implies also props is set.
          newSet.tileData = datas
          newSet.tileProperties = props
        }
      } else {
        // Tiled 1

        // Properties stored per-tile in object with string indexes starting at "0"
        if (set.tileproperties) {
          newSet.tileProperties = set.tileproperties
        }

        // Object & terrain shapes stored per-tile in object with string indexes starting at "0"
        if (set.tiles) {
          newSet.tileData = set.tiles

          // Parse the objects into Phaser format to match handling of other Tiled objects
          for (stringID in newSet.tileData) {
            const objectGroup = newSet.tileData[stringID].objectgroup

            if (objectGroup && objectGroup.objects) {
              const parsedObjects1 = objectGroup.objects.map(function (obj: any) {
                return ParseObject(obj)
              })

              newSet.tileData[stringID].objectgroup.objects = parsedObjects1
            }
          }
        }
      }

      // For a normal sliced tileset the row/count/size information is computed when updated.
      // This is done (again) after the image is set.
      newSet.updateTileData(set.imagewidth, set.imageheight)

      tilesets.push(newSet)
    } else {
      const newCollection = new ImageCollection(
        set.name,
        set.firstgid,
        set.tilewidth,
        set.tileheight,
        set.margin,
        set.spacing,
        set.properties
      )

      let maxId = 0

      for (let t = 0; t < set.tiles.length; t++) {
        const tile = set.tiles[t]

        const image = tile.image
        const tileId = parseInt(tile.id, 10)
        const gid = set.firstgid + tileId
        newCollection.addImage(gid, image)

        maxId = Math.max(tileId, maxId)
      }

      newCollection.maxId = maxId

      imageCollections.push(newCollection)
    }

    //  We've got a new Tileset, so set the lastgid into the previous one
    if (lastSet) {
      lastSet.lastgid = set.firstgid - 1
    }

    lastSet = set
  }

  return { tilesets, imageCollections }
}

export default ParseTilesets
