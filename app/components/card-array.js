import Component from '@glimmer/component';

export default class CardArrayComponent extends Component {
  get cardColorClass() {
    return `card-array-card card-array-${this.args.color}`;
  }
}
