import React, { useEffect, useState } from "react"

import { getDictionary } from "../lib/dictionary"

export default function DictionaryPage(props) {
  const [dictionary, setDictionary] = useState([])
  const [input, setInput] = useState(props?.value ?? "")

  useEffect(() => {
    getDictionary().then((data) => {
      setDictionary(data)
      console.log("DIC", data)
    })
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>Acro Helper Dictionary</h2>

      <p>
        <input
          type="text"
          placeholder="Search"
          onInput={(val) => {
            console.log("--->", val.target.value)
            setInput(val.target.value)
          }}></input>
      </p>
      <ul>
        {dictionary.length > 0 &&
          dictionary.map((d) => {
            return (
              <li style={{ paddingBottom: "10px" }}>
                <strong>{Object.keys(d)[0]}</strong> -{" "}
                {d[Object.keys(d)[0]].definition}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
