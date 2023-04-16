'use strict';

module.exports = (Controller) =>
  class extends Controller {
    middlewareChecks() {
      super.middlewareChecks();
      this.use(this.checkFromBackLink);
      this.use(this.checkFileUploaded);
    }

    checkFromBackLink(req, res, next) {
      const isBackLink = req.query.backlink === 'true';

      if (!isBackLink) {
        return next();
      }

      const isFileChecked = !!req.sessionModel.get('check-passport');

      if (!isFileChecked) {
        req.shouldUnset = true;
      }

      const backLink = this._backlinksGetHistoryStep(req, res);

      return res.redirect(backLink);
    }
    checkFileUploaded(req, res, next) {
      const shouldUnset = req.query.unset === 'true' || req.shouldUnset;

      if (shouldUnset) {
        req.sessionModel.unset('passport');
      }

      const isUploaded = !!req.sessionModel.get('passport');

      if (!isUploaded) {
        return next();
      }

      return this.successHandler(req, res, next);
    }
  };
