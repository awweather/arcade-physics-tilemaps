// Additional imports might be needed, depending on your project setup
//@ts-nocheck

import ImageCollection from './ImageCollection.js'
import TilemapLayer from './TilemapLayer.js'
import Tileset from './Tileset.js'
import TileToWorldXY from './components/TileToWorldXY.js'
import WorldToTileXY from './components/WorldToTileXY.js'
import LayerData from './mapdata/LayerData.js'
import MapData from './mapdata/MapData.js'
import ObjectLayer from './mapdata/ObjectLayer.js'

export default class Tilemap {
  // Class properties with types
  tileWidth: number
  tileHeight: number
  width: number
  height: number
  orientation: string
  renderOrder: string
  format: number
  version: number
  properties: object
  widthInPixels: number
  heightInPixels: number
  imageCollections: ImageCollection[]
  images: any[] // Replace 'any' with the correct type
  layers: LayerData[]
  tilesets: Tileset[]
  objects: ObjectLayer[]
  currentLayerIndex: number
  hexSideLength: number
  _convert: any // Replace 'any' with the correct type

  constructor(mapData: MapData) {
    this._convert = {
      WorldToTileXY: WorldToTileXY,
      TileToWorldXY: TileToWorldXY
    }

    /**
     * The base width of a tile in pixels. Note that individual layers may have a different tile
     * width.
     *
     * @name Phaser.Tilemaps.Tilemap#tileWidth
     * @type {number}
     * @since 3.0.0
     */
    this.tileWidth = mapData.tileWidth

    /**
     * The base height of a tile in pixels. Note that individual layers may have a different
     * tile height.
     *
     * @name Phaser.Tilemaps.Tilemap#tileHeight
     * @type {number}
     * @since 3.0.0
     */
    this.tileHeight = mapData.tileHeight

    /**
     * The width of the map (in tiles).
     *
     * @name Phaser.Tilemaps.Tilemap#width
     * @type {number}
     * @since 3.0.0
     */
    this.width = mapData.width

    /**
     * The height of the map (in tiles).
     *
     * @name Phaser.Tilemaps.Tilemap#height
     * @type {number}
     * @since 3.0.0
     */
    this.height = mapData.height

    /**
     * The orientation of the map data (as specified in Tiled), usually 'orthogonal'.
     *
     * @name Phaser.Tilemaps.Tilemap#orientation
     * @type {string}
     * @since 3.0.0
     */
    this.orientation = mapData.orientation

    /**
     * The render (draw) order of the map data (as specified in Tiled), usually 'right-down'.
     *
     * The draw orders are:
     *
     * right-down
     * left-down
     * right-up
     * left-up
     *
     * This can be changed via the `setRenderOrder` method.
     *
     * @name Phaser.Tilemaps.Tilemap#renderOrder
     * @type {string}
     * @since 3.12.0
     */
    this.renderOrder = mapData.renderOrder

    /**
     * The format of the map data.
     *
     * @name Phaser.Tilemaps.Tilemap#format
     * @type {number}
     * @since 3.0.0
     */
    this.format = mapData.format

    /**
     * The version of the map data (as specified in Tiled, usually 1).
     *
     * @name Phaser.Tilemaps.Tilemap#version
     * @type {number}
     * @since 3.0.0
     */
    this.version = mapData.version

    /**
     * Map specific properties as specified in Tiled.
     *
     * @name Phaser.Tilemaps.Tilemap#properties
     * @type {object}
     * @since 3.0.0
     */
    this.properties = mapData.properties

    /**
     * The width of the map in pixels based on width * tileWidth.
     *
     * @name Phaser.Tilemaps.Tilemap#widthInPixels
     * @type {number}
     * @since 3.0.0
     */
    this.widthInPixels = mapData.widthInPixels

    /**
     * The height of the map in pixels based on height * tileHeight.
     *
     * @name Phaser.Tilemaps.Tilemap#heightInPixels
     * @type {number}
     * @since 3.0.0
     */
    this.heightInPixels = mapData.heightInPixels

    /**
     * A collection of Images, as parsed from Tiled map data.
     *
     * @name Phaser.Tilemaps.Tilemap#imageCollections
     * @type {Phaser.Tilemaps.ImageCollection[]}
     * @since 3.0.0
     */
    this.imageCollections = mapData.imageCollections

    /**
     * An array of Tiled Image Layers.
     *
     * @name Phaser.Tilemaps.Tilemap#images
     * @type {array}
     * @since 3.0.0
     */
    this.images = mapData.images

    /**
     * An array of Tilemap layer data.
     *
     * @name Phaser.Tilemaps.Tilemap#layers
     * @type {Phaser.Tilemaps.LayerData[]}
     * @since 3.0.0
     */
    this.layers = mapData.layers

    /**
     * Master list of tiles -> x, y, index in tileset.
     *
     * @name Phaser.Tilemaps.Tilemap#tiles
     * @type {array}
     * @since 3.60.0
     * @see Phaser.Tilemaps.Parsers.Tiled.BuildTilesetIndex
     */
    this.tiles = mapData.tiles

    /**
     * An array of Tilesets used in the map.
     *
     * @name Phaser.Tilemaps.Tilemap#tilesets
     * @type {Phaser.Tilemaps.Tileset[]}
     * @since 3.0.0
     */
    this.tilesets = mapData.tilesets

    /**
     * An array of ObjectLayer instances parsed from Tiled object layers.
     *
     * @name Phaser.Tilemaps.Tilemap#objects
     * @type {Phaser.Tilemaps.ObjectLayer[]}
     * @since 3.0.0
     */
    this.objects = mapData.objects

    /**
     * The index of the currently selected LayerData object.
     *
     * @name Phaser.Tilemaps.Tilemap#currentLayerIndex
     * @type {number}
     * @since 3.0.0
     */
    this.currentLayerIndex = 0

    /**
     * The length of the horizontal sides of the hexagon.
     * Only used for hexagonal orientation Tilemaps.
     *
     * @name Phaser.Tilemaps.Tilemap#hexSideLength
     * @type {number}
     * @since 3.50.0
     */
    this.hexSideLength = mapData.hexSideLength
  }

