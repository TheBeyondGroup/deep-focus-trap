"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepFocus = void 0;

var _shadowDomUtils = require("shadow-dom-utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @description used to trap focus on a group of elements, can be an unordered list of elements and can also pierce the shadow dom (though has trouble preserving order if elements are of different type due to limitations with query-shadow-dom library)
 */
var deepFocus = /*#__PURE__*/function () {
  /**
   * @param {object} config
   * @param {string} config.el - A selector used to trap focus within
   * @param {boolean} [config.returnFocus=true] - An option when set to true returns focus upon deactivation to the last eement that had focus before the trap was activated. Defualts to true.
   * @param {HTMLElement} [config.focusElement] - An element to focus on as soon as the focus trap is activated.
   * @param {callback} [config.escCallback] - A callback to be called when the user presses the escape key.
   * @param {boolean} [config.deep=false] - When set tells focusTrap to pierce the shadowDOM.
   * @param {boolean} [config.includeActiveElement=false] - Includes element currently in focus when focusTrap is activated within the focusable elements.
   * @param {boolean} [config.unordered=false] - Allows for elements to be in an order in the dom. Then follows the order of appearance in the focusableElements array instead.
   */
  function deepFocus(config) {
    var _config$returnFocus, _config$includeActive;

    _classCallCheck(this, deepFocus);

    this.TAB = 9;
    this.ESC = 27;
    this.FOCUSABLE_ELEMENT_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], button:not([tabindex="-1"]) [contenteditable]';
    this.el = config.el;
    this.focusElement = config.focusElement;
    this.returnFocus = (_config$returnFocus = config.returnFocus) !== null && _config$returnFocus !== void 0 ? _config$returnFocus : true;
    this.escCallback = config.escCallback;
    this.deep = config.deep;
    this.listener = this.listener.bind(this);
    this.includeActiveElement = (_config$includeActive = config.includeActiveElement) !== null && _config$includeActive !== void 0 ? _config$includeActive : false;
    this.unordered = config.unordered || this.includeActiveElement ? true : false;

    if (this.unordered) {
      this.index = 1;
      this.lastFocusedIndex = 0;
    }
  }
  /**
   *  Gets the focuable elements that focuTrap will cycle focus onn
   * @returns {HTMLElement[] | NodeList} A list of elements that focusTrap will cycle focus on
   */


  _createClass(deepFocus, [{
    key: "elements",
    get: function get() {
      return this.focusableElements;
    }
    /**
     * Sets the returnFocusEl or defaults to the current focused element (before focus trap is activated)
     * @param {HTMLElement} [el] An element to set focus upon the deactivation of the focus trap
     */

  }, {
    key: "setReturnFocusEl",
    value: function setReturnFocusEl(el) {
      var focusEl = document.activeElement;
      focusEl = !!focusEl.shadowRoot ? focusEl.shadowRoot.activeElement : focusEl;
      this.previousFocusedEl = el !== null && el !== void 0 ? el : focusEl;
    }
    /**
     * A alias for setElements.
     * - Set the elements to cycle focus on within the focus trap. Uses the
     * config.el selector to get its focusable children or takes a custom list of elements to cycle focus on.
     *
     * @param {HTMLElement[] | NodeList} [els] An array of elements or Nodelist of the elements to cycle through in the focus trap.
     */

  }, {
    key: "updateElements",
    value: function updateElements(els) {
      this.setElements(els);
    }
    /**
     * Set the elements to cycle focus on within the focus trap. Uses the
     * config.el selector to get its focusable children or takes a custom list of elements to cycle focus on.
     *
     * @param {HTMLElement[] | NodeList} [els] An array of elements or Nodelist of the elements to cycle through in the focus trap.
     */

  }, {
    key: "setElements",
    value: function setElements(els) {
      if (this.deep) {
        this.focusableElements = els !== null && els !== void 0 ? els : (0, _shadowDomUtils.querySelectorAll)(this.FOCUSABLE_ELEMENT_SELECTORS, this.el);
      } else {
        this.focusableElements = els !== null && els !== void 0 ? els : this.el.querySelectorAll(this.FOCUSABLE_ELEMENT_SELECTORS);
      }

      this.firstFocusableEl = this.focusableElements[0];
      this.lastFocusableEl = this.focusableElements[this.focusableElements.length - 1];
      this.elementToFocus = this.focusElement ? this.focusElement : this.firstFocusableEl;
      this.setReturnFocusEl();
    }
    /**
     * The keydown event handler. Handles:
     * - Tab key press
     * - Shift + Tab key press
     * - ESC key press.
     * @param {event} e The keydown event object
     * @private
     */

  }, {
    key: "listener",
    value: function listener(e) {
      var currentFocusedEl = document.activeElement;

      if (!!currentFocusedEl.shadowRoot) {
        currentFocusedEl = currentFocusedEl.shadowRoot.activeElement;
      }

      if (e.keyCode === this.TAB) {
        if (!this.unordered) {
          if (e.shiftKey && currentFocusedEl === this.firstFocusableEl) {
            e.preventDefault();
            this.lastFocusableEl.focus();
          } else if (!e.shiftKey && currentFocusedEl === this.lastFocusableEl) {
            e.preventDefault();
            this.firstFocusableEl.focus();
          }
        } else {
          e.preventDefault();
          this.handleUnorderedFocus(e);
        }
      } else if (e.keyCode === this.ESC) {
        if (this.escCallback) {
          this.escCallback();
          this.deactivate();
        }
      }
    }
    /**
     * Activates the focus trap, by listening for keydown events on
     * the focusTrap element or window for unorderedelements
     */

  }, {
    key: "activate",
    value: function activate() {
      this.setElements();

      if (this.focusableElements.length > 0) {
        if (this.includeActiveElement) {
          var el = document.activeElement;
          var currentFocusedEl = !!el.shadowRoot ? el.shadowRoot.activeElement : el;
          this.setElements([].concat(_toConsumableArray(this.elements), [currentFocusedEl]));
        }

        this.elementToFocus.focus();

        if (!this.unordered) {
          this.el.addEventListener('keydown', this.listener);
        } else {
          window.addEventListener('keydown', this.listener);
        }
      }
    }
    /**
     * Deactivates the focus trap and returns focus to the last element in focus
     * before focus trap was activated (if the config.returnFocus option is set to true - which is the default)
     */

  }, {
    key: "deactivate",
    value: function deactivate() {
      if (!this.unordered) {
        this.el.removeEventListener('keydown', this.listener);
      } else {
        window.removeEventListener('keydown', this.listener);
      }

      if (this.returnFocus) {
        this.previousFocusedEl.focus();
      }
    }
    /**
     * @description Handles focusing an array of elements that don't have to be in a natural order
     * @private
     */

  }, {
    key: "handleUnorderedFocus",
    value: function handleUnorderedFocus(e) {
      if (e.shiftKey) {
        this.index = this.index < 0 ? this.focusableElements.length + 1 : this.index;

        if (this.index >= this.lastFocusedIndex) {
          this.index -= 2;
        }

        this.focusableElements[this.index].focus();
        this.lastFocusedIndex = this.index;
        this.index -= 1;
      } else {
        this.index = this.index === this.focusableElements.length ? 0 : this.index;

        if (this.index !== 0 && this.index <= this.lastFocusedIndex) {
          this.index += 2;
        }

        this.focusableElements[this.index].focus();
        this.lastFocusedIndex = this.index;
        this.index += 1;
      }
    }
  }]);

  return deepFocus;
}();

exports.deepFocus = deepFocus;