const AK = 'f6c5605653a47c5d22640c61d48f24aa'
export function aMapAk () {
  return new Promise(function (resolve, reject) {
    const head = document.head
    let dom = head.querySelector('#aMap')
    if (dom) {
      resolve(1)
      return
    }
    dom = document.createElement('script')
    dom.setAttribute('id', 'aMap')
    dom.src = '//webapi.amap.com/maps?v=1.4.15&key=' + AK
    dom.onerror = reject
    dom.onload = resolve
    head.appendChild(dom)
  })
}
