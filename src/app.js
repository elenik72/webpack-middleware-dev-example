import './styles/style.css'

const body = document.querySelector('body')
const insertTemplate = '<h1 class="headline">Hello world</h1>'

body.innerHTML = insertTemplate

if (module.hot) {
  module.hot.accept()
}
