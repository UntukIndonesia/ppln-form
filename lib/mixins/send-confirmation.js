'use strict';

const sendEmailMixin = require('@kbridenhaag/kbridh-emails').mixin;

module.exports = (Controller) => {
  return class extends sendEmailMixin(Controller) {
    recipient(req) {
      return req.sessionModel.get('email');
    }
  };
};
