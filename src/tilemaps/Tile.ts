// @ts-ignore

import { Rectangle } from '../geom/rectangle/Rectangle.js'
import Tilemap from './Tilemap.js'
import TilemapLayer from './TilemapLayer.js'
import Tileset from './Tileset.js'
import CalculateFacesAt from './components/CalculateFacesAt.js'
import LayerData from './mapdata/LayerData.js'

class Tile {
  layer: LayerData
  index: number
  x: number
  y: number
  width: number
  height: number
  baseWidth: number
  baseHeight: number
  pixelX: number
  pixelY: number
  right: number
  bottom: number = 0
  properties: any // Consider defining a more specific type
  rotation: number
  collideLeft: boolean
  collideRight: boolean
  collideUp: boolean
  collideDown: boolean
  faceLeft: boolean
  faceRight: boolean
  faceTop: boolean
  faceBottom: boolean
  collisionCallback?: Function // Consider using a more specific function type
  collisionCallbackContext: any // Consider defining a more specific type
  tint: number
  tintFill: boolean
  physics: any // Consider defining a more specific type

  constructor(
    layer: LayerData,
    index: number,
    x: number,
    y: number,
    width: number,
    height: number,
    baseWidth: number | undefined,
    baseHeight: number | undefined
  ) {
    /**
     * The LayerData in the Tilemap data that this tile belongs to.
     *
     * @name Phaser.Tilemaps.Tile#layer
     * @type {Phaser.Tilemaps.LayerData}
     * @since 3.0.0
     */
    this.layer = layer

    /**
     * The index of this tile within the map data corresponding to the tileset, or -1 if this
     * represents a blank tile.
     *
     * @name Phaser.Tilemaps.Tile#index
     * @type {number}
     * @since 3.0.0
     */
    this.index = index

    /**
     * The x map coordinate of this tile in tile units.
     *
     * @name Phaser.Tilemaps.Tile#x
     * @type {number}
     * @since 3.0.0
     */
    this.x = x

    /**
     * The y map coordinate of this tile in tile units.
     *
     * @name Phaser.Tilemaps.Tile#y
     * @type {number}
     * @since 3.0.0
     */
    this.y = y

    /**
     * The width of the tile in pixels.
     *
     * @name Phaser.Tilemaps.Tile#width
     * @type {number}
     * @since 3.0.0
     */
    this.width = width

    /**
     * The height of the tile in pixels.
     *
     * @name Phaser.Tilemaps.Tile#height
     * @type {number}
     * @since 3.0.0
     */
    this.height = height

    /**
     * The right of the tile in pixels.
     *
     * Set in the `updatePixelXY` method.
     *
     * @name Phaser.Tilemaps.Tile#right
     * @type {number}
     * @since 3.50.0
     */
    this.right = 0

    /**
     * The bottom of the tile in pixels.
     *
     * Set in the `updatePixelXY` method.
     *
     * @name Phaser.Tilemaps.Tile#bottom
     * @type {number}
     * @since 3.50.0
     */
    this.right = 0

    /**
     * The maps base width of a tile in pixels. Tiled maps support multiple tileset sizes
     * within one map, but they are still placed at intervals of the base tile size.
     *
     * @name Phaser.Tilemaps.Tile#baseWidth
     * @type {number}
     * @since 3.0.0
     */
    this.baseWidth = baseWidth !== undefined ? baseWidth : width

    /**
     * The maps base height of a tile in pixels. Tiled maps support multiple tileset sizes
     * within one map, but they are still placed at intervals of the base tile size.
     *
     * @name Phaser.Tilemaps.Tile#baseHeight
     * @type {number}
     * @since 3.0.0
     */
    this.baseHeight = baseHeight !== undefined ? baseHeight : height

    /**
     * The x coordinate of the top left of this tile in pixels. This is relative to the top left
     * of the layer this tile is being rendered within. This property does NOT factor in camera
     * scroll, layer scale or layer position.
     *
     * @name Phaser.Tilemaps.Tile#pixelX
     * @type {number}
     * @since 3.0.0
     */
    this.pixelX = 0

    /**
     * The y coordinate of the top left of this tile in pixels. This is relative to the top left
     * of the layer this tile is being rendered within. This property does NOT factor in camera
     * scroll, layer scale or layer position.
     *
     * @name Phaser.Tilemaps.Tile#pixelY
     * @type {number}
     * @since 3.0.0
     */
    this.pixelY = 0

    this.updatePixelXY()

    /**
     * Tile specific properties. These usually come from Tiled.
     *
     * @name Phaser.Tilemaps.Tile#properties
     * @type {any}
     * @since 3.0.0
     */
    this.properties = {}

    /**
     * The rotation angle of this tile.
     *
     * @name Phaser.Tilemaps.Tile#rotation
     * @type {number}
     * @since 3.0.0
     */
    this.rotation = 0

    /**
     * Whether the tile should collide with any object on the left side.
     *
     * This property is used by Arcade Physics only, however, you can also use it
     * in your own checks.
     *
     * @name Phaser.Tilemaps.Tile#collideLeft
     * @type {boolean}
     * @since 3.0.0
     */
    this.collideLeft = false

    /**
     * Whether the tile should collide with any object on the right side.
     *
     * This property is used by Arcade Physics only, however, you can also use it
     * in your own checks.
     *
     * @name Phaser.Tilemaps.Tile#collideRight
     * @type {boolean}
     * @since 3.0.0
     */
    this.collideRight = false

    /**
     * Whether the tile should collide with any object on the top side.
     *
     * This property is used by Arcade Physics only, however, you can also use it
     * in your own checks.
     *
     * @name Phaser.Tilemaps.Tile#collideUp
     * @type {boolean}
     * @since 3.0.0
     */
    this.collideUp = false

    /**
     * Whether the tile should collide with any object on the bottom side.
     *
     * This property is used by Arcade Physics only, however, you can also use it
     * in your own checks.
     *
     * @name Phaser.Tilemaps.Tile#collideDown
     * @type {boolean}
     * @since 3.0.0
     */
    this.collideDown = false

    /**
     * Whether the tiles left edge is interesting for collisions.
     *
     * @name Phaser.Tilemaps.Tile#faceLeft
     * @type {boolean}
     * @since 3.0.0
     */
    this.faceLeft = false

    /**
     * Whether the tiles right edge is interesting for collisions.
     *
     * @name Phaser.Tilemaps.Tile#faceRight
     * @type {boolean}
     * @since 3.0.0
     */
    this.faceRight = false

    /**
     * Whether the tiles top edge is interesting for collisions.
     *
     * @name Phaser.Tilemaps.Tile#faceTop
     * @type {boolean}
     * @since 3.0.0
     */
    this.faceTop = false

    /**
     * Whether the tiles bottom edge is interesting for collisions.
     *
     * @name Phaser.Tilemaps.Tile#faceBottom
     * @type {boolean}
     * @since 3.0.0
     */
    this.faceBottom = false

    /**
     * Tile collision callback.
     *
     * @name Phaser.Tilemaps.Tile#collisionCallback
     * @type {function}
     * @since 3.0.0
     */
    this.collisionCallback = undefined

    /**
     * The context in which the collision callback will be called.
     *
     * @name Phaser.Tilemaps.Tile#collisionCallbackContext
     * @type {object}
     * @since 3.0.0
     */
    this.collisionCallbackContext = this

    /**
     * The tint to apply to this tile. Note: tint is currently a single color value instead of
     * the 4 corner tint component on other GameObjects.
     *
     * @name Phaser.Tilemaps.Tile#tint
     * @type {number}
     * @default
     * @since 3.0.0
     */
    this.tint = 0xffffff

    /**
     * The tint fill mode.
     *
     * `false` = An additive tint (the default), where vertices colors are blended with the texture.
     * `true` = A fill tint, where the vertices colors replace the texture, but respects texture alpha.
     *
     * @name Phaser.Tilemaps.Tile#tintFill
     * @type {boolean}
     * @default
     * @since 3.70.0
     */
    this.tintFill = false

    /**
     * An empty object where physics-engine specific information (e.g. bodies) may be stored.
     *
     * @name Phaser.Tilemaps.Tile#physics
     * @type {object}
     * @since 3.0.0
     */
    this.physics = {}
  }

