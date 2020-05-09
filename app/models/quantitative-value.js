import Model, { attr } from '@ember-data/model';

export default class QuantitativeValueModel extends Model {
  @attr() unit;
  @attr('number') value;

  get gramsPerUnit(){
    switch ( this.unit ) {
    case "GRM":
      return 1.0;
    case "KGM":
      return 1000.0;
    default:
      return undefined;
    }
  }
}
