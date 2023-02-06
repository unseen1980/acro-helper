// var word = "and",
//   queue = [document.body],
//   curr
// while ((curr = queue.pop())) {
//   if (!curr.textContent.match(/\b(and)\b/g)) continue
//   for (var i = 0; i < curr.childNodes.length; ++i) {
//     switch (curr.childNodes[i].nodeType) {
//       case Node.TEXT_NODE: // 3
//         if (curr.childNodes[i].textContent.match(word)) {
//           console.log("Found!")
//           console.log(curr)

//           curr.style.textDecoration = "underline dotted"

//           const original_html = curr.innerHTML
//           const new_html = `<div class='acro-helper'>${original_html}<span class="tooltiptext">This is the definition</span></div>`
//           curr.innerHTML = new_html

//           // you might want to end your search here.
//         }
//         break
//       case Node.ELEMENT_NODE: // 1
//         queue.push(curr.childNodes[i])
//         break
//     }
//   }
// }

// CANDIDATE
// for (const parent of document.querySelectorAll("body *:not(a)")) {
//   for (const child of parent.childNodes) {
//     if (child.nodeType === Node.TEXT_NODE) {
//       let sa = "and"
//       const pattern = new RegExp(`\\b${sa}\\b`, "gi")
//       const replacement = `<div class='acro-helper'>${sa}<span class="tooltiptext">This is the definition</span></div>`
//       const subNode = document.createElement("span")
//       subNode.innerHTML = child.textContent.replace(pattern, replacement)
//       parent.insertBefore(subNode, child)
//       parent.removeChild(child)
//     }
//   }
// }

// Append tooltips
// let data
// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => response.json())
//   .then((json) => {
//     data = json
//     // console.log(json)
//     const a = document.querySelectorAll("a")
//     for (let i = 0; i < a.length; i++) {
//       console.log("+++++++>", data[i])
//       a[i].style.textDecoration = "underline dotted"

//       const original_html = a[i].innerHTML
//       const new_html = `<div class='acro-helper'>${original_html}<span class="tooltiptext">This is the definition${data[i].title}</span></div>`
//       a[i].innerHTML = new_html
//     }
//   })
