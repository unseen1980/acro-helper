import { Readability } from "@mozilla/readability"

/**
Returns an object containing the readability object of a given document.
@param {Document} doc - The document to analyze.
@returns {Object} - An object containing the readability scores of the document.
*/
export const readabilityParser = (doc) => {
  const article = new Readability(doc).parse()
  return article
}
