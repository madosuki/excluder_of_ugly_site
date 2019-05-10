function onGot(item) {
  const json = JSON.parse(item.data)

  if(json.excludelist.length > 0) {
    const obj = document.getElementsByClassName("g")
    for(const i of obj) {

      const url = i.getElementsByClassName("r")[0].getElementsByTagName("a")[0].getAttribute("href")

      for(const k of json.excludelist) {

        if(url.indexOf(k) !== -1) {
          i.parentNode.removeChild(i)
        }

      }
    }
  }
}

function onError(error) {
  console.log("Error: {error}")
}

const remove = () => {
  let local = browser.storage.local.get("data")
  local.then(onGot, onError)
}

setInterval(remove, 1000)
