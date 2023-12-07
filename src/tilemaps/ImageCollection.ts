/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2013-2023 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @classdesc
 * An Image Collection is a special Tile Set containing multiple images, with no slicing into each image.
 *
 * Image Collections are normally created automatically when Tiled data is loaded.
 *
 * @class ImageCollection
 * @memberof Phaser.Tilemaps
 * @constructor
 * @since 3.0.0
 *
 * @param {string} name - The name of the image collection in the map data.
 * @param {number} firstgid - The first image index this image collection contains.
 * @param {number} [width=32] - Width of widest image (in pixels).
 * @param {number} [height=32] - Height of tallest image (in pixels).
 * @param {number} [margin=0] - The margin around all images in the collection (in pixels).
 * @param {number} [spacing=0] - The spacing between each image in the collection (in pixels).
 * @param {object} [properties={}] - Custom Image Collection properties.
 */
class ImageCollection {
  /**
   * The name of the Image Collection.
   *
   * @name Phaser.Tilemaps.ImageCollection#name
   * @type {string}
   * @since 3.0.0
   */
  public name: string

  /**
   * The Tiled firstgid value.
   * This is the starting index of the first image index this Image Collection contains.
   *
   * @name Phaser.Tilemaps.ImageCollection#firstgid
   * @type {number}
   * @since 3.0.0
   */
  public firstgid: number

  /**
   * The width of the widest image (in pixels).
   *
   * @name Phaser.Tilemaps.ImageCollection#imageWidth
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  public imageWidth: number

  /**
   * The height of the tallest image (in pixels).
   *
   * @name Phaser.Tilemaps.ImageCollection#imageHeight
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  public imageHeight: number

  /**
   * The margin around the images in the collection (in pixels).
   * Use `setSpacing` to change.
   *
   * @name Phaser.Tilemaps.ImageCollection#imageMargin
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  public imageMargin: number

  /**
   * The spacing between each image in the collection (in pixels).
   * Use `setSpacing` to change.
   *
   * @name Phaser.Tilemaps.ImageCollection#imageSpacing
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  public imageSpacing: number

  /**
   * Image Collection-specific properties that are typically defined in the Tiled editor.
   *
   * @name Phaser.Tilemaps.ImageCollection#properties
   * @type {object}
   * @since 3.0.0
   */
  public properties: object

  /**
   * The cached images that are a part of this collection.
   *
   * @name Phaser.Tilemaps.ImageCollection#images
   * @type {array}
   * @readonly
   * @since 3.0.0
   */
  public images: { gid: number; image: string }[]

  /**
   * The total number of images in the image collection.
   *
   * @name Phaser.Tilemaps.ImageCollection#total
   * @type {number}
   * @readonly
   * @since 3.0.0
   */
  public total: number
  public maxId: number = 0

  constructor(
    name: string,
    firstgid: number,
    width: number = 32,
    height: number = 32,
    margin: number = 0,
    spacing: number = 0,
    properties: object = {}
  ) {
    if (width === undefined || width <= 0) {
      width = 32
    }
    if (height === undefined || height <= 0) {
      height = 32
    }
    if (margin === undefined) {
      margin = 0
    }
    if (spacing === undefined) {
      spacing = 0
    }

    this.name = name
    this.firstgid = firstgid | 0
    this.imageWidth = width | 0
    this.imageHeight = height | 0
    this.imageMargin = margin | 0
    this.imageSpacing = spacing | 0
    this.properties = properties || {}
    this.images = []
    this.total = 0
  }

  /**
   * Returns true if and only if this image collection contains the given image index.
   *
   * @method Phaser.Tilemaps.ImageCollection#containsImageIndex
   * @since 3.0.0
   *
   * @param {number} imageIndex - The image index to search for.
   *
   * @return {boolean} True if this Image Collection contains the given index.
   */
  public containsImageIndex(imageIndex: number): boolean {
    return imageIndex >= this.firstgid && imageIndex < this.firstgid + this.total
  }

  /**
   * Add an image to this Image Collection.
   *
   * @method Phaser.Tilemaps.ImageCollection#addImage
   * @since 3.0.0
   *
   * @param {number} gid - The gid of the image in the Image Collection.
   * @param {string} image - The the key of the image in the Image Collection and in the cache.
   *
   * @return {Phaser.Tilemaps.ImageCollection} This ImageCollection object.
   */
  public addImage(gid: number, image: string): ImageCollection {
    this.images.push({ gid, image })
    this.total++

    return this
  }
}

export default ImageCollection
