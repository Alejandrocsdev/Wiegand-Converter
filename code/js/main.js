// Variables
const wiegandFormat = document.querySelector('#wiegand-format')
const facilityCodeContainer = document.querySelector('.facility-code-container')
const cardNumberContainer = document.querySelector('.card-number-container')
const outputsContainer = document.querySelector('.outputs-container')
const converterForm = document.querySelector('.converter-form')

// Event Listeners
wiegandFormat.addEventListener('change', updateInputAttributes)
converterForm.addEventListener('submit', converterSubmit)

// Initialization
;(function init() {
  updateInputAttributes()
})()

function updateInputAttributes() {
  const selectedFormat = wiegandFormat.value

  const facilityCodeInput = facilityCodeContainer.querySelector('input')
  const cardNumberInput = cardNumberContainer.querySelector('input')
  const outputElements = outputsContainer.querySelectorAll('div')

  facilityCodeInput.value = ''
  cardNumberInput.value = ''
  outputElements.forEach(div => {
    div.textContent = ''
    div.classList.remove('isNull')
  })

  const config = wiegandConfig[selectedFormat]

  toggleDisplay(facilityCodeContainer, config.facilityCode.hidden)

  const facilityCodeBit = config.facilityCode.bit
  facilityCodeInput.placeholder = `0~${2 ** facilityCodeBit - 1}`
  facilityCodeInput.max = 2 ** facilityCodeBit - 1

  const cardNumberBit = config.cardNumber.bit
  cardNumberInput.placeholder = `0~${2 ** cardNumberBit - 1}`
  cardNumberInput.max = 2 ** cardNumberBit - 1
}

function converterSubmit(event) {
  event.preventDefault()

  const wiegandBinaryOutput = outputsContainer.querySelector('#wiegand-binary')

  const formData = new FormData(converterForm)

  const wiegandFormat = formData.get('wiegand-format')
  const facilityCode = formData.get('facility-code')
  const cardNumber = formData.get('card-number')

  const config = wiegandConfig[wiegandFormat]

  const [wiegandBinary, fullWiegandBinary] = wiegand(config, facilityCode, cardNumber)

  wiegandBinaryOutput.textContent = fullWiegandBinary

  const decimalOutput = outputsContainer.querySelector('#decimal')
  decimalOutput.textContent = binaryToDecimal(wiegandBinary)

  const hexadecimalOutput = outputsContainer.querySelector('#hexadecimal')
  hexadecimalOutput.textContent = binaryToHexadecimal(wiegandBinary)

  const bitsLength = decimalBitsLength(config.facilityCode.bit, config.cardNumber.bit)

  const eightBcdOutput = outputsContainer.querySelector('#eight-bcd')
  eightBcdOutput.textContent = bitsLength <= 8 ? codeToBcd(config, facilityCode, cardNumber, 32) : 'null'
  toggleIsNullClass(eightBcdOutput, eightBcdOutput.textContent)

  const tenBcdOutput = outputsContainer.querySelector('#ten-bcd')
  tenBcdOutput.textContent = bitsLength <= 10 ? codeToBcd(config, facilityCode, cardNumber, 40) : 'null'
  toggleIsNullClass(tenBcdOutput, tenBcdOutput.textContent)

  const twelveBcdOutput = outputsContainer.querySelector('#twelve-bcd')
  twelveBcdOutput.textContent = bitsLength <= 12 ? codeToBcd(config, facilityCode, cardNumber, 48) : 'null'
  toggleIsNullClass(twelveBcdOutput, twelveBcdOutput.textContent)
}

function wiegand(config, facilityCode, cardNumber) {
  const binaryString = concatBinaryString(config, facilityCode, cardNumber)

  const fullBinaryString = addParities(config, binaryString)

  return [binaryString, fullBinaryString]
}

function addParities(config, binaryString) {
  const epBit = config.epBit
  const opBit = config.opBit

  const length = binaryString.length

  const epBinary = binaryString.slice(0, epBit)
  const opBinary = binaryString.slice(length - opBit)

  const ep = calculateParity(epBinary, 'EP')
  const op = calculateParity(opBinary, 'OP')

  const result = ep.concat('', binaryString, op)

  return result
}

function concatBinaryString(config, facilityCode, cardNumber) {
  const cardNumberBinary = decimalToBinary(cardNumber).padStart(config.cardNumber.bit, '0')

  if (facilityCode) {
    const facilityCodeBinary = decimalToBinary(facilityCode).padStart(config.facilityCode.bit, '0')
    const fullBinaryString = facilityCodeBinary.concat('', cardNumberBinary)
    return fullBinaryString
  } else {
    return cardNumberBinary
  }
}

function calculateParity(binaryString, type) {
  if (!/^[01]+$/.test(binaryString)) {
    throw new Error('Invalid binary string. Only 0 and 1 are allowed.')
  }

  const onesCount = [...binaryString].filter(bit => bit === '1').length

  switch (type) {
    case 'EP': // Even Parity
      return onesCount % 2 === 0 ? '0' : '1'

    case 'OP': // Odd Parity
      return onesCount % 2 === 0 ? '1' : '0'

    default:
      console.error("Invalid parity type. Use 'EP' or 'OP'.")
  }
}
