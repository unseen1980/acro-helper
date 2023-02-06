export const categorization = async (textFromArticle) => {
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
}
