import { set } from '@ember/object';
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

    set( this, 'args.value.value', value );
  }

  @action
  updateSelectedUnit( unit ) {
    const quantitativeValue = this.args.value;

    set(quantitativeValue, 'unit', unit);

    if( unit == "C62" )
      set(quantitativeValue, 'value', 1);
    if( unit == "GRM" )
      set(quantitativeValue, 'value', 100);
    if( unit == "KGM" )
      set(quantitativeValue, 'value', 1);
  }
}
