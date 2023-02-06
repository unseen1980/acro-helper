import { getDefinitions } from "~lib/dictionary"
import { replacer } from "~lib/replacer"

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
    const definition = foundKey[key].definition
    console.log(`Found Key: ${key} with Definition: ${definition}`)
    replacer("body", key, definition)
  })
}
