import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class CardArrayCardComponent extends Component {
  @computed('args.raised')
  get raisedClass() {
    const result = this.args.raised && "raised";
    return result;
  }
}
