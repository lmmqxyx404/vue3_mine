// TODO: Add isSvg as the function parameter
// compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]
export const patchClass = (el: Element, value: string | null) => {
  if (value == null) {
    el.removeAttribute('class')
  } else {
    el.className = value
  }
}
