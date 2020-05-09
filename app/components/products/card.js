import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';

export default class ProductsCardComponent extends Component {
  transition = fade

  @service store

  @action
  async saveProduct(){
    const product = this.args.product;
    await product.save();
  }

  get shouldSave(){
    const product = this.args.product;

    return product.get('hasDirtyAttributes')
      || product.get('hasDirtyRelationships');
  }
}
