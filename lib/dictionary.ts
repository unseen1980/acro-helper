export const getDictionaryKeys = async () => {
  let keys
  await fetch("https://acro-helper.cyclic.app/api/keys")
    .then((response) => response.json())
    .then((json) => {
      keys = json
    })

  return keys
}

export const getDictionary = async () => {
  let data
  await fetch("https://acro-helper.cyclic.app/api/dictionary")
    .then((response) => response.json())
    .then((json) => {
      data = json
    })

  return data
}

// This functionality will be moved to API
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
