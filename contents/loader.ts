import type { PlasmoContentScript } from "plasmo"

import { getDictionaryKeys } from "~lib/dictionary"
import { chatgpt, chatgptIsTechContent, keyFinder } from "~lib/key-finder"
import { readabilityParser } from "~lib/readability"
import { sanitizer } from "~lib/sanitizer"
import { categorization, googleIsTechContent } from "~lib/taxonomy"
import { whiteSpaceTrimmer } from "~lib/text-cleaner"

export const config: PlasmoContentScript = {
  // matches: ["https://rsvt.pages.dev/*"]
  exclude_matches: ["*://*/*google*"]
}

const css = `
.acro-helper {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }

  .acro-helper .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    font-size: 12px;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .acro-helper:hover .tooltiptext {
    visibility: visible;
  }

  abbr {
    text-decoration-color: royalblue;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    cursor: help;
  }
`,
  head = document.head || document.getElementsByTagName("head")[0],
  style = document.createElement("style")

head.appendChild(style)
style.appendChild(document.createTextNode(css))

window.addEventListener("load", async () => {
  const documentCopy = sanitizer(document.cloneNode(true))
  console.log("Clean copy of document: ", documentCopy)

  let article = readabilityParser(documentCopy)
  console.log("Readability article: ", article)

  const textFromArticle = whiteSpaceTrimmer(article)
  console.log("Text extraction: ", textFromArticle)

  const categories = await categorization(textFromArticle)
  if (categories.response.categories)
    console.log("Google Taxonomy: ", categories.response.categories)

  const enableExtensionReplacements =
    (await googleIsTechContent(categories.response.categories)) ||
    (await chatgptIsTechContent(textFromArticle))

  if (enableExtensionReplacements)
    console.log("Enable extension replacements: ", enableExtensionReplacements)

  if (enableExtensionReplacements) {
    const dictionaryKeys = await getDictionaryKeys()
    console.log("Dictionary keys", dictionaryKeys)

    await keyFinder(dictionaryKeys)

    await chatgpt(textFromArticle)

    console.log("Tooltips appended.")
  } else {
    console.log(
      "This is not a technology related webpage. Thanks for using Acro Helper."
    )
  }
})
