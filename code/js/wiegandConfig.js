const wiegandConfig = {
  'w26-H10301': {
    facilityCode: { bit: 8, show: true },
    cardNumber: { bit: 16 },
    epBit: 12,
    opBit: 12
  },
  'w34-H10306': {
    facilityCode: { bit: 16, show: true },
    cardNumber: { bit: 16 },
    epBit: 16,
    opBit: 16
  },
  'w37-H10302': {
    facilityCode: { bit: 0, show: false },
    cardNumber: { bit: 35 },
    epBit: 18,
    opBit: 18
  },
  'w37-H10304': {
    facilityCode: { bit: 16, show: true },
    cardNumber: { bit: 19 },
    epBit: 18,
    opBit: 18
  }
}
