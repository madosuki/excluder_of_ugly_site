function searchString(str, start) {
  let tmp = ""
  let count = 0
  for(const i of str) {
    if(i === "/" && count >= start) {
      break
    }

    if(count >= start) {
      tmp = tmp + i
    }

    count++
  }

  return tmp
}

function matchString(str, target) {
  const protocol = str.substring(0, 5)

  let domain = ""

  if(protocol === "https") {
    domain = searchString(str, 8)
  } else if(protocol === "http:"){
    domain = searchString(str, 7)
  }

  if(domain === target) {
    return true
  }

  return false
}

function onGot(item) {
  const json = JSON.parse(item.data)

  if(json.excludelist.length > 0) {
    const obj = document.getElementsByClassName("g")
    for(const i of obj) {

      const url = i.getElementsByClassName("r")[0].getElementsByTagName("a")[0].getAttribute("href")

      for(const k of json.excludelist) {
        if(k !== "" && matchString(url, k)) {
          i.parentNode.removeChild(i)
        }

      }
    }
  }
}

function onError(error) {
  console.log(`Error: ${error}`)
}

const remove = () => {
  const local = browser.storage.local.get("data")
  local.then(onGot, onError)
}

setInterval(remove, 1000)
