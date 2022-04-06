<a name="focusTrap"></a>

## focusTrap
**Kind**: global class  

* [focusTrap](#focusTrap)
    * [new focusTrap(config)](#new_focusTrap_new)
    * [.elements](#focusTrap+elements) ⇒ <code>Array.&lt;HTMLElement&gt;</code> \| <code>NodeList</code>
    * [.setReturnFocusEl([el])](#focusTrap+setReturnFocusEl)
    * [.updateElements([els])](#focusTrap+updateElements)
    * [.setElements([els])](#focusTrap+setElements)
    * [.activate()](#focusTrap+activate)
    * [.deactivate()](#focusTrap+deactivate)

<a name="new_focusTrap_new"></a>

### new focusTrap(config)
used to trap focus on a group of elements, can be an unordered list of elements and can also pierce the shadow dom (though has trouble preserving order if elements are of different type due to limitations with query-shadow-dom library)


| Param | Type | Default |  Required | Description |
| --- | --- | --- | --- | --- |
| config | <code>object</code> |  | required |  |
| config.el | <code>string</code> |  | required | A selector used to trap focsus within |
| [config.returnFocus] | <code>boolean</code> | <code>true</code> | optional | An option when set to true returns focus upon deactivation to the last eement that had focus before the trap was activated. Defualts to true. |
| [config.focusElement] | <code>HTMLElement</code> |  | optional | An element to focus on as soon as the focus trap is activated. |
| [config.escCallback] | <code>callback</code> |  | optional | A callback to be called when the user presses the escape key. |
| [config.deep] | <code>boolean</code> | <code>false</code> | optional | When set tells focusTrap to pierce the shadowDOM. |
| [config.includeActiveElement] | <code>boolean</code> | <code>false</code> | optional | Includes element currently in focus when focusTrap is activated within the focusable elements. |
| [config.unordered] | <code>boolean</code> | <code>false</code> | optional | Allows for elements to be in an order in the dom. Then follows the order of appearance in the focusableElements array instead. |

<a name="focusTrap+elements"></a>

### focusTrap.elements ⇒ <code>Array.&lt;HTMLElement&gt;</code> \| <code>NodeList</code>
Gets the focuable elements that focuTrap will cycle focus on

**Kind**: instance property of [<code>focusTrap</code>](#focusTrap)  
**Returns**: <code>Array.&lt;HTMLElement&gt;</code> \| <code>NodeList</code> - A list of elements that focusTrap will cycle focus on  
<a name="focusTrap+setReturnFocusEl"></a>

### focusTrap.setReturnFocusEl([el])
Sets the returnFocusEl or defaults to the current focused element (before focus trap is activated)

**Kind**: instance method of [<code>focusTrap</code>](#focusTrap)  

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| [el] | <code>HTMLElement</code> | optional | An element to set focus upon the deactivation of the focus trap |

<a name="focusTrap+updateElements"></a>

### focusTrap.updateElements([els])
A alias for setElements.
- Set the elements to cycle focus on within the focus trap. Uses the
config.el selector to get its focusable children or takes a custom list of elements to cycle focus on.

**Kind**: instance method of [<code>focusTrap</code>](#focusTrap)  

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| [els] | <code>Array.&lt;HTMLElement&gt;</code> \| <code>NodeList</code> | optional | An array of elements or Nodelist of the elements to cycle through in the focus trap. |

<a name="focusTrap+setElements"></a>

### focusTrap.setElements([els])
Set the elements to cycle focus on within the focus trap. Uses the
config.el selector to get its focusable children or takes a custom list of elements to cycle focus on.

**Kind**: instance method of [<code>focusTrap</code>](#focusTrap)  

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| [els] | <code>Array.&lt;HTMLElement&gt;</code> \| <code>NodeList</code> | optional |An array of elements or Nodelist of the elements to cycle through in the focus trap. |

<a name="focusTrap+activate"></a>

### focusTrap.activate()
Activates the focus trap, by listening for keydown events on
the focusTrap element or window for unorderedelements

**Kind**: instance method of [<code>focusTrap</code>](#focusTrap)  
<a name="focusTrap+deactivate"></a>

### focusTrap.deactivate()
Deactivates the focus trap and returns focus to the last element in focus
before focus trap was activated (if the config.returnFocus option is set to true - which is the default)