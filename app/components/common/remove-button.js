import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class CommonRemoveButtonComponent extends Component {
  @tracked
  staged = false;
}
