function writeComment (cb) {
  setTimeout(() => {
    var content = document.querySelector('.lb-title').innerHTML
    if (content.indexOf('food') >= 0) {
      var commentBox = document.querySelector('#lb-comment')
      commentBox.value = 'Are you gonna eat all that? #shareyourfood'
      document.querySelector('#lb-postComment').click()
      setTimeout(cb, 5000)
    } else {
      cb()
    }
  }, 100)
}

function closePopup (cb) {
  setTimeout(() => {
    var el = document.querySelector('.lb-close')
    const event = document.createEvent('HTMLEvents')
    event.initEvent('click', true, true)
    el.dispatchEvent(event)
    cb()
  }, 100)
}

function queryPhotos () {
  var container = document.querySelector('#media')
  var result = []
  container.querySelectorAll('a').forEach((el) => {
    if (el.style[0] === 'cursor') {
      result.push((cb) => {
        el.click()
        writeComment(() => {
          closePopup(cb)
        })
      })
    }
  })
  return result
}

setTimeout(() => {
  var ev = queryPhotos()
  function nextEv () {
    var next = ev.pop()
    if (next) {
      next(nextEv)
    }
  }
  nextEv()
}, 4000)
