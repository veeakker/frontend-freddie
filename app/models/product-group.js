import { computed } from '@ember/object';
import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default class ProductGroupModel extends Model {
  @attr() label;
  @attr('number') sortIndex;
  @belongsTo('product-group', { inverse: 'childGroups' }) parentGroup;
  @hasMany('product-group', { inverse: 'parentGroup' }) childGroups;
  @hasMany('product') spotlightProducts;
  @hasMany('product', { inverse: "productGroups" }) products;

  @computed('childGroups.@each.sortIndex')
  get sortedChildren() {
    return (this.childGroups || []).sortBy('sortIndex');
  }

  // TODO: This does not always recompute.  Figure out solution
  @computed('products.@each.sortIndex')
  get sortedProducts() {
    return (this.products || []).sortBy('sortIndex');
  }
}
