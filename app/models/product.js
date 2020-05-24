import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import fetchProp from '../utils/decorators/fetch-prop';

export default class ProductModel extends Model {
  @attr() label;
  @attr() altLabel;
  @attr() description;
  @attr('number') sortIndex;
  @attr('uri-set') productLabels;
  @hasMany('product-group') productGroups;
  @hasMany('offering') offerings;
  @belongsTo('unit-price-specification') unitPrice;
  @belongsTo('quantitative-value') targetUnit;
  @belongsTo('file') thumbnail;

  hasDirtyRelationships = false;

  @fetchProp( "unitPrice", "unit-price-specification" ) ensuredUnitPrice;
  @fetchProp( "targetUnit", "quantitative-value" ) ensuredTargetUnit;

  async save(){
    await super.save();
    this.set('hasDirtyRelationships', false);
  }
}
