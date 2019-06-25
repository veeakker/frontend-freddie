import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class CommonQuantitativeValueInputComponent extends Component {
  @action
  updateValue(event){
    const stringValue = event.target.value || "0";
    if( this.args.value.unit == "KGM" )
      this.args.value.value = parseFloat( stringValue );
    else
      this.args.value.value = parseInt( stringValue );
  }

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
