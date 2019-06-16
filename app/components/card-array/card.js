import { computed } from '@ember/object';
import Component from '@glimmer/component';

export default class CardArrayCardComponent extends Component {
  get raisedClass() {
    return this.args.raised ? "raised" : "";
  }
}
