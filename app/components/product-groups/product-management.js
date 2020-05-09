import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';
import { crossFadeAndMatch } from 'frontend-freddie/utils/transitions/cross-fade';

class TempUnitPriceSpecification {
  @tracked unit = "GMS";

  @tracked value = undefined;
}

class TempQuantVal {
  @tracked unit = "GMS";

  @tracked value = undefined;
}

class TempProduct {
  @tracked label = "";

  @tracked altLabel = "";

  @tracked sortIndex = 0;

  @tracked priceSpecification = null;

  @tracked targetUnit = null;


  constructor( { label, altLabel, sortIndex } ){
    this.label = label;
    this.altLabel = altLabel;
    this.sortIndex = sortIndex;
    this.unitPrice = new TempUnitPriceSpecification();
    this.targetUnit = new TempQuantVal();
  }
}

export default class ProductGroupsProductManagementComponent extends Component {
  @service store

  crossFadeAndMatch = crossFadeAndMatch
  transition=fade

  @tracked state = "init"

  @tracked product = null

  constructor() {
    super(...arguments);
    this.resetTempProduct();
  }

  resetTempProduct() {
    this.product = new TempProduct({ label: null, altLabel: null, sortIndex: null });
  }

  @action
  async createProduct(){
    const unitPrice = this.store.createRecord( 'unit-price-specification', {
      unit: this.product.unitPrice.unit,
      value: this.product.unitPrice.value
    } );

    const targetUnit = this.store.createRecord( 'quantitative-value', {
      unit: this.product.targetUnit.unit,
      value: this.product.targetUnit.value
    } );

    await unitPrice.save();

    await targetUnit.save();

    const product = this.store.createRecord( 'product', {
      label: this.product.label,
      altLabel: this.product.altLabel,
      sortIndex: this.product.sortIndex,
      productGroups: [ this.args.productGroup ],
      unitPrice: unitPrice,
      targetUnit: targetUnit
    } );

    await product.save();

    this.resetTempProduct();
    this.state = "init";
  }

}
