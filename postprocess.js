"use strict;"

const lineNumberPreArray = document.querySelectorAll("pre.linenumber");
for (codePre of lineNumberPreArray) {
  const tableElem = document.createElement("table");
  tableElem.classList.add("linenumbertable");
  const trElem = document.createElement("tr");
  tableElem.appendChild(trElem);
  const leftTdElem = document.createElement("td");
  leftTdElem.classList.add("linenumber-left-td");
  trElem.appendChild(leftTdElem);
  const leftPreElem = document.createElement("pre");
  leftTdElem.appendChild(leftPreElem);
  const rightTdElem = document.createElement("td");
  rightTdElem.classList.add("linenumber-right-td");
  trElem.appendChild(rightTdElem);
  const rightPreElem = document.createElement("pre");
  rightTdElem.appendChild(rightPreElem);

  // 文字列を\nで区切ると最後の\nの分だけ１行多くなるので1削っている。
  const lineCount = codePre.innerText.split("\n").length - 1;
  let lineNumbers = "";
  for (let i = 0; i < lineCount; i++) {
    lineNumbers += ("" + (i+1)).padStart(3) + ":\n";
  }
  leftPreElem.innerText = lineNumbers;
  rightPreElem.innerHTML = codePre.innerHTML;

  codePre.parentElement.replaceChild(tableElem, codePre);
}

const footnoteUlArray = document.querySelectorAll("ul.footnote");

for (ul of footnoteUlArray) {
  const liArray = ul.getElementsByTagName("li");

  for (li of liArray) {
    const toAnchor = li.getElementsByTagName("a")[0];
    const name = toAnchor.getAttribute("name");
    const fromAnchor = document.querySelector('[href="' + "#" + name + '"]');
    let titleText = "";
    const textNodes = toAnchor.parentNode.childNodes;
    for (let i = 1; i < textNodes.length; i++) {
      titleText += textNodes[i].textContent;
    }
    fromAnchor.setAttribute("title", titleText);
  }
}
