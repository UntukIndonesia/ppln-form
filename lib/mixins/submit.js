'use strict';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { config } = require('@kbridenhaag/kbridh-app');

module.exports = (Controller) => {
  return class extends Controller {
    constructor(options) {
      super(options);

      this.doc = new GoogleSpreadsheet(config.get('sheetId'));
    }

    saveValues(req, res, next) {
      this.prepareValues(req, (err, values) => {
        if (err) return next(err)

        this.addToSheet(values)
          .then(() => super.saveValues(req, res, next))
          .catch(next);
      });
    }

    prepareValues(req, callback) {
      try {
        const values = {
          ...req.sessionModel.toJSON(),
          ...req.form.values,
        };

        const { address } = values;

        callback(null, {
          ...values,
          address: `${address.street} ${address.number}${address.extension}`,
          postcode: address.postcode,
          city: address.city,
          's3-url': config.get('url') + '/s3/' + values['passport-s3'],
        });
      } catch (err) {
        callback(err);
      }
    }

    async addToSheet(values) {
      await this.doc.useServiceAccountAuth({
        client_email: config.get('serviceAccount.email'),
        private_key: config.get('serviceAccount.privateKey'),
      });

      await this.doc.loadInfo();

      const sheet = this.doc.sheetsByIndex[0];

      await sheet.addRow(values);
    }
  };
};
