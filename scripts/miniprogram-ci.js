const path = require('path')
const fs = require('fs')

const getPurePath = resource => {
  const extname = path.extname(resource)
  const extIndex = resource.indexOf(extname)
  return resource.slice(0, extIndex)
}

const fillSlash = resource => {
  if (resource[0] !== '/') {
    resource = '/' + resource
  }
  return resource
}

class CheckPagesAndComponents {
  constructor () {
    this.miniprogramProjectConfig = this.getMiniprogramProjectConfig()
    this.appConfig = this.getAppConfig()
    this.subPackageRoots = this.appConfig.subPackages.map(item => item.root)

    this.pages = this.getPages().map(item => fillSlash(item))
    this.components = this.getComponents(this.pages).map(item => fillSlash(item))
    
    const pagesResources = this.getResourcesInProject('pages').map(item => getPurePath(item)).map(item => fillSlash(item))
    const subpackageResources = this.subPackageRoots.map(root => {
      return this.getResourcesInProject(root).map(item => getPurePath(item)).map(item => fillSlash(item))
    }).toString().split(',')
    this.pagesResources = [].concat(pagesResources).concat(subpackageResources)

    this.componentResources = this.getResourcesInProject('components').map(item => getPurePath(item)).map(item => fillSlash(item))
    
    this.unlessedResources = this.filterUnlessResources()
    console.warn(this.unlessedResources)
  }

  getMiniprogramProjectConfig () {
    let config = null
  
    try {
      config = JSON.parse(fs.readFileSync('./mini.project.json', 'utf8'))
    } catch (e) {
      console.error('[ci error]: parse mini.project.json error, ', e)
    }

    return config
  }

  getAppConfig () {
    let appConfig = null
  
    try {
      appConfig = JSON.parse(fs.readFileSync('./app.json', 'utf8'))
    } catch (e) {
      console.error('[ci error]: parse app.json error, ', e)
    }

    return appConfig
  }

  getPages () {
    const appConfig = this.appConfig
    let pages = []
  
    pages = pages.concat(appConfig.pages)
  
    if (Array.isArray(appConfig.subPackages)) {
      appConfig.subPackages.forEach(subpackage => {
        const subpackagePages = subpackage.pages.map(page => path.join(subpackage.root, page))
        pages = pages.concat(subpackagePages)
      })
    }
  
    return pages
  }

  getComponents (arr) {
    let components = []
  
    arr.forEach(item => {
      const _item = item[0] === '/' ? item.slice(1) : item
      const jsonPath = path.resolve(this.miniprogramProjectConfig.miniprogramRoot, `${_item}.json`)
      const usingComponents = JSON.parse(fs.readFileSync(jsonPath, 'utf8')).usingComponents
      if (usingComponents) {
        const componentValues = Object.values(usingComponents)
        components = components.concat(componentValues)
        components = components.concat(this.getComponents(componentValues))
      }
    })

    return components
  }

  getResourcesInProject (dirname) {
    let resources = []
    const root = path.relative(this.miniprogramProjectConfig.miniprogramRoot, dirname)
    const files = fs.readdirSync(root)
    files.forEach(file => {
      const _path = path.join(root, file)
      if (fs.statSync(_path).isDirectory()) {
        resources = resources.concat(this.getResourcesInProject(_path))
      } else {
        if (path.extname(_path) === '.json') {
          resources = resources.concat(_path)
        }
      }
    })
    return resources
  }

  filterUnlessResources () {
    const unlessedPages = []

    this.pagesResources.forEach(page => {
      if (this.pages.indexOf(page) === -1) {
        unlessedPages.push(page)
      }
    })

    const unlessedComponents = []

    this.componentResources.forEach(component => {
      if (this.components.indexOf(component) === -1) {
        unlessedComponents.push(component)
      }
    })

    return {
      unlessedPages,
      unlessedComponents
    }
  }
}

new CheckPagesAndComponents()

