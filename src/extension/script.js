import './script.css'

const wrapper = document.createElement('div')
const block = document.createElement('div')
// const h1 = document.createElement('h1')

console.log('inject!')

wrapper.classList = 'notifycationWrapper'
block.classList = 'notifycationBlock'

wrapper.appendChild(block)
document.body.prepend(wrapper)
