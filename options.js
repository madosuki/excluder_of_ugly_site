function saveList(e) {
  e.preventDefault()

  const textarea = document.optionform.data
  if(textarea.value.length > 0) {
    const array = textarea.value.split("\n")
    const obj = { "excludelist": array }
    const jsonstr = JSON.stringify(obj)

    browser.storage.local.set({
      data: jsonstr
    })

  } else {
    browser.storage.local.set({
      data: "[]"
    })
  }
}

function clearAll(e) {
  browser.storage.local.clear()
  location.relaod()
}

function GotData(item) {
  const textarea = document.optionform.data
  const data = JSON.parse(item.data)
  if(data.excludelist.length > 0) {
    for(const i of data.excludelist) {
      textarea.value = textarea.value + i + "\n"
    }
  }
}

function GotError(e) {
  alert(e)
}

function showList() {
  const local = browser.storage.local.get("data")
  local.then(GotData, GotError)
}

const clear = document.getElementById("clear")
clear.addEventListener("click", clearAll)

document.querySelector("form").addEventListener("submit", saveList)
showList()
