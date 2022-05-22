import $ from './quatdom'
import { deepFocusTrap } from '../../src/index'

const modalFocusTrap = new deepFocusTrap({
  el: '.js-modal',
  deep: false,
  escCallback: () => {
    $('.js-modal-wrapper').hide(true)
  },
})
$().docReady(() => {
  $('.js-modal-open').on('click', () => {
    const modal = $('.js-modal').el()
    const closeBtn = $('.js-modal-close')
    const overlay = $('.js-modal-wrapper')
    overlay.show(true)
    modalFocusTrap.activate()
    closeBtn.on('click', () => {
      overlay.hide(true)
      modalFocusTrap.deactivate()
    })
    $(window).on('click', e => {
      if (
        !(modal === e.target || modal.contains(e.target)) &&
        !e.target.className.includes('js-modal-open')
      ) {
        overlay.hide(true)
        modalFocusTrap.deactivate()
      }
    })
  })
})
