import { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';

class TempOffering {
  @tracked
  unitPrice = null;

  @tracked
  typeAndQuantity = null;

  constructor( { unitPrice, typeAndQuantity } = {} ) {
    this.unitPrice = unitPrice;
    this.typeAndQuantity = typeAndQuantity;
  }
}

class TempOfferingValue {
  @tracked
  value = null;

  @tracked
  unit = null;

  constructor( { value, unit } = {} ) {
    value = value;
    unit = unit;
  }

  set( property, value ) {
    this[property] = value;
  }
}

export default class ProductsCardComponent extends Component {
  transition = fade

  @service store

  @tracked
  tempOffering = null

  constructor(){
    super(...arguments);
    this.resetTempOffering();
  }

  resetTempOffering(){
    console.log("creating temp offering");
    this.tempOffering = new TempOffering({
      unitPrice: new TempOfferingValue(),
      typeAndQuantity: new TempOfferingValue()
    });
  }

  @action
  async saveProduct(){
    const product = this.args.product;
    await product.save();
    await (await product.unitPrice).save();
    await (await product.targetUnit).save();
  }

  @action
  async createOffering(event){
    event.preventDefault();
    const product = this.args.product;
    const to = this.tempOffering;
    const unitPrice = this.store.createRecord('unit-price-specification', {
      unit: to.unitPrice.unit,
      value: to.unitPrice.value
    });
    const typeAndQuantity = this.store.createRecord('type-and-quantity', {
        value: to.typeAndQuantity.value,
        unit: to.typeAndQuantity.unit,
        product: product
    });
    const offering = this.store.createRecord('offering', {
      unitPrice, typeAndQuantity
    });

    await unitPrice.save();
    await typeAndQuantity.save();
    await offering.save();
    product.offerings.pushObject( offering );
    product.save();

    this.resetTempOffering();
  }

  @action
  async updateOffering(offering){
    await (await offering.unitPrice).save();
    await (await offering.typeAndQuantity).save();
    await offering.save();
  }

  get shouldSave(){
    const product = this.args.product;

    return product.get('hasDirtyAttributes')
      || product.get('unitPrice.hasDirtyAttributes')
      || product.get('targetUnit.hasDirtyAttributes');
  }
}
