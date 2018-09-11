const assert = require('assert');
const app = require('../../src/app');

describe('\'sale\' service', () => {
  it('registered the service', () => {
    const service = app.service('sale');

    assert.ok(service, 'Registered the service');
  });
});
