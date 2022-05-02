## Deep Focus Trap

#### Getting Started
1. Install libaray using 
    ``` bash
    npm install deep-focus-trap
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
import { focusTrap } from 'deep-focus-trap'

const query = (selector) => document.querySelector(selector);
const modal = query('.modal')
const openModalBtn = query('.open-modal-btn');
const closeModalBtn = query('.close-modal-btn');
const focusTrap = new focusTrap({
  el: '.modal'
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

You can view the API documentation [here](./docs.md)