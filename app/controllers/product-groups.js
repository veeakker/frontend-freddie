import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductGroupsController extends Controller {
  @computed( "model.@each.sortIndex" )
  get sortedProductGroups() {
    return this.get('model').sortBy('sortIndex');
  }

}
