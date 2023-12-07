import GetFastValue from '../../utils/object/GetFastValue'
import Tileset from '../Tileset.js'
import LayerData from './LayerData.js'

export default class MapData {
  name: string
  width: number
  height: number
  infinite: boolean
  tileWidth: number
  tileHeight: number
  widthInPixels: number
  heightInPixels: number
  format: number
  orientation: OrientationType
  renderOrder: string
  version: string
  properties: object
  layers: (LayerData[] | any)[]
  images: any[] // Define the correct type for images
  objects: any[]
  collision: object
  tilesets: Tileset[]
  imageCollections: any[] // Define the correct type for image collections
  tiles: any[] // Define the correct type for tiles
  hexSideLength: number
  staggerAxis: string
  staggerIndex: string

  constructor(config: any = {}) {
    this.name = GetFastValue(config, 'name', 'map')
    this.width = GetFastValue(config, 'width', 0)
    this.height = GetFastValue(config, 'height', 0)
    this.infinite = GetFastValue(config, 'infinite', false)
    this.tileWidth = GetFastValue(config, 'tileWidth', 0)
    this.tileHeight = GetFastValue(config, 'tileHeight', 0)
    this.widthInPixels = GetFastValue(config, 'widthInPixels', this.width * this.tileWidth)
    this.heightInPixels = GetFastValue(config, 'heightInPixels', this.height * this.tileHeight)
    this.format = GetFastValue(config, 'format', null)
    this.orientation = GetFastValue(config, 'orientation', 0)
    this.renderOrder = GetFastValue(config, 'renderOrder', 'right-down')
    this.version = GetFastValue(config, 'version', '1')
    this.properties = GetFastValue(config, 'properties', {})
    this.layers = GetFastValue(config, 'layers', [])
    this.images = GetFastValue(config, 'images', [])
    this.objects = Array.isArray(config.objects) ? config.objects : []
    this.collision = GetFastValue(config, 'collision', {})
    this.tilesets = GetFastValue(config, 'tilesets', [])
    this.imageCollections = GetFastValue(config, 'imageCollections', [])
    this.tiles = GetFastValue(config, 'tiles', [])
    this.hexSideLength = GetFastValue(config, 'hexSideLength', 0)
    this.staggerAxis = GetFastValue(config, 'staggerAxis', 'y')
    this.staggerIndex = GetFastValue(config, 'staggerIndex', 'odd')
  }
}
