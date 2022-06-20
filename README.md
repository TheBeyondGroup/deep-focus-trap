## Deep Focus Trap

### Getting Started
1. Install library using
    ``` bash
    $ npm install deep-focus-trap
    ```
2. Import library 

    ``` javascript
    import { focusTrap } from 'deep-focus-trap';
    ```
3. Initalize class with config options:

    ``` javascript
     const focusTrap = new focusTrap({
       el: '.modal'
     });
    ```
4. Activate the focus trap when you need to trap focus with the element (i.e. when a user opens a modal).

    ``` javascript
    focusTrap.activate();
    ``` 
5. Then deactivate when you no longer need to trap focus (i.e. when a user closes the modal).

    ``` javascript
    focusTrap.deactivate();
    ``` 
#### Example
``` javascript
import { focusTrap } from 'deep-focus-trap/dom'

const query = (selector) => document.querySelector(selector);
const modal = query('.modal')
const openModalBtn = query('.open-modal-btn');
const closeModalBtn = query('.close-modal-btn');
const focusTrap = new focusTrap({
  el: '.modal',
  escCallback: function (){
    modal.style.display = 'none';
  }
});

//open modal event
openModalBtn.onclick = function(){
   modal.style.display = 'block';
   focusTrap.activate();
};

//close modal event
closeModalBtn.onclick = function(){
   modal.style.display = 'none';
   focusTrap.deactivate();
};
```

#### Piercing the Shadow DOM

The main import has two classes for import, ` deepFocusTrap` and it's parent `focusTrap`. If you don't need to peirce the shadowDom you should import the parent class from the dom module  (i.e. `import { focusTrap } from 'deep-focus-trap/dom'`). This reduces the module size significantly as you aren't importing the dependency required for piercing th shadow dom. The class that pierces the shadow dom is `deepfocusTrap`. You can use this class by importing it from the main module like so: `import { deepFocusTrap } from 'deep-focus-trap'`. 

Both `focusTrap` and `deepFocusTrap` have he same functionality and work in the same way except `deepFocusTrap` is able to pierce the shadow DOM. The reasons there are two classes broken into different modules is to enable tree-shaking, which greatly reduces the imported bundle size (**850B** compared to **12.5KB** minified & gzipped) when you only need the regular focusTrap and don't need to pierce the shadowDOM.

If you your project is already using the `deepFocusTrap` class in other places your are already going to import the extra dependency so you can go ahead and  just import the `focusTrap` class from the main module (i.e. `import { focusTrap } from 'deep-focus-trap'`) or you can use the `deepFocusTrap` class and set the `config.deep` option to `false`. Like so:

``` javascript
import { deepFocusTrap } from 'deep-focus-trap';

let focusTrap = new deepFocusTrap({
  el: '.modal',
  deep: false
});
```

#### Configuration Options

``` javascript
import { deepFocusTrap } from 'deep-focus-trap';
const modal = document.querySelector('.modal');

let focusTrap = new deepFocusTrap({
  el: modal, // or '.modal', Required option - A selector or element used to trap focus within
  deep: false, //default: true - When set to false focusTrap will not peirce the Shadow DOM.
  returnFocus: false, //default: true - An option when set to true returns focus upon deactivation to the last element that had focus before the trap was activated. 
  focusElement: document.querySelector('a.first-focus'), // An element to focus on as soon as the focus trap is activated.
  includeActiveElement: true, //default: false -  Includes element currently in focus when focusTrap is activated within the focusable elements.
  unordered: true, //default: false - Allows for elements to be in an order in the dom. Then follows the order of appearance in the focusableElements array instead.
  escCallback: function(){ // A callback to be called when the user presses the escape key. Note his automatically calls deactivate() after escCallback
    modal.style.display = 'none';
  }
});

```
**Note: the* `focusTrap` *class doesn't have the* `deep` *option*

#### Using UMD version via CDN
 If you want to use via deep-focus-trap via the `script` tag. We recommend using the UMD version as its more widely supported (You can also use the ES module version using the `type="module` attribute.") You can find the CDn [here](https://www.jsdelivr.com/package/npm/deep-focus-trap?path=dist)

In using the UMD version  you wont import the module but just copy the script tag:
``` html
<script src="/deep-focus-trap.umd.js"></script>
```

Or if you want the basic version (doesn't pierce the shadow DOM) 

``` html
<script src="/focus-trap.umd.js"></script>
```

Then to use. Use the `focusTrap` or `deepFocusTrap` function (umd exports to the window)

``` javascript
const focusTrap = deepFocusTrap({
  el: '.modal',
  escCallback: () => { 
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  }
})
```

You can view the API documentation [here](./docs.md)