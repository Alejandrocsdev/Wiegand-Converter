// function updatePlaceholders() {
//   const selectedFormat = wiegandFormatSelect.value
//   const facilityCodeInput = facilityCodeContainer.querySelector('input')
//   const cardNumberInput = cardNumberContainer.querySelector('input')

//   switch (selectedFormat) {
//     case 'w26-H10301': // Wiegand 26 Bits (H10301)
//       toggleDisplay(facilityCodeContainer, false)
//       facilityCodeInput.placeholder = '0~255'
//       facilityCodeInput.max = '255'
//       cardNumberInput.placeholder = '0~65535'
//       cardNumberInput.max = '65535'
//       break

//     case 'w34-H10306': // Wiegand 34 Bits (H10306)
//       toggleDisplay(facilityCodeContainer, false)
//       facilityCodeInput.placeholder = '0~65535'
//       facilityCodeInput.max = '65535'
//       cardNumberInput.placeholder = '0~65535'
//       cardNumberInput.max = '65535'
//       break

//     case 'w37-H10302': // Wiegand 37 Bits (H10302)
//       toggleDisplay(facilityCodeContainer, true)
//       cardNumberInput.placeholder = '0~34359738367'
//       cardNumberInput.max = '34359738367'
//       break

//     case 'w37-H10304': // Wiegand 37 Bits (H10304)
//       toggleDisplay(facilityCodeContainer, false)
//       facilityCodeInput.placeholder = '0~65535'
//       facilityCodeInput.max = '65535'
//       cardNumberInput.placeholder = '0~524287'
//       cardNumberInput.max = '524287'
//       break

//     default:
//       console.error('Unknown Wiegand format selected')
//   }
// }

function updatePlaceholders() {
  const selectedFormat = wiegandFormatSelect.value
  const facilityCodeInput = facilityCodeContainer.querySelector('input')
  const cardNumberInput = cardNumberContainer.querySelector('input')

  // Mapping object for Wiegand formats
  const formatConfig = {
    'w26-H10301': {
      facilityCode: { placeholder: '0~255', max: '255', show: true },
      cardNumber: { placeholder: '0~65535', max: '65535' }
    },
    'w34-H10306': {
      facilityCode: { placeholder: '0~65535', max: '65535', show: true },
      cardNumber: { placeholder: '0~65535', max: '65535' }
    },
    'w37-H10302': {
      facilityCode: { show: false },
      cardNumber: { placeholder: '0~34359738367', max: '34359738367' }
    },
    'w37-H10304': {
      facilityCode: { placeholder: '0~65535', max: '65535', show: true },
      cardNumber: { placeholder: '0~524287', max: '524287' }
    }
  }

  const config = formatConfig[selectedFormat]

  if (config) {
    // Facility code settings
    if (config.facilityCode) {
      toggleDisplay(facilityCodeContainer, !config.facilityCode.show)
      if (config.facilityCode.placeholder) {
        facilityCodeInput.placeholder = config.facilityCode.placeholder
      }
      if (config.facilityCode.max) {
        facilityCodeInput.max = config.facilityCode.max
      }
    }

    // Card number settings
    if (config.cardNumber) {
      if (config.cardNumber.placeholder) {
        cardNumberInput.placeholder = config.cardNumber.placeholder
      }
      if (config.cardNumber.max) {
        cardNumberInput.max = config.cardNumber.max
      }
    }
  } else {
    console.error('Unknown Wiegand format selected')
  }
}
