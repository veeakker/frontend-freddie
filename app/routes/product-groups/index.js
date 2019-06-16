import { action } from '@ember/object';
import Route from '@ember/routing/route';

export default class ProductGroupsIndexRoute extends Route {
  model(){
    return this.store.query('product-group', { "filter[:has-no:parent-group]": "yes" });
  }

  @action
  reloadModel() {
    this.refresh();
  }
}
