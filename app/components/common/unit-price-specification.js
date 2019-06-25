import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class CommonUnitPriceSpecificationComponent extends Component {

  @action
  updateValue(event){
    this.args.value.value = parseFloat( event.target.value || "0" );
  }
}
