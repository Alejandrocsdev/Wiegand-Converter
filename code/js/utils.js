// Toggle Display
function toggleDisplay(element, hidden) {
  element.classList.toggle('hide', hidden)
  element.querySelector('input').disabled = hidden
}

// Toggle isNull
function toggleIsNullClass(element, content) {
  if (content === 'null') {
    element.classList.add('isNull')
  } else {
    element.classList.remove('isNull')
  }
}

// Decimal to Binary
function decimalToBinary(decimalString) {
  const decimalNumber = parseInt(decimalString, 10)
  return decimalNumber.toString(2)
}

// Binary to Decimal
function binaryToDecimal(binaryString) {
  if (!/^[01]+$/.test(binaryString)) {
    throw new Error('Invalid binary string. Only 0 and 1 are allowed.')
  }

  return parseInt(binaryString, 2)
}

// Binary to Hexadecimal
function binaryToHexadecimal(binaryString) {
  if (!/^[01]+$/.test(binaryString)) {
    throw new Error('Invalid binary string. Only 0 and 1 are allowed.')
  }

  const paddedBinary = binaryString.padStart(Math.ceil(binaryString.length / 4) * 4, '0')

  return parseInt(paddedBinary, 2).toString(16).toUpperCase()
}

function decimalBitLength(code) {
  const codeBit = String(2 ** code - 1).length
  return codeBit
}

function decimalBitsLength(facilityCodeBit, cardNumberBit) {
  const maxFacilityCodeBit = String(2 ** facilityCodeBit - 1).length
  const maxCardNumberBit = String(2 ** cardNumberBit - 1).length
  return maxFacilityCodeBit + maxCardNumberBit
}

// console.log(decimalBitLength(8, 16))
// console.log(decimalBitLength(16, 16))
// console.log(decimalBitLength(0, 35))
// console.log(decimalBitLength(16, 19))

function decimalToBcd(decimalNumber, digitLength) {
  const decimalString = decimalNumber.toString().padStart(digitLength, '0')
  return [...decimalString].map(digit => parseInt(digit).toString(2).padStart(4, '0')).join('')
}

function codeToBcd(config, facilityCode, cardNumber, bits) {
  const fcDec = decimalBitLength(config.facilityCode.bit)
  const cnDec = decimalBitLength(config.cardNumber.bit)

  const cardNumberBcd = decimalToBcd(cardNumber, cnDec)

  if (facilityCode) {
    const facilityCodeBcd = decimalToBcd(facilityCode, fcDec)
    const result = facilityCodeBcd + cardNumberBcd
    return result.padStart(bits, '0')
  } else {
    return cardNumberBcd.padStart(bits, '0')
  }
}
