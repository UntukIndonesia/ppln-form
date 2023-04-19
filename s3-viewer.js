'use strict';

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { Router } = require('express');
const { config } = require('@kbridenhaag/kbridh-app');

const router = Router();

router.get('/s3/:key', (req, res, next) => {
  const key = req.params.key;

  if (!key) return next();

  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };

  const authorization = req.headers.authorization;

  if (!authorization) {
    return reject();
  }

  const [username, password] = Buffer.from(
    authorization.replace('Basic ', ''),
    'base64'
  )
    .toString()
    .split(':');

  if (
    !(
      username === config.get('auth.username') &&
      password === config.get('auth.password')
    )
  ) {
    return reject();
  }

  const command = new GetObjectCommand({
    Bucket: config.get('s3.bucket'),
    Key: key,
  });

  const s3 = new S3Client({
    region: config.get('s3.region', 'eu-west-3'),
    credentials: config.get('s3.credentials'),
  });

  s3.send(command, (err, data) => {
    if (err) return next(err);
    data.Body.pipe(res);
  });
});

module.exports = router;
