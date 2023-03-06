import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px"
      }}>
      <h4 style={{ textAlign: "center" }}>Acro Helper Extension</h4>
      <p style={{ fontSize: "12px" }}>
        Acro Helper, is designed to identify acronyms and abbreviations related
        to technology on the web pages you visit. Once detected, the tool adds a
        tooltip with the corresponding definition that appears when hovered
        over.
      </p>
      <p style={{ fontSize: "12px" }}>
        The primary objective of Acro Helper is to assist individuals with low
        digital literacy in understanding and navigating technology-related
        content.
      </p>
      <p>
        This is an educational project developed by{" "}
        <strong>C.Koutsiaris</strong>.
      </p>
      <button
        style={{
          fontWeight: "700",
          padding: "8px",
          backgroundColor: "#4285f4",
          color: "#FFFFFF",
          border: 0,
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => {
          chrome.tabs.create({
            url: "./tabs/dictionary.html"
          })
        }}>
        Visit Dictionary Page
      </button>
    </div>
  )
}

export default IndexPopup
