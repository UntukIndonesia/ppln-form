const { mimetype, fileSize } =
  require('@form-wizard-framework/file-upload').validators;

module.exports = {
  name: {
    type: 'text',
    validate: ['required'],
    formatter: 'uppercase',
  },
  sex: {
    type: 'radios',
    validate: ['required'],
    options: ['MALE', 'FEMALE'],
  },
  'date-of-birth': {
    type: 'date',
    validate: ['required', 'date'],
  },
  'place-of-birth': {
    type: 'text',
    validate: ['required'],
    formatter: 'uppercase',
  },
  'marital-status': {
    type: 'radios',
    validate: ['required'],
    options: ['MARRIED', 'SINGLE', 'DIVORCED_OR_WIDOWED'],
  },
  address: {
    type: 'address-lookup',
    validate: ['required', 'postcode-lookup'],
  },
  'check-address': {
    type: 'radios',
    validate: ['required'],
    options: ['YES', 'NO'],
  },
  nik: {
    type: 'text',
  },
  nkk: {
    type: 'text',
  },
  'passport-number': {
    type: 'text',
    validate: ['required'],
  },
  passport: {
    type: 'file',
    invalidates: ['check-passport'],
    validate: [
      'required',
      {
        fn: mimetype,
        arguments: ['image/png', 'image/jpg', 'image/jpeg'],
      },
      {
        fn: fileSize,
        arguments: 5248800,
      },
    ],
  },
  'check-passport': {
    type: 'radios',
    validate: ['required'],
    options: ['YES', 'NO'],
  },
  'tni-or-polri': {
    type: 'radios',
    validate: ['required'],
    options: ['YES', 'NO'],
  },
  disability: {
    type: 'radios',
    validate: ['required'],
    options: [
      'NO_DISABILITY',
      'PHYSICAL_DISABILITY',
      'HEARING_DISABILITY',
      'VISUAL_DISABILITY',
      'MENTAL_DISABILITY',
      'OTHER_DISABILITY',
      'NOT_DISCLOSED',
    ],
  },
  'ktp-usage': {
    type: 'radios',
    validate: ['required'],
    options: ['YES', 'NO'],
  },
  'voting-method': {
    type: 'radios',
    validate: ['required'],
    options: ['TPS', 'POS'],
  },
  email: {
    type: 'text',
    validate: ['required', 'email'],
  },
  tel: {
    type: 'text',
    validate: ['required'],
  },
};
