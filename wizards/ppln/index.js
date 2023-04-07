const express = require('express');
const wizard = require('hmpo-form-wizard');

const router = express.Router();

router.use(
  wizard(require('./steps'), require('./fields'), {
    name: 'ppln-form',
  })
);

module.exports = router;
