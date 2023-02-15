/**
A function that sanitizes a given document by removing specific elements.
@param {Document} doc - The document to be sanitized.
@returns {Document} The sanitized document.
*/
export const sanitizer = (doc) => {
  const selector =
    "header, footer, nav, script, meta, head, link, a[id*=cookie i], a[class*=cookie i], button[id*=cookie i] , button[class*=cookie i] , div[id*=consent i], div[class*=sidebar i], div[class*=sidenav i], div[class*=ad-block i], div[class*=adblock i]"
  const elements = doc.querySelectorAll(selector)
  for (const element of elements) {
    console.log("Removing element: ", element)
    element.remove()
  }
  return doc
}

/**
Removes the first instance of a specified tag name from a given document.
@param {Document} doc - The document from which to remove the tag.
@param {string} tagName - The name of the tag to remove.
@returns {Node} - The removed tag.
*/
export const removeTagByTagName = (doc, tagName) => {
  var ele = doc.getElementsByTagName(tagName)
  return ele[0].parentNode.removeChild(ele[0])
}
