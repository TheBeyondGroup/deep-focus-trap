import { querySelectorAll } from 'shadow-dom-utils'

/**
 * @description used to trap focus on a group of elements, can be an unordered list of elements and can also pierce the shadow dom (though has trouble preserving order if elements are of different type due to limitations with query-shadow-dom library)
 */
class focusTrap {
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
    this.TAB = 9
    this.ESC = 27
    this.FOCUSABLE_ELEMENT_SELECTORS =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], button:not([tabindex="-1"]) [contenteditable]'
    this.el =
      typeof config.el === 'string'
        ? document.querySelector(config.el)
        : config.el
    this.focusElement = config.focusElement
    this.returnFocus = config.returnFocus ?? true
    this.escCallback = config.escCallback
    this.listener = this.listener.bind(this)
    this.includeActiveElement = config.includeActiveElement ?? false
    this.unordered =
      config.unordered || this.includeActiveElement ? true : false
    if (this.unordered) {
      this.index = 1
      this.lastFocusedIndex = 0
    }
  }

  /**
   *  Gets the focuable elements that focuTrap will cycle focus onn
   * @returns {HTMLElement[] | NodeList} A list of elements that focusTrap will cycle focus on
   */
  get elements() {
    return this.focusableElements
  }

  /**
   * Sets the returnFocusEl or defaults to the current focused element (before focus trap is activated)
   * @param {HTMLElement} [el] An element to set focus upon the deactivation of the focus trap
   */
  setReturnFocusEl(el) {
    let focusEl = document.activeElement
    focusEl = !!focusEl.shadowRoot ? focusEl.shadowRoot.activeElement : focusEl
    this.previousFocusedEl = el ?? focusEl
  }

  /**
   * A alias for setElements.
   * - Set the elements to cycle focus on within the focus trap. Uses the
   * config.el selector to get its focusable children or takes a custom list of elements to cycle focus on.
   *
   * @param {HTMLElement[] | NodeList} [els] An array of elements or Nodelist of the elements to cycle through in the focus trap.
   */
  updateElements(els) {
    this.setElements(els)
  }

  /**
   * Set the elements to cycle focus on within the focus trap. Uses the
   * config.el selector to get its focusable children or takes a custom list of elements to cycle focus on.
   *
   * @param {HTMLElement[] | NodeList} [els] An array of elements or Nodelist of the elements to cycle through in the focus trap.
   */
  setElements(els) {
    this.focusableElements =
      els ?? this.el.querySelectorAll(this.FOCUSABLE_ELEMENT_SELECTORS)

    this.firstFocusableEl = this.focusableElements[0]
    this.lastFocusableEl =
      this.focusableElements[this.focusableElements.length - 1]
    this.elementToFocus = this.focusElement
      ? this.focusElement
      : this.firstFocusableEl
    this.setReturnFocusEl()
  }

  /**
   * The keydown event handler. Handles:
   * - Tab key press
   * - Shift + Tab key press
   * - ESC key press.
   * @param {event} e The keydown event object
   * @private
   */
  listener(e) {
    var currentFocusedEl = document.activeElement
    if (!!currentFocusedEl.shadowRoot) {
      currentFocusedEl = currentFocusedEl.shadowRoot.activeElement
    }

    if (e.keyCode === this.TAB) {
      if (!this.unordered) {
        if (e.shiftKey && currentFocusedEl === this.firstFocusableEl) {
          e.preventDefault()
          this.lastFocusableEl.focus()
        } else if (!e.shiftKey && currentFocusedEl === this.lastFocusableEl) {
          e.preventDefault()
          this.firstFocusableEl.focus()
        }
      } else {
        e.preventDefault()
        this.handleUnorderedFocus(e)
      }
    } else if (e.keyCode === this.ESC) {
      if (this.escCallback) {
        this.escCallback()
        this.deactivate()
      }
    }
  }

  /**
   * Activates the focus trap, by listening for keydown events on
   * the focusTrap element or window for unorderedelements
   */
  activate() {
    this.setElements()
    if (this.focusableElements.length > 0) {
      if (this.includeActiveElement) {
        let el = document.activeElement
        let currentFocusedEl = !!el.shadowRoot
          ? el.shadowRoot.activeElement
          : el
        this.setElements([...this.elements, currentFocusedEl])
      }
      this.elementToFocus.focus()
      console.log(this.elementToFocus)
      if (!this.unordered) {
        this.el.addEventListener('keydown', this.listener)
      } else {
        window.addEventListener('keydown', this.listener)
      }
    }
  }

  /**
   * Deactivates the focus trap and returns focus to the last element in focus
   * before focus trap was activated (if the config.returnFocus option is set to true - which is the default)
   */
  deactivate() {
    if (!this.unordered) {
      this.el.removeEventListener('keydown', this.listener)
    } else {
      window.removeEventListener('keydown', this.listener)
    }

    if (this.returnFocus) {
      this.previousFocusedEl.focus()
    }
  }

  /**
   * @description Handles focusing an array of elements that don't have to be in a natural order
   * @private
   */
  handleUnorderedFocus(e) {
    if (e.shiftKey) {
      this.index =
        this.index < 0 ? this.focusableElements.length + 1 : this.index
      if (this.index >= this.lastFocusedIndex) {
        this.index -= 2
      }
      this.focusableElements[this.index].focus()
      this.lastFocusedIndex = this.index
      this.index -= 1
    } else {
      this.index = this.index === this.focusableElements.length ? 0 : this.index
      if (this.index !== 0 && this.index <= this.lastFocusedIndex) {
        this.index += 2
      }
      this.focusableElements[this.index].focus()
      this.lastFocusedIndex = this.index
      this.index += 1
    }
  }
}

/**
 * @description Used as a focus trap that can pierce the shadow dom. Meaning if you are using native
 * web components and you have a componenet within a component. This focus trap will be able to peirce through the shadow dom and make a focus trap
 * out of the child components as well.
 *
 */
class deepFocusTrap extends focusTrap {
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

export { focusTrap, deepFocusTrap }