  getLeft(): number {
    const tilemapLayer = this.tilemapLayer
    if (tilemapLayer) {
      const point = tilemapLayer.tileToWorldXY(this.x, this.y, undefined, undefined)
      return point.x
    }
    return this.x * this.baseWidth
  }

  getRight(): number {
    const tilemapLayer = this.tilemapLayer
    return tilemapLayer ? this.getLeft() + this.width * tilemapLayer.scaleX : this.getLeft() + this.width
  }

  getTop(): number {
    const tilemapLayer = this.tilemapLayer
    if (tilemapLayer) {
      const point = tilemapLayer.tileToWorldXY(this.x, this.y, undefined, undefined)
      return point.y
    }
    return this.y * this.baseHeight - (this.height - this.baseHeight)
  }

  getBottom(): number {
    const tilemapLayer = this.tilemapLayer
    return tilemapLayer ? this.getTop() + this.height * tilemapLayer.scaleY : this.getTop() + this.height
  }

  getBounds(output?: Rectangle): Rectangle {
    if (output === undefined) {
      output = new Rectangle()
    }
    output.x = this.getLeft()
    output.y = this.getTop()
    output.width = this.getRight() - output.x
    output.height = this.getBottom() - output.y
    return output
  }

  getCenterX(): number {
    return (this.getLeft() + this.getRight()) / 2
  }

