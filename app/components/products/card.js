import { action } from '@ember/object';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';

export default class ProductsCardComponent extends Component {
  transition = fade

  @action
  saveProduct(event){
    this.args.product.save();
  }
}
