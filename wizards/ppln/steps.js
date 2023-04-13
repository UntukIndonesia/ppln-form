const BaseController = require('hmpo-form-wizard').Controller;
const dateMixin = require('hmpo-components').mixins.Date;
const addressLookupMixin = require('@form-wizard-framework/address-lookup/lib/nl/postcode-api/mixin');
const { config } = require('@kbridenhaag/kbridh-app');
const fileUploadMixin = require('../../lib/mixins/file-upload');

module.exports = {
  '/': {
    entryPoint: true,
    skip: true,
    resetJourney: true,
    next: 'start',
  },
  '/start': {
    template: 'kbridh-form-template.html',
    next: 'basic-details',
    start: true,
  },
  '/basic-details': {
    fields: ['name', 'sex'],
    template: 'kbridh-form-template.html',
    next: 'date-of-birth',
  },
  '/date-of-birth': {
    fields: ['date-of-birth', 'place-of-birth'],
    template: 'kbridh-form-template.html',
    controller: dateMixin(BaseController),
    next: 'marital-status',
  },
  '/marital-status': {
    fields: ['marital-status'],
    template: 'kbridh-form-template.html',
    next: 'address',
  },
  '/address': {
    fields: ['address'],
    controller: addressLookupMixin(BaseController),
    addressLookup: config.get('addressLookup'),
    next: 'check-address',
  },
  '/check-address': {
    fields: ['check-address'],
    template: 'kbridh-form-template.html',
    next: [
      { field: 'check-address', value: 'NO', next: 'address' },
      'tni-or-polri',
    ],
  },
  '/tni-or-polri': {
    fields: ['tni-or-polri'],
    template: 'kbridh-form-template.html',
    next: 'ktp-usage',
  },
  '/ktp-usage': {
    fields: ['ktp-usage'],
    template: 'kbridh-form-template.html',
    next: 'passport-details',
  },
  '/passport-details': {
    fields: ['passport-number'],
    template: 'kbridh-form-template.html',
    next: [
      {
        fn: (req) => !!req.sessionModel.get('passport'),
        next: 'check-passport',
      },
      'upload-passport',
    ],
  },
  '/upload-passport': {
    fields: ['passport'],
    controller: fileUploadMixin(BaseController),
    fileUpload: {
      fileUpload: {
        limit: '15mb',
      },
    },
    next: 'check-passport',
  },
  '/check-passport': {
    backLink: 'passport-details',
    fields: ['check-passport'],
    template: 'check-passport.html',
    next: [
      {
        field: 'check-passport',
        value: 'NO',
        next: (req) => {
          req.sessionModel.unset('passport');
          return 'upload-passport';
        },
      },
      'nik-and-nkk',
    ],
  },
  '/nik-and-nkk': {
    fields: ['nik', 'nkk'],
    template: 'kbridh-form-template.html',
    next: 'disability',
  },
  '/disability': {
    fields: ['disability'],
    template: 'kbridh-form-template.html',
    next: 'voting-method',
  },
  '/voting-method': {
    fields: ['voting-method'],
    template: 'kbridh-form-template.html',
    next: 'contact-details',
  },
  '/contact-details': {
    fields: ['email', 'tel'],
    template: 'kbridh-form-template.html',
    next: 'submit',
  },
  '/submit': {
    skip: true,
    next: 'done',
  },
  '/done': {
    backLink: null,
    template: 'kbridh-template.html',
    noPost: true,
  },
};
