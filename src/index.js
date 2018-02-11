const {parse, toScrapbox} = require('@jigsaw/html2sb-compiler')
let target

const selector = document.createElement('div')
selector.classList.add('html2sb-chrome-selector')
document.body.appendChild(selector)

const onOver = event => {
  const rect = event.target.getBoundingClientRect()
  target = event.target
  selector.style.top = `${rect.top}px`
  selector.style.left = `${rect.left}px`
  selector.style.width = `${rect.width}px`
  selector.style.height = `${rect.height}px`
}

const onClick = () => {
  const parsed = toScrapbox(parse(target.innerHTML)[0])
  const tmp = document.createElement('textarea')
  tmp.value = parsed.lines.join('\n')
  tmp.style.position = 'fixed'
  tmp.style.top = '-100%'
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  document.body.removeChild(tmp)
  document.removeEventListener('click', onClick)
  for (const dom of document.body.querySelectorAll('*')) {
    dom.removeEventListener('mouseover', onOver)
  }
  document.body.removeChild(selector)
}

for (const dom of document.body.querySelectorAll('*')) {
  dom.addEventListener('mouseover', onOver)
}

document.addEventListener('click', onClick)
