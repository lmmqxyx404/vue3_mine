export const xlinkNS = 'http://www.w3.org/1999/xlink'

export function patchAttr(
  el: Element,
  key: string,
  value: any,
  isSVG: boolean = false,
  instance: null
) {
  if (isSVG && key.startsWith('xlink:')) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS,,key.slice(6,key.length))
    }else{
        el.setAttributeNS(xlinkNS,key,value)
    }
  }else {
    if(__COMPAT__)
  }
}
