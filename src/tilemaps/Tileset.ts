import { Vector2 } from '../math/Vector2'

export default class Tileset {
  public name: string
  public firstgid: number
  public tileWidth: number
  public tileHeight: number
  public tileMargin: number
  public tileSpacing: number
  public tileProperties: Record<number, any>
  public tileData: Record<number, any>
  public tileOffset: Vector2
  public image: any | null
  public glTexture: WebGLTexture | null
  public rows: number
  public columns: number
  public total: number
  public texCoordinates: { x: number; y: number }[]

  constructor(
    name: string,
    firstgid: number,
    tileWidth: number = 32,
    tileHeight: number = 32,
    tileMargin: number = 0,
    tileSpacing: number = 0,
    tileProperties: Record<number, any> = {},
    tileData: Record<number, any> = {},
    tileOffset: Vector2 = new Vector2()
  ) {
    if (tileWidth === undefined || tileWidth <= 0) {
      tileWidth = 32
    }
    if (tileHeight === undefined || tileHeight <= 0) {
      tileHeight = 32
    }
    if (tileMargin === undefined) {
      tileMargin = 0
    }
    if (tileSpacing === undefined) {
      tileSpacing = 0
    }
    if (tileProperties === undefined) {
      tileProperties = {}
    }
    if (tileData === undefined) {
      tileData = {}
    }

    this.name = name
    this.firstgid = firstgid
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.tileMargin = tileMargin
    this.tileSpacing = tileSpacing
    this.tileProperties = tileProperties
    this.tileData = tileData
    this.tileOffset = tileOffset
    this.image = null
    this.glTexture = null
    this.rows = 0
    this.columns = 0
    this.total = 0
    this.texCoordinates = []

    if (tileOffset !== undefined) {
      this.tileOffset.set(tileOffset.x, tileOffset.y)
    }
  }

  getTileProperties(tileIndex: number): any | null {
    if (!this.containsTileIndex(tileIndex)) {
      return null
    }

    return this.tileProperties[tileIndex - this.firstgid]
  }

  getTileData(tileIndex: number): any | null {
    if (!this.containsTileIndex(tileIndex)) {
      return null
    }

    return this.tileData[tileIndex - this.firstgid]
  }

  getTileCollisionGroup(tileIndex: number): any | null {
    const data = this.getTileData(tileIndex)

    return data && data.objectgroup ? data.objectgroup : null
  }

  containsTileIndex(tileIndex: number): boolean {
    return tileIndex >= this.firstgid && tileIndex < this.firstgid + this.total
  }

  getTileTextureCoordinates(tileIndex: number): { x: number; y: number } | null {
    if (!this.containsTileIndex(tileIndex)) {
      return null
    }

    return this.texCoordinates[tileIndex - this.firstgid]
  }

  setImage(texture: any): this {
    this.image = texture
    this.glTexture = texture.getSource()[0].glTexture
    this.updateTileData(this.image.getSource()[0].width, this.image.getSource()[0].height)

    return this
  }

  setTileSize(tileWidth?: number, tileHeight?: number): this {
    if (tileWidth !== undefined) {
      this.tileWidth = tileWidth
    }
    if (tileHeight !== undefined) {
      this.tileHeight = tileHeight
    }

    if (this.image) {
      this.updateTileData(this.image.getSource()[0].width, this.image.getSource()[0].height)
    }

    return this
  }

  setSpacing(tileMargin?: number, tileSpacing?: number): this {
    if (tileMargin !== undefined) {
      this.tileMargin = tileMargin
    }
    if (tileSpacing !== undefined) {
      this.tileSpacing = tileSpacing
    }

    if (this.image) {
      this.updateTileData(this.image.getSource()[0].width, this.image.getSource()[0].height)
    }

    return this
  }

  updateTileData(imageWidth: number, imageHeight: number): this {
    let rowCount = (imageHeight - this.tileMargin * 2 + this.tileSpacing) / (this.tileHeight + this.tileSpacing)
    let colCount = (imageWidth - this.tileMargin * 2 + this.tileSpacing) / (this.tileWidth + this.tileSpacing)

    if (rowCount % 1 !== 0 || colCount % 1 !== 0) {
      console.warn(`Image tile area not tile size multiple in: ${this.name}`)
    }

    rowCount = Math.floor(rowCount)
    colCount = Math.floor(colCount)

    this.rows = rowCount
    this.columns = colCount
    this.total = rowCount * colCount
    this.texCoordinates.length = 0

    let tx = this.tileMargin
    let ty = this.tileMargin

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        this.texCoordinates.push({ x: tx, y: ty })
        tx += this.tileWidth + this.tileSpacing
      }

      tx = this.tileMargin
      ty += this.tileHeight + this.tileSpacing
    }

    return this
  }
}
