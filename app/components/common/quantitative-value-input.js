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
    this.selectedUnit = unit;
    if( unit == "C62" )
      this.amount = 1;
    if( unit == "GRM" )
      this.amount = 100;
    if( unit == "KGM" )
      this.amount = 1;
  }
}
