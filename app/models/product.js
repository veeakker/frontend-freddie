import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import DS from 'ember-data';
import fetchProp from '../utils/decorators/fetch-prop';

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

  @fetchProp( "unitPrice", "unit-price-specification" ) get ensuredUnitPrice(){};
  @fetchProp( "targetUnit", "quantitative-value" ) get ensuredTargetUnit(){};

  async save(){
    await super.save();
    this.set('hasDirtyRelationships', false);
  }
}
