import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class CommonQuantitativeValueInputComponent extends Component {
  @action
  updateValue(event){
    const stringValue = event.target.value || "0";
    let value = null;
    const unit = this.args.value.get ? this.args.value.get('unit') : this.args.value.unit;

    if( unit == "KGM" )
      value = parseFloat( stringValue );
    else
      value = parseInt( stringValue );

    if ( this.args.value.set )
      this.args.value.set('value', value);
    else
      this.args.value.value = value;
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
