<a name="deepFocusTrap"></a>

## deepFocusTrap
**Kind**: global class  

* [deepFocusTrap](#deepFocusTrap)
    * [new deepFocusTrap(config)](#new_deepFocusTrap_new)
    * [.setElements([els])](#deepFocusTrap+setElements)

<a name="new_deepFocusTrap_new"></a>

### new deepFocusTrap(config)
Used as a focus trap that can pierce the shadow dom. Meaning if you are using native
web components and you have a componenet within a component. This focus trap will be able to peirce through the shadow dom and make a focus trap
out of the child components as well.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config | <code>object</code> |  |  |
| config.el | <code>string</code> \| <code>HTMLElement</code> |  | A selector or element used to trap focus within |
| [config.returnFocus] | <code>boolean</code> | <code>true</code> | An option when set to true returns focus upon deactivation to the last eement that had focus before the trap was activated. Defualts to true. |
| [config.focusElement] | <code>HTMLElement</code> |  | An element to focus on as soon as the focus trap is activated. |
| [config.deep] | <code>boolean</code> | <code>true</code> | When set to false focusTrap will not peirce the shadowDOM. |
| [config.escCallback] | <code>callback</code> |  | A callback to be called when the user presses the escape key. |
| [config.includeActiveElement] | <code>boolean</code> | <code>false</code> | Includes element currently in focus when focusTrap is activated within the focusable elements. |
| [config.unordered] | <code>boolean</code> | <code>false</code> | Allows for elements to be in an order in the dom. Then follows the order of appearance in the focusableElements array instead. |

<a name="deepFocusTrap+setElements"></a>

### deepFocusTrap.setElements([els])
Set the elements to cycle focus on within the focus trap. Uses the
config.el selector to get its focusable children or takes a custom list of elements to cycle focus on.

**Kind**: instance method of [<code>deepFocusTrap</code>](#deepFocusTrap)  

| Param | Type | Description |
| --- | --- | --- |
| [els] | <code>Array.&lt;HTMLElement&gt;</code> \| <code>NodeList</code> | An array of elements or Nodelist of the elements to cycle through in the focus trap. |

