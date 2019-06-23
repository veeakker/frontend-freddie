import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import EmberObject from '@ember/object';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';
import crossFade from 'frontend-freddie/utils/transitions/cross-fade';
import { crossFadeAndMatch } from 'frontend-freddie/utils/transitions/cross-fade';

class TempProduct {
  @tracked
  label = ""

  @tracked
  sortIndex = 0

  constructor( { label, sortIndex } ){
    this.label = label;
    this.sortIndex = sortIndex;
  }
}

export default class ProductGroupsProductManagementComponent extends Component {
  @service store

  crossFadeAndMatch = crossFadeAndMatch
  transition=fade

  @tracked
  state = "init"

  @tracked
  product = null

  constructor() {
    super(...arguments);
    this.resetTempProduct();
  }

  resetTempProduct() {
    this.product = new TempProduct({ label: null, sortIndex: null });
  }

  @action
  async createProduct(){
    const product = this.store.createRecord( 'product', {
      label: this.product.label,
      sortIndex: this.product.sortIndex,
      productGroups: [ this.args.productGroup ]
    } );
    await product.save();
    this.resetTempProduct();
    this.state = "init";
  }
  
}
