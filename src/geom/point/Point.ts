/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import GEOM_CONST from '../const'

/**
 * @classdesc
 * Defines a Point in 2D space, with an x and y component.
 *
 * @class Point
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 */
export default class Point {
  /**
   * The geometry constant type of this object: `GEOM_CONST.POINT`.
   * Used for fast type comparisons.
   *
   * @name Phaser.Geom.Point#type
   * @type {number}
   * @readonly
   * @since 3.19.0
   */
  public readonly type: number = GEOM_CONST.POINT

  /**
   * The x coordinate of this Point.
   *
   * @name Phaser.Geom.Point#x
   * @type {number}
   * @default 0
   * @since 3.0.0
   */
  public x: number

  /**
   * The y coordinate of this Point.
   *
   * @name Phaser.Geom.Point#y
   * @type {number}
   * @default 0
   * @since 3.0.0
   */
  public y: number

  constructor(x: number = 0, y: number = x) {
    /**
     * The x coordinate of this Point.
     *
     * @name Phaser.Geom.Point#x
     * @type {number}
     * @default 0
     * @since 3.0.0
     */
    this.x = x

    /**
     * The y coordinate of this Point.
     *
     * @name Phaser.Geom.Point#y
     * @type {number}
     * @default 0
     * @since 3.0.0
     */
    this.y = y
  }

  /**
   * Set the x and y coordinates of the point to the given values.
   *
   * @method Phaser.Geom.Point#setTo
   * @since 3.0.0
   *
   * @param {number} [x=0] - The x coordinate of this Point.
   * @param {number} [y=x] - The y coordinate of this Point.
   *
   * @return {this} This Point object.
   */
  public setTo(x: number = 0, y: number = x): this {
    this.x = x
    this.y = y

    return this
  }
}
