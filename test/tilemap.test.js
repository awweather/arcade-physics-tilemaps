const { ArcadePhysics } = require('../lib/index.js')
const { ParseToTilemap } = require('../lib/tilemaps/index.js')
const data = require('./testTilemap.json')

const map = ParseToTilemap(data, 'prison')
const layers = []
map.layers.forEach((layer, index) => {
  layers.push(map.createLayer(index, '', 0, 0).setCollisionByProperty({ collides: true }))
})

const config = {
  gravity: {
    x: 0,
    y: 0
  },
  width: 800,
  height: 600
}

const physics = new ArcadePhysics(config)

const ball1 = physics.add.body(569, 539)

ball1.setCircle(46)

ball1.setCollideWorldBounds(true)

let collided = false
layers.forEach(lay => {
  physics.add.collider(ball1, lay, (body1, body2) => {
    collided = true
  })
})

ball1.setVelocity(-150)

let tick = 0

const update = () => {
  tick++
  physics.world.update(tick * 1000, 1000 / 60)
  physics.world.postUpdate(tick * 1000, 1000 / 60)
}

test('x and y coordinates get blocked', () => {
  while (tick < 5000 && !collided) {
    update()
  }

  // Expect that once collided, -X progress is not possible
  update()
  expect(ball1.x).toBe(352)

  // Reset collided, now walk upwards
  ball1.setVelocityY(-120)
  collided = false

  while (tick < 10000 && !collided) {
    update()
  }

  // Collides at 448
  expect(ball1.y).toBe(448)

  // Try and continue movement
  ball1.setVelocityY(-120)
  update()

  // Movement is blocked
  expect(ball1.y).toBe(448)
})
