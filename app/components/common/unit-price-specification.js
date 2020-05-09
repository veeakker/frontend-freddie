import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class CommonUnitPriceSpecificationComponent extends Component {
  @action
  updateValue(event){
    const ups = this.args.value;
    const targetValue = parseFloat( event.target.value || "0" );
    if( ups.set ) {
      ups.set( 'value', targetValue );
    } else {
      ups.value = targetValue;
    }
  }
}
