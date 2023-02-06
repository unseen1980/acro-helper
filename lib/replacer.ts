export const replacer = (selector, string, definition) => {
  let dom = document.querySelector(selector)
  let str = dom.innerHTML //A
  let esc = `(?!(?:[^<]+>|[^>]+<\\/a>))\\b(${string})\\b` //B
  let rgx = new RegExp(esc, "gi") //C
  let txt = str.replace(
    rgx,
    // `<div class='acro-helper'>$1<span class="tooltiptext">${definition}</span></div>`
    `<div class='acro-helper' title="${definition}">$1</div>`
  ) //D
  dom.replaceChildren() //E
  dom.insertAdjacentHTML("beforeend", txt) //F
}

// Find text in descendents of an element, in reverse document order
// pattern must be a regexp with global flag
//
export const findText = (element, pattern, callback) => {
  for (let childi = element.childNodes.length; childi-- > 0; ) {
    let child = element.childNodes[childi]
    if (child.nodeType == 1) {
      findText(child, pattern, callback)
    } else if (child.nodeType == 3) {
      let matches = []
      let match: any
      while ((match = pattern.exec(child.data))) matches.push(match)
      for (let i = matches.length; i-- > 0; )
        callback.call(window, child, matches[i])
    }
  }
}
