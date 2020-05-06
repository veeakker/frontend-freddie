import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | common/quantitative-value-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{common/quantitative-value-input}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#common/quantitative-value-input}}
        template block text
      {{/common/quantitative-value-input}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
