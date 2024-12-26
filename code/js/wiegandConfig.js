const wiegandConfig = {
  'w26-H10301': {
    format: 'w26-H10301',
    facilityCode: { bit: 8, hidden: false },
    cardNumber: { bit: 16 },
    epBit: 12,
    opBit: 12
  },
  'w34-H10306': {
    format: 'w34-H10306',
    facilityCode: { bit: 16, hidden: false },
    cardNumber: { bit: 16 },
    epBit: 16,
    opBit: 16
  },
  'w35-Corporate-1000': {
    format: 'w35-Corporate-1000',
    facilityCode: { bit: 12, hidden: false },
    cardNumber: { bit: 20 },
    epBit: 22,
    op1Bit: 22,
    op2Bit: 34
  },
  'w37-H10302': {
    format: 'w37-H10302',
    facilityCode: { bit: 0, hidden: true },
    cardNumber: { bit: 35 },
    epBit: 18,
    opBit: 18
  },
  'w37-H10304': {
    format: 'w37-H10304',
    facilityCode: { bit: 16, hidden: false },
    cardNumber: { bit: 19 },
    epBit: 18,
    opBit: 18
  }
}
