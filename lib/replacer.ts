/**
Replaces all occurrences of a string in the HTML content of a given selector with a definition and wraps it in a <dfn> element with an <abbr> title attribute.
@param {string} selector - The CSS selector of the element to modify.
@param {string} string - The string to search for and replace.
@param {string} definition - The definition to use for the <abbr> title attribute.
@returns {void}
*/
export const replacer = (selector, string, definition) => {
  let dom = document.querySelector(selector)
  let str = dom.innerHTML //A
  let esc = `(?!(?:[^<]+>|[^>]+<\\/a>))\\b(${string})\\b` //B
  let rgx = new RegExp(esc, "gi") //C
  let txt = str.replace(rgx, `<dfn><abbr title="${definition}">$1</abbr></dfn>`) //D
  dom.replaceChildren() //E
  dom.insertAdjacentHTML("beforeend", txt) //F
}

/**
Finds text that matches a pattern within an HTML element and executes a callback function for each match.
@function
@param {HTMLElement} element - The HTML element to search for text matches.
@param {RegExp} pattern - The regular expression pattern to match against the text.
@param {Function} callback - The function to execute for each match. The function takes two arguments: the matched text node and the match object.
@returns {void}
*/
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
