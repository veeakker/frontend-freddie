import { action } from '@ember/object';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';

export default class ProductsCardComponent extends Component {
  transition = fade

  @action
  async saveProduct(event){
    const product = this.args.product;
    await product.save();
    await (await product.unitPrice).save();
    await (await product.targetUnit).save();
    console.log('saved it all');
  }

  get shouldSave(){
    const product = this.args.product;

    return product.get('hasDirtyAttributes')
      || product.get('unitPrice.hasDirtyAttributes')
      || product.get('targetUnit.hasDirtyAttributes');
  }
}
