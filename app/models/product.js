import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default class ProductModel extends Model {
  @attr() label;
  @attr() altLabel;
  @attr('number') sortIndex;
  @hasMany('product-group') productGroups;
  @hasMany('offering') offerings;
  @belongsTo('unit-price-specification') unitPrice;
  @belongsTo('quantitative-value') targetUnit;
  @belongsTo('file') thumbnail;

  hasDirtyRelationships = false;

  async awaitUnitPrice(){
    await this.unitPrice;
    if( this.unitPrice.content ){
      return this.unitPrice;
    } else {
      set( this, "unitPrice", this.store.createRecord("unit-price-specification" ) );
      return this.unitPrice;
    }
  }

  get ensuredUnitPrice(){
    if( this.unitPrice.content ) {
      return this.unitPrice;
    } else {
      this.awaitUnitPrice();
      return null;
    }
  }

  async awaitTargetUnit() {
    await this.targetUnit;
    if( this.targetUnit.content ) {
      return this.targetUnit;
    } else {
      set( this, "targetUnit", this.store.createRecord('quantitative-value') );
      return this.targetUnit;
    }
  }

  get ensuredTargetUnit(){
    if( this.targetUnit.content ) {
      return this.targetUnit;
    } else {
      this.awaitTargetUnit();
      return null;
    }
  }

  async save(){
    await super.save();
    this.set('hasDirtyRelationships', false);
  }
}
