export const whiteSpaceTrimmer = (article) => {
  const trimmedArticle =
    article && article.textContent
      ? article.textContent.trim().replace(/\s/g, " ").replace(/\n|\r/g, "")
      : ""
  return trimmedArticle
}