  getCenterY(): number {
    return (this.getTop() + this.getBottom()) / 2
  }

  intersects(x: number, y: number, right: number, bottom: number): boolean {
    return !(right <= this.pixelX || bottom <= this.pixelY || x >= this.right || y >= this.bottom)
  }

  get hasInterestingFace() {
    return this.faceTop || this.faceBottom || this.faceLeft || this.faceRight
  }

  isInteresting(collides: boolean, faces: boolean): boolean {
    if (collides && faces) {
      return this.canCollide || this.hasInterestingFace
    } else if (collides) {
      return this.collides
    } else if (faces) {
      return this.hasInterestingFace
    }
    return false
  }

  resetCollision(recalculateFaces: boolean = true): Tile {
    this.collideLeft = false
    this.collideRight = false
    this.collideUp = false
    this.collideDown = false
    this.faceTop = false
    this.faceBottom = false
    this.faceLeft = false
    this.faceRight = false
    if (recalculateFaces) {
      const tilemapLayer = this.tilemapLayer
      if (tilemapLayer) {
        CalculateFacesAt(this.x, this.y, tilemapLayer)
      }
    }
    return this
  }

  resetFaces(): Tile {
    this.faceTop = false
    this.faceBottom = false
    this.faceLeft = false
    this.faceRight = false
    return this
  }

  setCollision(
    left: boolean,
    right: boolean = left,
    up: boolean = left,
    down: boolean = left,
    recalculateFaces: boolean = true
  ): Tile {
    this.collideLeft = left
    this.collideRight = right
    this.collideUp = up
    this.collideDown = down
    this.faceLeft = left
    this.faceRight = right
    this.faceTop = up
    this.faceBottom = down
    if (recalculateFaces) {
      const tilemapLayer = this.tilemapLayer
      if (tilemapLayer) {
        CalculateFacesAt(this.x, this.y, tilemapLayer)
      }
    }
    return this
  }

  setCollisionCallback(callback: Function | null, context: any): Tile {
    if (callback === null) {
      this.collisionCallback = undefined
      this.collisionCallbackContext = undefined
    } else {
      this.collisionCallback = callback
      this.collisionCallbackContext = context
    }
    return this
  }

  setSize(tileWidth: number, tileHeight: number, baseWidth?: number, baseHeight?: number): Tile {
    if (tileWidth !== undefined) {
      this.width = tileWidth
    }
    if (tileHeight !== undefined) {
      this.height = tileHeight
    }
    if (baseWidth !== undefined) {
      this.baseWidth = baseWidth
    }
    if (baseHeight !== undefined) {
      this.baseHeight = baseHeight
    }
    this.updatePixelXY()
    return this
  }

  updatePixelXY(): Tile {
    var orientation = this.layer.orientation

    this.pixelX = this.x * this.baseWidth
    this.pixelY = this.y * this.baseHeight

    this.right = this.pixelX + this.baseWidth
    this.bottom = this.pixelY + this.baseHeight

    return this
  }

  destroy(): void {
    this.collisionCallback = undefined
    this.collisionCallbackContext = undefined
    this.properties = undefined
  }

  get tileset(): Tileset | null {
    const tilemapLayer = this.layer.tilemapLayer
    if (tilemapLayer) {
      const tileset = tilemapLayer.gidMap[this.index]
      if (tileset) {
        return tileset
      }
    }
    return null
  }

  get tilemapLayer(): TilemapLayer | null {
    return this.layer.tilemapLayer
  }

  get tilemap(): Tilemap | null {
    const tilemapLayer = this.tilemapLayer
    return tilemapLayer ? tilemapLayer.tilemap : null
  }

  get canCollide() {
    return (
      this.collideLeft ||
      this.collideRight ||
      this.collideUp ||
      this.collideDown ||
      this.collisionCallback !== undefined
    )
  }

  get collides() {
    return this.collideLeft || this.collideRight || this.collideUp || this.collideDown
  }
}

export default Tile
