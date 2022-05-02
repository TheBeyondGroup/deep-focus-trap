import { querySelectorAll } from 'shadow-dom-utils'
import { focusTrap } from './focus-trap'

/**
 * @description Used as a focus trap that can pierce the shadow dom. Meaning if you are using native
 * web components and you have a componenet within a component. This focus trap will be able to peirce through the shadow dom and make a focus trap
 * out of the child components as well.
 *
 */
class deepFocusTrap extends focusTrap {
  /**
   * @param {object} config
   * @param {string | HTMLElement} config.el - A selector or element used to trap focus within
   * @param {boolean} [config.returnFocus=true] - An option when set to true returns focus upon deactivation to the last eement that had focus before the trap was activated. Defualts to true.
   * @param {HTMLElement} [config.focusElement] - An element to focus on as soon as the focus trap is activated.
   * @param {callback} [config.escCallback] - A callback to be called when the user presses the escape key.
   * @param {boolean} [config.includeActiveElement=false] - Includes element currently in focus when focusTrap is activated within the focusable elements.
   * @param {boolean} [config.unordered=false] - Allows for elements to be in an order in the dom. Then follows the order of appearance in the focusableElements array instead.
   */
  constructor(config) {
    super(config)
  }

  /**
   * Set the elements to cycle focus on within the focus trap. Uses the
   * config.el selector to get its focusable children or takes a custom list of elements to cycle focus on.
   *
   * @param {HTMLElement[] | NodeList} [els] An array of elements or Nodelist of the elements to cycle through in the focus trap.
   */
  setElements(els) {
    this.focusableElements =
      els ?? querySelectorAll(this.FOCUSABLE_ELEMENT_SELECTORS, this.el)

    this.firstFocusableEl = this.focusableElements[0]
    this.lastFocusableEl =
      this.focusableElements[this.focusableElements.length - 1]
    this.elementToFocus = this.focusElement
      ? this.focusElement
      : this.firstFocusableEl
    this.setReturnFocusEl()
  }
}

export { deepFocusTrap }
