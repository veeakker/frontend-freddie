import DS from 'ember-data';
const { Model, attr } = DS;

export default class QuantitativeValueModel extends Model {
  @attr() unit;
  @attr('number') value;

  get gramsPerUnit(){
    switch ( this.get('unit') ) {
    case "GRM":
      return 1.0;
    case "KGM":
      return 1000.0;
    default:
      return undefined;
    }
  }
}
