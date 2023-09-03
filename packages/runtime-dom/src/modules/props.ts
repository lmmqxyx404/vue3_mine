export function patchDOMProp(el: any, key: string, value: any) {
  let needRemove = false

  return needRemove && el.removeAttribute(key)
}
