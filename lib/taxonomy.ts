export const categorization = async (textFromArticle) => {
  try {
    const rawResponse = await fetch(
      "https://acro-helper.cyclic.app/api/categorization",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          document: {
            type: "PLAIN_TEXT",
            content: textFromArticle
          }
        })
      }
    )
    return await rawResponse.json()
  } catch (error) {
    console.log(error)
  }
}

export const isTechRelatedWebpage = async (categories: any[]) => {
  const allowedCategories = ["Computers", "Electronics", "Software", "Internet"]
  if (categories && categories.length > 0) {
    const enable = categories.filter((c) =>
      allowedCategories.some((a) => c.name.indexOf(a) > -1)
    )
    return enable.length > 0
  }
}
