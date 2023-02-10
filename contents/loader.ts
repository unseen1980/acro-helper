import type { PlasmoContentScript } from "plasmo"

import { getDictionaryKeys } from "~lib/dictionary"
import { chatgpt, keyFinder } from "~lib/key-finder"
import { readabilityParser } from "~lib/readability"
import { sanitizer } from "~lib/sanitizer"
import { categorization } from "~lib/taxonomy"
import { whiteSpaceTrimmer } from "~lib/text-cleaner"

// export const config: PlasmoContentScript = {
//   matches: ["https://rsvt.pages.dev/*"]
// }

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

  const category = await categorization(textFromArticle)
  console.log("Google Taxonomy: ", category)

  //Temp disable to test ChatGPT API
  // const dictionaryKeys = await getDictionaryKeys()
  // console.log("Dictionary keys", dictionaryKeys)

  // await keyFinder(dictionaryKeys)

  await chatgpt(textFromArticle)

  console.log("Tooltips appended.")
})
