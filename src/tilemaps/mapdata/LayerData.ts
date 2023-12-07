import GetFastValue from '../../utils/object/GetFastValue.js'
import TilemapLayer from '../TilemapLayer.js'
import CONST from '../const/index.js'

export default class LayerData {
  name: string
  x: number
  y: number
  width: number
  height: number
  tileWidth: number
  tileHeight: number
  baseTileWidth: number
  baseTileHeight: number
  orientation: any
  widthInPixels: number
  heightInPixels: number
  alpha: number
  visible: boolean
  properties: object[]
  indexes: number[]
  collideIndexes: number[]
  callbacks: any[] // Adjust the type as needed
  bodies: any[] // Adjust the type as needed
  data: any[][] // Adjust if you have a different Tile class
  tilemapLayer: TilemapLayer // Adjust if needed
  hexSideLength: number

  constructor(config: any = {}) {
    this.name = GetFastValue(config, 'name', 'layer')
    this.x = GetFastValue(config, 'x', 0)
    this.y = GetFastValue(config, 'y', 0)
    this.width = GetFastValue(config, 'width', 0)
    this.height = GetFastValue(config, 'height', 0)
    this.tileWidth = GetFastValue(config, 'tileWidth', 0)
    this.tileHeight = GetFastValue(config, 'tileHeight', 0)
    this.baseTileWidth = GetFastValue(config, 'baseTileWidth', this.tileWidth)
    this.baseTileHeight = GetFastValue(config, 'baseTileHeight', this.tileHeight)
    this.orientation = GetFastValue(config, 'orientation', CONST.ORTHOGONAL)
    this.widthInPixels = GetFastValue(config, 'widthInPixels', this.width * this.baseTileWidth)
    this.heightInPixels = GetFastValue(config, 'heightInPixels', this.height * this.baseTileHeight)
    this.alpha = GetFastValue(config, 'alpha', 1)
    this.visible = GetFastValue(config, 'visible', true)
    this.properties = GetFastValue(config, 'properties', [])
    this.indexes = GetFastValue(config, 'indexes', [])
    this.collideIndexes = GetFastValue(config, 'collideIndexes', [])
    this.callbacks = GetFastValue(config, 'callbacks', [])
    this.bodies = GetFastValue(config, 'bodies', [])
    this.data = GetFastValue(config, 'data', [])
    this.tilemapLayer = GetFastValue(config, 'tilemapLayer', null)
    this.hexSideLength = GetFastValue(config, 'hexSideLength', 0)
  }
}