  // Methods with parameter and return types
  setRenderOrder(renderOrder: number | string): Tilemap {
    // Method implementation
  }

  addTilesetImage(
    tilesetName: string,
    key?: string,
    tileWidth?: number,
    tileHeight?: number,
    tileMargin?: number,
    tileSpacing?: number,
    gid?: number
  ): Tileset | null {
    // Method implementation
  }

  copy(
    srcTileX: number,
    srcTileY: number,
    width: number,
    height: number,
    destTileX: number,
    destTileY: number,
    recalculateFaces?: boolean,
    layer?: string | number | Phaser.Tilemaps.TilemapLayer
  ): Tilemap | null {
    // Method implementation
  }

  createBlankLayer(
    name: string,
    tileset: string | string[] | Tileset | Tileset[],
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    tileWidth?: number,
    tileHeight?: number
  ): TilemapLayer | null {
    // Method implementation
  }

  // ... rest of the methods with appropriate types

  destroy(): void {
    // Method implementation
  }

  getIndex(location, name) {
    for (var i = 0; i < location.length; i++) {
      if (location[i].name === name) {
        return i
      }
    }

    return null
  }

  getLayerIndexByName(name: any) {
    return this.getIndex(this.layers, name)
  }

  /**
   * Gets the LayerData from `this.layers` that is associated with the given `layer`, or null if the layer is invalid.
   *
   * @method Phaser.Tilemaps.Tilemap#getLayer
   * @since 3.0.0
   *
   * @param {(string|number|Phaser.Tilemaps.TilemapLayer)} [layer] - The name of the layer from Tiled, the index of the layer in the map or Tilemap Layer. If not given will default to the maps current layer index.
   *
   * @return {?Phaser.Tilemaps.LayerData} The corresponding `LayerData` within `this.layers`, or null.
   */
  getLayer(layer): LayerData | null {
    var index = this.getLayerIndex(layer)

    return index !== null ? this.layers[index] : null
  }

  getLayerIndex(layer): any {
    if (layer === undefined) {
      return this.currentLayerIndex
    } else if (typeof layer === 'string') {
      return this.getLayerIndexByName(layer)
    } else if (typeof layer === 'number' && layer < this.layers.length) {
      return layer
    } else if (layer instanceof TilemapLayer && layer.tilemap === this) {
      return layer.layerIndex
    } else {
      return null
    }
  }

  createLayer(layerID: number, tileset: string, x: number, y: number): TilemapLayer | null {
    var index = this.getLayerIndex(layerID)
    if (index === null) {
      console.warn(`Invalid Tilemap Layer ID: ${layerID}`)
      if (typeof layerID === 'string') {
        console.warn('Valid tilelayer names: %o', this.getTileLayerNames())
      }
      return null
    }
    var layerData = this.layers[index]
    // Check for an associated tilemap layer
    if (layerData.tilemapLayer) {
      console.warn(`Tilemap Layer ID already exists:${layerID}`)
      return null
    }
    this.currentLayerIndex = index
    //  Default the x/y position to match Tiled layer offset, if it exists.
    if (x === undefined) {
      x = layerData.x
    }
    if (y === undefined) {
      y = layerData.y
    }
    var layer = new TilemapLayer(this, index, tileset, x, y)
    // layer.setRenderOrder(this.renderOrder)
    // this.scene.sys.displayList.add(layer)
    return layer
  }

  getTileset(name) {
    var index = this.getIndex(this.tilesets, name)

    return index !== null ? this.tilesets[index] : null
  }

  tileToWorldXY(tileX, tileY, vec2, layer) {
    layer = this.getLayer(layer)

    if (layer === null) {
      return null
    }

    return this._convert.TileToWorldXY(tileX, tileY, vec2, layer)
  }
}
