// Variables
const wiegandFormatSelect = document.querySelector('.wiegand-format')
const facilityCodeContainer = document.querySelector('.facility-code-container')
const cardNumberContainer = document.querySelector('.card-number-container')
const wiegandBinaryContainer = document.querySelector('.wiegand-binary-container')
const exportFormatsContainer = document.querySelector('.export-formats-container')
const converterForm = document.querySelector('.converter-form')

// Event Listeners
wiegandFormatSelect.addEventListener('change', updateInputAttributes)
converterForm.addEventListener('submit', converterSubmit)

// Initialization
;(function init() {
  updateInputAttributes()
})()

function updateInputAttributes() {
  const selectedFormat = wiegandFormatSelect.value

  const facilityCodeInput = facilityCodeContainer.querySelector('input')
  const cardNumberInput = cardNumberContainer.querySelector('input')
  const wiegandBinaryOuput = wiegandBinaryContainer.querySelector('div')
  const outputElements = exportFormatsContainer.querySelectorAll('div')

  facilityCodeInput.value = ''
  cardNumberInput.value = ''
  wiegandBinaryOuput.textContent = ''
  outputElements.forEach(div => div.textContent = '')

  const config = wiegandConfig[selectedFormat]

  toggleDisplay(facilityCodeContainer, !config.facilityCode.show)
  const facilityCodeBit = config.facilityCode.bit
  facilityCodeInput.placeholder = `0~${2 ** facilityCodeBit - 1}`
  facilityCodeInput.max = 2 ** facilityCodeBit - 1

  const cardNumberBit = config.cardNumber.bit
  cardNumberInput.placeholder = `0~${2 ** cardNumberBit - 1}`
  cardNumberInput.max = 2 ** cardNumberBit - 1
}

function converterSubmit(event) {
  event.preventDefault()

  const wiegandBinaryOuput = wiegandBinaryContainer.querySelector('div')

  const formData = new FormData(converterForm)

  const wiegandFormat = formData.get('wiegand-format')
  const facilityCode = formData.get('facility-code')
  const cardNumber = formData.get('card-number')

  const config = wiegandConfig[wiegandFormat]

  const [wiegandBinary, fullWiegandBinary] = wiegand(config, facilityCode, cardNumber)

  wiegandBinaryOuput.textContent = fullWiegandBinary

  const decimalOutput = exportFormatsContainer.querySelector('#decimal')
  decimalOutput.textContent = binaryToDecimal(wiegandBinary)

  const hexadecimalOutput = exportFormatsContainer.querySelector('#hexadecimal')
  hexadecimalOutput.textContent = binaryToHexadecimal(wiegandBinary)

  const bitLength = decimalBitsLength(config.facilityCode.bit, config.cardNumber.bit)

  const eightBcdOutput = exportFormatsContainer.querySelector('#eight-bcd')
  eightBcdOutput.textContent = bitLength <= 8 ? codeToEightBcd(config, facilityCode, cardNumber) : 'null'

  const tenBcdOutput = exportFormatsContainer.querySelector('#ten-bcd')
  tenBcdOutput.textContent = bitLength <= 10 ? codeToTenBcd(config, facilityCode, cardNumber) : 'null'

  const twelveBcdOutput = exportFormatsContainer.querySelector('#twelve-bcd')
  twelveBcdOutput.textContent = bitLength <= 12 ? codeToTwelveBcd(config, facilityCode, cardNumber) : 'null'
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
  // Ensure the input is a valid binary string
  if (!/^[01]+$/.test(binaryString)) {
    throw new Error('Invalid binary string. Only 0 and 1 are allowed.')
  }

  // Count the number of 1's in the binary string
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
