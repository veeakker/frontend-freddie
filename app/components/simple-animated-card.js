import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';

export default class SimpleAnimatedCardComponent extends Component {
  transition = fade;
}
