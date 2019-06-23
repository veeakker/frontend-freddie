import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class CommonUnitPriceSpecificationComponent extends Component {
  @tracked
  unit = "KGM"

  @action
  updateUnit(unit) {
    // TODO: Update the pricing if we switch from KGM to GRM?
    this.unit = unit;
  }
}
