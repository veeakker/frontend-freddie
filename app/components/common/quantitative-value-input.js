import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class CommonQuantitativeValueInputComponent extends Component {
  @action
  updateSelectedUnit( unit ) {
    const quantitativeValue = this.args.value;

    quantitativeValue.set('unit', unit);

    if( unit == "C62" )
      quantitativeValue.set('value', 1);
    if( unit == "GRM" )
      quantitativeValue.set('value', 100);
    if( unit == "KGM" )
      quantitativeValue.set('value', 1);
  }
}
