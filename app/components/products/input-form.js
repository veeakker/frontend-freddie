import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ProductsInputFormComponent extends Component {

  @action
  submit(event){
    event.preventDefault();

    this.args.submit();
  }
}
