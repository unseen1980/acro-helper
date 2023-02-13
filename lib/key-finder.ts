import { getDefinitions } from "~lib/dictionary"
import { replacer } from "~lib/replacer"

let foundKeysInDictionary = []

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
