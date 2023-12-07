import { Vector2 } from '../math/Vector2'
import Tilemap from './Tilemap.js'
import Tileset from './Tileset.js'
import SetCollisionByProperty from './components/SetCollisionByProperty.js'
import LayerData from './mapdata/LayerData.js'

export default class TilemapLayer {
  public isTilemap: boolean = true
  public tilemap: Tilemap
  public layerIndex: number
  public layer: LayerData
  public tileset: Tileset[]
  public tilesDrawn: number
  public tilesTotal: number
  public culledTiles: any[]
  public skipCull: boolean = false
  public cullPaddingX: number = 1
  public cullPaddingY: number = 1
  public collisionMask: number
  public collisionCategory: number
  //   public cullCallback: Function
  private _renderOrder: number = 0
  public gidMap: Tileset[]
  public tempVec: Vector2
  public data: any[] = []
  scaleX: number = 1
  scaleY: number = 1
  x: number = 0
  y: number = 0

  constructor(
    tilemap: Tilemap,
    layerIndex: number,
    tileset: string | string[] | Tileset | Tileset[],
    x: number = 0,
    y: number = 0
  ) {
    this.x = x
    this.y = y
    /**
     * Used internally by physics system to perform fast type checks.
     *
     * @name Phaser.Tilemaps.TilemapLayer#isTilemap
     * @type {boolean}
     * @readonly
     * @since 3.50.0
     */
    this.isTilemap = true

    /**
     * The Tilemap that this layer is a part of.
     *
     * @name Phaser.Tilemaps.TilemapLayer#tilemap
     * @type {Phaser.Tilemaps.Tilemap}
     * @since 3.50.0
     */
    this.tilemap = tilemap

    /**
     * The index of the LayerData associated with this layer.
     *
     * @name Phaser.Tilemaps.TilemapLayer#layerIndex
     * @type {number}
     * @since 3.50.0
     */
    this.layerIndex = layerIndex

    /**
     * The LayerData associated with this layer. LayerData can only be associated with one
     * tilemap layer.
     *
     * @name Phaser.Tilemaps.TilemapLayer#layer
     * @type {Phaser.Tilemaps.LayerData}
     * @since 3.50.0
     */
    this.layer = tilemap.layers[layerIndex]

    // Link the LayerData with this static tilemap layer
    this.layer.tilemapLayer = this

    /**
     * An array of `Tileset` objects associated with this layer.
     *
     * @name Phaser.Tilemaps.TilemapLayer#tileset
     * @type {Phaser.Tilemaps.Tileset[]}
     * @since 3.50.0
     */
    this.tileset = []

    /**
     * The total number of tiles drawn by the renderer in the last frame.
     *
     * @name Phaser.Tilemaps.TilemapLayer#tilesDrawn
     * @type {number}
     * @readonly
     * @since 3.50.0
     */
    this.tilesDrawn = 0

    /**
     * The total number of tiles in this layer. Updated every frame.
     *
     * @name Phaser.Tilemaps.TilemapLayer#tilesTotal
     * @type {number}
     * @readonly
     * @since 3.50.0
     */
    this.tilesTotal = this.layer.width * this.layer.height

    /**
     * Used internally during rendering. This holds the tiles that are visible within the Camera.
     *
     * @name Phaser.Tilemaps.TilemapLayer#culledTiles
     * @type {Phaser.Tilemaps.Tile[]}
     * @since 3.50.0
     */
    this.culledTiles = []

    /**
     * You can control if the camera should cull tiles on this layer before rendering them or not.
     *
     * By default the camera will try to cull the tiles in this layer, to avoid over-drawing to the renderer.
     *
     * However, there are some instances when you may wish to disable this, and toggling this flag allows
     * you to do so. Also see `setSkipCull` for a chainable method that does the same thing.
     *
     * @name Phaser.Tilemaps.TilemapLayer#skipCull
     * @type {boolean}
     * @since 3.50.0
     */
    this.skipCull = false

    /**
     * The amount of extra tiles to add into the cull rectangle when calculating its horizontal size.
     *
     * See the method `setCullPadding` for more details.
     *
     * @name Phaser.Tilemaps.TilemapLayer#cullPaddingX
     * @type {number}
     * @default 1
     * @since 3.50.0
     */
    this.cullPaddingX = 1

    /**
     * The amount of extra tiles to add into the cull rectangle when calculating its vertical size.
     *
     * See the method `setCullPadding` for more details.
     *
     * @name Phaser.Tilemaps.TilemapLayer#cullPaddingY
     * @type {number}
     * @default 1
     * @since 3.50.0
     */
    this.cullPaddingY = 1

    /**
     * The callback that is invoked when the tiles are culled.
     *
     * It will call a different function based on the map orientation:
     *
     * Orthogonal (the default) is `TilemapComponents.CullTiles`
     * Isometric is `TilemapComponents.IsometricCullTiles`
     * Hexagonal is `TilemapComponents.HexagonalCullTiles`
     * Staggered is `TilemapComponents.StaggeredCullTiles`
     *
     * However, you can override this to call any function you like.
     *
     * It will be sent 4 arguments:
     *
     * 1. The Phaser.Tilemaps.LayerData object for this Layer
     * 2. The Camera that is culling the layer. You can check its `dirty` property to see if it has changed since the last cull.
     * 3. A reference to the `culledTiles` array, which should be used to store the tiles you want rendered.
     * 4. The Render Order constant.
     *
     * See the `TilemapComponents.CullTiles` source code for details on implementing your own culling system.
     *
     * @name Phaser.Tilemaps.TilemapLayer#cullCallback
     * @type {function}
     * @since 3.50.0
     */
    // this.cullCallback = TilemapComponents.GetCullTilesFunction(this.layer.orientation)

    /**
     * The rendering (draw) order of the tiles in this layer.
     *
     * The default is 0 which is 'right-down', meaning it will draw the tiles starting from the top-left,
     * drawing to the right and then moving down to the next row.
     *
     * The draw orders are:
     *
     * 0 = right-down
     * 1 = left-down
     * 2 = right-up
     * 3 = left-up
     *
     * This can be changed via the `setRenderOrder` method.
     *
     * @name Phaser.Tilemaps.TilemapLayer#_renderOrder
     * @type {number}
     * @default 0
     * @private
     * @since 3.50.0
     */
    this._renderOrder = 0

    /**
     * An array holding the mapping between the tile indexes and the tileset they belong to.
     *
     * @name Phaser.Tilemaps.TilemapLayer#gidMap
     * @type {Phaser.Tilemaps.Tileset[]}
     * @since 3.50.0
     */
    this.gidMap = []

    /**
     * A temporary Vector2 used in the tile coordinate methods.
     *
     * @name Phaser.Tilemaps.TilemapLayer#tempVec
     * @type {Phaser.Math.Vector2}
     * @private
     * @since 3.60.0
     */
    this.tempVec = new Vector2()

    /**
     * The Tilemap Layer Collision Category.
     *
     * This is exclusively used by the Arcade Physics system.
     *
     * This can be set to any valid collision bitfield value.
     *
     * See the `setCollisionCategory` method for more details.
     *
     * @name Phaser.Tilemaps.TilemapLayer#collisionCategory
     * @type {number}
     * @since 3.70.0
     */
    this.collisionCategory = 0x0001

    /**
     * The Tilemap Layer Collision Mask.
     *
     * This is exclusively used by the Arcade Physics system.
     *
     * See the `setCollidesWith` method for more details.
     *
     * @name Phaser.Tilemaps.TilemapLayer#collisionMask
     * @type {number}
     * @since 3.70.0
     */
    this.collisionMask = 1

    /**
     * The horizontal origin of this Tilemap Layer.
     *
     * @name Phaser.Tilemaps.TilemapLayer#originX
     * @type {number}
     * @default 0
     * @readOnly
     * @since 3.0.0
     */

    /**
     * The vertical origin of this Tilemap Layer.
     *
     * @name Phaser.Tilemaps.TilemapLayer#originY
     * @type {number}
     * @default 0
     * @readOnly
     * @since 3.0.0
     */

    /**
     * The horizontal display origin of this Tilemap Layer.
     *
     * @name Phaser.Tilemaps.TilemapLayer#displayOriginX
     * @type {number}
     * @default 0
     * @readOnly
     * @since 3.0.0
     */

    /**
     * The vertical display origin of this Tilemap Layer.
     *
     * @name Phaser.Tilemaps.TilemapLayer#displayOriginY
     * @type {number}
     * @default 0
     * @readOnly
     * @since 3.0.0
     */

    this.setTilesets([tileset])
    // this.setAlpha(this.layer.alpha)
    // this.setPosition(x, y)
    // this.setOrigin(0, 0)
    // this.setSize(tilemap.tileWidth * this.layer.width, tilemap.tileHeight * this.layer.height)

    // this.initPipeline()
    // this.initPostPipeline(false)
  }

  tileToWorldXY(tileX: number, tileY: number, point: any, idk2: any) {
    return this.tilemap.tileToWorldXY(tileX, tileY, point, this)
  }

  setTilesets(tilesets: any[]) {
    var gidMap: any[] = []
    var setList: any[] = []
    var map = this.tilemap

    if (!Array.isArray(tilesets)) {
      tilesets = [tilesets]
    }

    for (var i = 0; i < tilesets.length; i++) {
      var tileset = tilesets[i]

      if (typeof tileset === 'string') {
        tileset = map.getTileset(tileset)
      }

      if (tileset) {
        setList.push(tileset)

        var s = tileset.firstgid

        for (var t = 0; t < tileset.total; t++) {
          gidMap[s + t] = tileset
        }
      }
    }

    this.gidMap = gidMap
    this.tileset = setList
  }

  setCollisionByProperty(properties, collides, recalculateFaces) {
    SetCollisionByProperty(properties, collides, recalculateFaces, this.layer)

    return this
  }
  // Rest of the class methods...
}
