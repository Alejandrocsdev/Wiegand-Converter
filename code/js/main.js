// Variables
const wiegandFormatSelect = document.getElementById('wiegand-format')
const facilityCodeContainer = document.querySelector('.facility-code-container')
const cardNumberContainer = document.querySelector('.card-number-container')

// Event Listeners
wiegandFormatSelect.addEventListener('change', updatePlaceholders)

// Initialization
;(function init() {
  updatePlaceholders()
})()
