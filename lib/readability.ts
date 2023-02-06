import { Readability } from "@mozilla/readability"

export const readabilityParser = (doc) => {
  const article = new Readability(doc).parse()
  return article
}
