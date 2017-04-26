
const fs = require('fs')
const path = require('path')
const tarball = require('tarball-extract')

const iconVersion = '3.0.1'
// link from github release website gets redirect to:
const iconUrl = 'https://codeload.github.com/google/material-design-icons/tar.gz/' + iconVersion

const createIcons = (root) => {
  // material design icon categories
  const categories = [
    'action',
    'alert',
    'av',
    'communication',
    'content',
    'device',
    'editor',
    'file',
    'hardware',
    'image',
    'maps',
    'navigation',
    'notification',
    'places',
    'social',
    'toggle'
  ]
  // generate icon component name from file name
  const iconName = (raw) => {
    const middle = raw.match(/ic_(.+)_(26x)?24px/)[1]
    const names = middle.split('_').map(name => name.charAt(0).toUpperCase() + name.slice(1))
    const name = names.join('')
    return name.match(/^[0-9]/) ? '_' + name : name
  }
  // temporarily store all components in array to be joined later when written to file
  let all = [
    'import React from \'react\'',
    `export const Button = (props) => (
  <button type='button' className='IconButton' {...props}>
    {props.children}
  </button>
)`,
    `export const Logo = (props) => (
  <svg width='68' height='61' viewBox='0 0 68 61' style={{maxWidth: '100%', maxHeight: '100%'}}>
    <polygon style={{fill: (props && props.fill) || '#fff'}} points='61.9 42.6 68 42.6 68 61 63.3 61 63.3 49.7 57.7 61 53.7 61 48.2 49.7 48.2 61 43.4 61 43.4 42.6 49.6 42.6 55.7 55.1 61.9 42.6 ' />
    <polygon style={{fill: (props && props.fill) || '#fff'}} points='0 61 0 42.6 4.7 42.6 4.7 49.9 13.9 49.9 13.9 42.6 18.7 42.6 18.7 61 13.9 61 13.9 53.7 4.7 53.7 4.7 61 0 61 ' />
    <path style={{fillRule: 'evenodd', clipRule: 'evenodd', fill: (props && props.fill) || '#fff'}} d='M0 0h68v40.4H0V0L0 0zM41.6 36.6c-1.8-2.6-2.9-5.8-2.9-9.2 0-8.9 7.2-16.1 16.1-16.1 3.1 0 6 0.9 8.5 2.4v-10H4.7v32.9L41.6 36.6 41.6 36.6zM43.4 27.4c0-6.3 5.1-11.3 11.3-11.3s11.3 5.1 11.3 11.3c0 6.3-5.1 11.3-11.3 11.3S43.4 33.7 43.4 27.4L43.4 27.4z' />
    <path style={{fill: (props && props.fill) || '#fff'}} d='M38.1 51.1c1.1-0.7 2.3-1.7 2.3-4s-1.4-4-3.7-4.5H22V61h13.9c2.9 0 5.2-2.3 5.2-5.2C41.1 53.8 39.9 51.8 38.1 51.1zM26.1 46.1l7.6 0c1 0 1.6 0.8 1.6 1.8 0 1-0.6 1.8-1.6 1.8h-7.6V46.1zM33.3 57.5h-7.2V53h7.2c1.7-0.1 2.8 0.6 2.8 2.1C36.1 56.5 34.9 57.5 33.3 57.5z' />
  </svg>
)`
  ]
  // read icon content, generate name, create component string and push into array
  categories.forEach(c => {
    const pathCategory = path.join(root, c, 'svg', 'production')
    const icons = fs.readdirSync(pathCategory).filter(icon => icon.indexOf('24px') !== -1)
    const components = icons.map(icon => {
      const pathIcon = path.join(pathCategory, icon)
      let content = fs.readFileSync(pathIcon, 'utf8')
      // remove unnecessary xmlns attribute and add spreaded props
      content = content.replace(' xmlns="http://www.w3.org/2000/svg"', '').replace(/>/, ' {...props}>')
      // fix react fill-opacity -> fillOpacity
      content = content.replace('fill-opacity', 'fillOpacity')
      const name = iconName(icon)
      return (
  `export const ${name} = (props) => (
  ${content}
)`
      )
    })
    // add components from category to all array
    all = [...all, ...components]
  })
  // save array to file
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'js', 'icon', 'index.js'), all.join('\n\n'))
}

const iconPath = '/tmp/material-icons/material-design-icons-' + iconVersion

if (fs.existsSync(iconPath)) {
  console.log('reusing existing icon download')
  createIcons(iconPath)
} else {
  console.log('downloading and extracting icons')
  tarball.extractTarballDownload(iconUrl, '/tmp/material-icons.tar.gz', '/tmp/material-icons', {}, function (err, result) {
    if (err) {
      console.error('download failed', result)
      process.exit(1)
    }
    console.log('download finished', result)
    createIcons(iconPath)
  })
}
