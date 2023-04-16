'use strict';
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { config } = require('@kbridenhaag/kbridh-app');
const detect = require('detect-file-type');

module.exports = (Controller) =>
  class extends Controller {
    constructor(options) {
      super(options);

      this.s3 = new S3Client({
        region: config.get('s3.region', 'eu-west-3'),
        credentials: config.get('s3.credentials'),
      });

      const uploadKey = options.uploadKey;

      if (!uploadKey) {
        throw new Error('No file to upload');
      }

      this.uploadKey = uploadKey;
    }

    saveValues(req, res, next) {
      this.uploadToS3(req, (err) => {
        if (err) return next(err);

        super.saveValues(req, res, next);
      });
    }

    uploadToS3(req, callback) {
      this.getFileFromCache(req, (err, file) => {
        if (err) return callback(err);

        const command = new PutObjectCommand({
          Bucket: config.get('s3.bucket'),
          Key: file.name,
          Body: file.data,
        });

        this.s3.send(command, (err) => {
          if (err) return callback(err);

          req.sessionModel.set(this.uploadKey + '-s3', file.name);

          callback(null);
        });
      });
    }

    getFileFromCache(req, callback) {
      const id = req.sessionModel.get(this.uploadKey);

      req.linkedFiles.get(id, (err, buffer) => {
        if (err) return callback(err);

        detect.fromBuffer(buffer, (err, info) => {
          if (err) return callback(err);

          const file = {
            name: `${id}.${info.ext}`,
            mime: info.mime,
            data: buffer,
          };

          callback(null, file);
        });
      });
    }
  };
