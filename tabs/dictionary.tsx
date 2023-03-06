import React, { useEffect, useState } from "react"

import { getDictionary } from "../lib/dictionary"

export default function DictionaryPage(props) {
  const [dictionary, setDictionary] = useState([])
  const [originalDictionary, setOriginalDictionary] = useState([])
  const [input, setInput] = useState(props?.value ?? "")

  useEffect(() => {
    getDictionary().then((data) => {
      setDictionary(data)
      setOriginalDictionary(data)
    })
  }, [])

  useEffect(() => {
    if (input === "") {
      setDictionary(originalDictionary)
    } else {
      const tempDictionary = dictionary
      setDictionary(
        tempDictionary.filter((t) =>
          Object.keys(t)[0].toLowerCase().includes(input.toLowerCase())
        )
      )
    }
  }, [input])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <div
        style={{
          position: "sticky",
          top: "0"
        }}>
        <h2 style={{ fontSize: "24px", textAlign: "center" }}>
          Acro Helper Dictionary
        </h2>

        <input
          type="text"
          placeholder="Search acronyms or abbreviations"
          style={{
            fontSize: "16px",
            padding: "12px 20px 12px 20px",
            border: "1px solid #ddd",
            marginBottom: "40px",
            boxSizing: "border-box",
            width: "100%"
          }}
          onInput={(val) => {
            setInput(val.target.value)
          }}></input>
      </div>

      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0
        }}>
        {dictionary.length > 0 &&
          dictionary.map((d, idx) => {
            return (
              <li key={idx}>
                <a
                  href="#"
                  style={{
                    border: "1px solid #ddd",
                    marginTop: "-1px",
                    backgroundColor: "#f6f6f6",
                    padding: "12px",
                    textDecoration: "none",
                    fontSize: "18px",
                    color: "black",
                    display: "block"
                  }}>
                  <strong>{Object.keys(d)[0]}</strong> -{" "}
                  {d[Object.keys(d)[0]].definition}
                </a>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
