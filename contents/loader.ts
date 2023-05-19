import { Article } from "newspaperjs"
import type { PlasmoContentScript } from "plasmo"

import { getDictionaryKeys } from "~lib/dictionary"
import { chatgpt, chatgptIsTechContent, keyFinder } from "~lib/key-finder"
import { categorization, googleIsTechContent } from "~lib/taxonomy"
import { whiteSpaceTrimmer } from "~lib/text-cleaner"

export const config: PlasmoContentScript = {
  exclude_matches: ["*://*/*google*"]
}

export const splitTextIntoChunks = (text, chunkSize) => {
  const words = text.split(/\s+/)
  const chunks = []

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(" ")
    chunks.push(chunk)
  }

  return chunks
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
  // Start the timer
  const start = performance.now()

  let article = await Article(document.URL)

  if (article && article.text) {
    article = article.text
  }

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
    // End the timer
    const endDictionary = performance.now()

    // Compute the duration in milliseconds
    const durationDictionary = endDictionary - start

    console.log(`Execution time dictionary: ${durationDictionary} milliseconds`)

    const textChunks = splitTextIntoChunks(textFromArticle, 1000)
    const promises = textChunks.map((chunk) => chatgpt(chunk))

    Promise.all(promises)
      .then(() => {
        console.log("All content from ChatGPT fetched")
        console.log("Tooltips appended.")
        const endGPT = performance.now()

        // Compute the duration in milliseconds
        const durationGPT = endGPT - start

        console.log(`Execution time GPT: ${durationGPT} milliseconds`)
      })
      .catch((error) => {
        console.error("Error fetching content from ChatGPT", error)
      })
  } else {
    console.log(
      "This is not a technology related webpage. Thanks for using Acro Helper."
    )
  }
})
