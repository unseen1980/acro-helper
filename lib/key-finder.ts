import { getDefinitions } from "~lib/dictionary"
import { replacer } from "~lib/replacer"

let foundKeysInDictionary = []

/**
Finds the given keys in the body of the HTML document and replaces them with their definitions.
@async
@function keyFinder
@param {Array<string>} dictionaryKeys - An array of strings representing the keys to search for in the document.
@returns {Promise<void>} A promise that resolves when all keys have been found and replaced with their definitions.
*/
export const keyFinder = async (dictionaryKeys) => {
  let foundKeys = []
  dictionaryKeys.forEach((key) => {
    const wordSearch = new RegExp(`\\b${key}\\b`, "gi")
    // Use the regular expression to test the content:
    const hasWord = document.body.innerText.match(wordSearch)
    if (hasWord) {
      foundKeys.push(key)
    }
  })

  const foundKeysWtihDefinitions = await getDefinitions(foundKeys)
  foundKeysWtihDefinitions.forEach((foundKey) => {
    const key = Object.keys(foundKey)[0]
    foundKeysInDictionary.push(key.toLowerCase().trim())
    const definition = foundKey[key].definition
    console.log(`Dictionary findings: ${key} - ${definition}`)
    replacer("body", key, definition)
  })
}

/**
Uses GPT to generate definitions and descriptions for acronyms found in provided text, then replaces them in the body of the article.
@async
@function chatgpt
@param {string} textFromArticle - Text from the article containing acronyms to define
@returns {void}
*/
export const chatgpt = async (textFromArticle) => {
  try {
    const rawResponse = await fetch(
      "https://acro-helper.cyclic.app/api/chatgpt",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        //@ts-ignore
        body: JSON.stringify({
          text: textFromArticle
        })
      }
    )

    const findings = await rawResponse.json()
    console.log("GPT findings: ", findings)

    findings.response.forEach((f) => {
      if (!foundKeysInDictionary.includes(f.acronym.toLowerCase().trim())) {
        replacer("body", f.acronym, `${f.definition} - ${f.description}`)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
