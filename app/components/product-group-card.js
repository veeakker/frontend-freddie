import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';

export default class ProductGroupCardComponent extends Component {
  @tracked isOpen = false

  @action
  sortedChildren(){
    // console.log("sorting children");
    // console.log(args);
  }

  transition = fade;
}
