/**
Retrieves the keys of a dictionary from the Acro-Helper API.
@async
@function
@returns {Promise<Array>} An array of keys from the dictionary.
*/
export const getDictionaryKeys = async () => {
  let keys
  await fetch("https://acro-helper.cyclic.app/api/keys")
    .then((response) => response.json())
    .then((json) => {
      keys = json
    })

  return keys
}

/**
Fetches the dictionary data from the acro-helper API
@async
@function
@returns {Promise} Promise object represents the dictionary data
*/
export const getDictionary = async () => {
  let data
  await fetch("https://acro-helper.cyclic.app/api/dictionary")
    .then((response) => response.json())
    .then((json) => {
      data = json
    })

  return data
}

/**
Retrieves definitions for specified keys from an API.
@async
@function
@param {string[]} keys - The keys for which to retrieve definitions.
@returns {Promise<object[]>} - A promise that resolves with an array of objects representing the definitions.
*/
export const getDefinitions = async (keys) => {
  let data = []
  await fetch("https://acro-helper.cyclic.app/api/dictionary")
    .then((response) => response.json())
    .then((json) => {
      keys.forEach((key) => {
        json.forEach((obj) => {
          if (Object.keys(obj).includes(key)) {
            data.push(obj)
            return obj
          }
        })
      })
    })

  return data
}
