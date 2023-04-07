const async = require('async');
const fileUploadMixin = require('@form-wizard-framework/file-upload').mixin;

module.exports = (Controller) => {
  Controller = fileUploadMixin(Controller);

  return class extends Controller {
    saveValues(req, res, next) {
      const fileFields = req.form.options.files;

      function saveLinkedFiles(fieldField, callback) {
        const file = req.form.values[fieldField];
        req.linkedFiles.add(file.data, (err, id) => {
          if (err) return callback(err);
          req.form.values[fieldField] = id;
          callback(null);
        });
      }

      async.each(fileFields, saveLinkedFiles, (err) => {
        if (err) return next(err);

        super.saveValues(req, res, next);
      });
    }
  };
};
