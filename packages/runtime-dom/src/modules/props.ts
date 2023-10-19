

// functions. The user is responsible for using them with only trusted content.
export function patchDOMProp(el: any, key: string, value: any) {
  if (key === 'innerHTML' || key === 'textContent'){
    // TODO: still to add code
    el[key] = value == null ? '' : value  // this is == not ===
    return
  }

  const tag=el.tagName
  if(key === 'value' &&
  tag !== 'PROGRESS' &&
  // custom elements may use _value internally
  !tag.includes('-')){
    // store value as _value as well since
    // non-string values will be stringified.
    el._value = value
    // #4956: <option> value will fallback to its text content so we need to
    // compare against its attribute value instead.
    const oldValue = tag === 'OPTION' ? el.getAttribute('value') : el.value
    const newValue = value == null ? '' : value
    if (oldValue !== newValue) {
      el.value = newValue
    }
    if (value == null) {
      el.removeAttribute(key)
    }
    return
  }

  let needRemove = false

  return needRemove && el.removeAttribute(key)
}
