import Component from '@glimmer/component';

export default class CardArrayComponent extends Component {
  get cardColorClass() {
    return `card-array-card card-array-${this.args.color}`;
  }

  colors = ["dark", "medium", "light"]

  get nestedColor(){
    const colorIndex = this.colors.indexOf( this.args.color );
    let nextColorIndex = (colorIndex + 1) % this.colors.length;
    nextColorIndex = nextColorIndex || 0;

    return this.colors[nextColorIndex];
  }

}
