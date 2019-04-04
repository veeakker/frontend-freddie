import Route from '@ember/routing/route';

export default class ProductGroupsRoute extends Route {
  model(){
    return this.store.query('product-group', { "filter[:has-no:parent-group]": "yes" });
  }
}
