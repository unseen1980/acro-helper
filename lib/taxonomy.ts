/**
Categorizes the given text using a third-party API.
@async
@function categorization
@param {string} textFromArticle - The text to be categorized.
@returns {Promise<Object>} A Promise that resolves to an object containing the categorization results.
@throws {Error} If an error occurs during the API call.
*/
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

/**
Determines whether a webpage is tech-related based on its categories
@async
@function
@param {any[]} categories - The categories of the webpage
@returns {Promise<boolean>} Whether the webpage is tech-related or not
*/
export const googleIsTechContent = async (categories: any[]) => {
  const allowedCategories = [
    "Computers",
    "Electronics",
    "Software",
    "Internet",
    "Computer Science",
    "Computer Education",
    "Computer & Video Games",
    "Computers & Electronics",
    "Technology News",
    "Engineering & Technology",
    "Technology"
  ]
  if (categories && categories.length > 0) {
    const enable = categories.filter((c) =>
      allowedCategories.some((a) => c.name.indexOf(a) > -1)
    )
    return enable.length > 0
  }
}
