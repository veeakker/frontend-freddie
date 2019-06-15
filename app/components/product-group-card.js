import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class ProductGroupCardComponent extends Component {
  @tracked isOpen = false

  @action
  sortedChildren(...args){
    // console.log("sorting children");
    // console.log(args);
  }
}
