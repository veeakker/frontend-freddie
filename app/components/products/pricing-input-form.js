import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';

class TempOffering {
  @tracked unitPrice = null;

  @tracked typeAndQuantity = null;

  constructor( { unitPrice, typeAndQuantity } = {} ) {
    this.unitPrice = unitPrice;
    this.typeAndQuantity = typeAndQuantity;
  }
}

class TempOfferingValue {
  @tracked value = null;

  @tracked unit = null;

  constructor( { value, unit } = {} ) {
    this.value = value;
    this.unit = unit;
  }

  set( property, value ) {
    this[property] = value;
  }
}

export default class ProductsPricingInputFormComponent extends Component {
  transition = fade;

  @tracked tempOffering = null

  @service store

  constructor(){
    super(...arguments);
    this.resetTempOffering();
  }

  get orderedOfferings() {
    return this.args.product.get('offerings').sortBy('typeAndQuantity.value');
  }

  get shouldSave() {
    return this.args.product.get('unitPrice.hasDirtyAttributes')
      || this.args.product.get('targetUnit.hasDirtyAttributes');
  }

  @action
  async saveProductPricing(event) {
    event.preventDefault();

    if( this.shouldSave ){
      (await this.args.product.get('unitPrice')).save();
      (await this.args.product.get('targetUnit')).save();
    }
  }

  @action
  async updateOffering(offering){
    await (await offering.unitPrice).save();
    await (await offering.typeAndQuantity).save();
    await offering.save();
  }

  @action
  async updatePrices(){
    const offerings = await this.args.product.offerings;
    offerings.forEach( async (offering) => {
      await offering.unitPrice;
      await offering.typeAndQuantity;
      offering.calculatePricingSync( this.args.product );
    } );
  }

  resetTempOffering(){
    this.tempOffering = new TempOffering({
      unitPrice: new TempOfferingValue(),
      typeAndQuantity: new TempOfferingValue()
    });
  }

  @action
  async removeOffering(offering) {
    const offerings = await this.args.product.offerings;
    offerings.removeObject(offering);
    await offerings.save();
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


}
