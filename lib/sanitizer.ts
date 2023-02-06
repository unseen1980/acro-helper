export const sanitizer = (doc) => {
  const selector =
    "header, footer, nav, script, meta, head, link, a[id*=cookie i], a[class*=cookie i], button[id*=cookie i] , button[class*=cookie i] , div[id*=consent i], div[class*=sidebar i], div[class*=sidenav i]"
  const elements = doc.querySelectorAll(selector)
  for (const element of elements) {
    console.log("Removing element: ", element)
    element.remove()
  }
  return doc
}

export const removeTagByTagName = (doc, tagName) => {
  var ele = doc.getElementsByTagName(tagName)
  return ele[0].parentNode.removeChild(ele[0])
}
