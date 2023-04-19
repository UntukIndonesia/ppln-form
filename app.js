const { setup } = require('@kbridenhaag/kbridh-app');
const detect = require('detect-file-type');
const { options } = require('./config');
const { router } = setup({
  config: {
    seed: options,
  },
});

router.use(require('./lib/locals'));

router.use('/linked-file/:id', (req, res, next) => {
  const id = req.params.id;

  req.linkedFiles.get(id, (err, buffer) => {
    if (err) return next(err);
    if (!buffer) return res.status(404).send('Not found');

    detect.fromBuffer(buffer, (err, info) => {
      if (err) return next(err);

      res.set('Content-Disposition', `inline; filename="${id}.${info.ext}"`);
      res.set('Content-Type', info.mime);

      res.send(buffer);
    });
  });
});

router.use(require('./s3-viewer'));

router.use('/', require('./wizards/ppln'));
