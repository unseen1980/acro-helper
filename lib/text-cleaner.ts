/**
Trims white spaces and removes new lines from the given article text content
@param {HTMLElement} article - The article element to be trimmed
@returns {string} - The trimmed article text content
*/
// export const whiteSpaceTrimmer = (article) => {
//   const trimmedArticle =
//     article && article.textContent
//       ? article.textContent.trim().replace(/\s/g, " ").replace(/\n|\r/g, "")
//       : ""
//   return trimmedArticle
// }

export const whiteSpaceTrimmer = (article: string): string => {
  const trimmedArticle = article
    ? article.trim().replace(/\s/g, " ").replace(/\n|\r/g, "")
    : ""
  return trimmedArticle
}
