import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class CommonQuantitativeValueInputComponent extends Component {
  @tracked
  selectedUnit = "GRM"

  @tracked
  amount = 0;

  @action
  updateSelectedUnit( unit ) {
    const quantitativeValue = this.args.value;

    quantitativeValue.unit = unit;

    if( unit == "C62" )
      quantitativeValue.value = 1;
    if( unit == "GRM" )
      quantitativeValue.value = 100;
    if( unit == "KGM" )
      quantitativeValue.value = 1;
  }
}
