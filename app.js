const { setup } = require('@kbridenhaag/kbridh-app');
const { options } = require('./config');
const { router } = setup({
  config: {
    seed: options,
  },
});

router.use(require('./lib/locals'));
