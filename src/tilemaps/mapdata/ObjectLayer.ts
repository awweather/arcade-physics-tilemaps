import GetFastValue from '../../utils/object/GetFastValue'

export default class ObjectLayer {
  name: string
  opacity: number
  properties: object
  propertyTypes: object
  type: string
  visible: boolean
  objects: any[]

  constructor(config: any = {}) {
    this.name = GetFastValue(config, 'name', 'object layer')
    this.opacity = GetFastValue(config, 'opacity', 1)
    this.properties = GetFastValue(config, 'properties', {})
    this.propertyTypes = GetFastValue(config, 'propertytypes', {})
    this.type = GetFastValue(config, 'type', 'objectgroup')
    this.visible = GetFastValue(config, 'visible', true)
    this.objects = GetFastValue(config, 'objects', [])

    if (!Array.isArray(this.objects)) {
      this.objects = []
    }
  }
}

// Additional export or module.exports might be needed, depending on your project setup.
