import EmberObject from '@ember/object';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ProductGroupsProductManagementNewProductFormComponent extends Component {
  init(){
    this._super(...arguments);

    this.product = EmberObject.new();
  }

  @action
  create(){
    this.args.onCreate();
  }
}
