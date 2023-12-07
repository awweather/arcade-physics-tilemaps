import Tileset from '../../Tileset'
import MapData from '../../mapdata/MapData.js'

/**
 * Master list of tiles -> x, y, index in tileset.
 *
 * @param mapData - The Map Data object.
 *
 * @return An array of Tileset objects.
 */
const BuildTilesetIndex = (mapData: MapData): Tileset[] => {
  let set: Tileset
  const tiles: [number, number, number][] = []

  for (let i = 0; i < mapData.imageCollections.length; i++) {
    const collection = mapData.imageCollections[i]
    const images = collection.images

    for (let j = 0; j < images.length; j++) {
      const image = images[j]

      set = new Tileset(image.image, image.gid, collection.imageWidth, collection.imageHeight, 0, 0)
      set.updateTileData(collection.imageWidth, collection.imageHeight)

      mapData.tilesets.push(set)
    }
  }

  for (let i = 0; i < mapData.tilesets.length; i++) {
    set = mapData.tilesets[i]

    let x = set.tileMargin
    let y = set.tileMargin

    let count = 0
    let countX = 0
    let countY = 0

    for (let t = set.firstgid; t < set.firstgid + set.total; t++) {
      tiles[t] = [x, y, i]

      x += set.tileWidth + set.tileSpacing

      count++
      if (count === set.total) {
        break
      }

      countX++
      if (countX === set.columns) {
        x = set.tileMargin
        y += set.tileHeight + set.tileSpacing

        countX = 0
        countY++
        if (countY === set.rows) {
          break
        }
      }
    }
  }

  return tiles as any
}

export default BuildTilesetIndex
