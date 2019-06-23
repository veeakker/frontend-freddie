import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ProductGroupsProductManagementNewProductFormComponent extends Component {
  @action
  updateSortIndex(event){
    const value = parseInt(event.target.value) || 0;
    this.args.product.sortIndex = value;
  }

  @action
  updateLabel(event){
    const value = event.target.value;
    this.args.product.label = value;
  }

  @action
  onCreate(event){
    event.preventDefault();
    this.args.onCreate();
  }
}
