import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ProductsDescriptionInputFormComponent extends Component {
  @action
  saveProduct(event){
    event.preventDefault();
    this.args.product.save();
  }
}
