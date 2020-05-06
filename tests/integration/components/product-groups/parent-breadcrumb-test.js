import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | product-groups/parent-breadcrumb', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{product-groups/parent-breadcrumb}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#product-groups/parent-breadcrumb}}
        template block text
      {{/product-groups/parent-breadcrumb}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
