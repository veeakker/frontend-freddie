import Model, { attr, belongsTo } from '@ember-data/model';

export default class TypeAndQuantityModel extends Model {
  @attr('number') value;
  @attr() unit; // GRM = g; KGM = kg; C62 = 1
  @belongsTo('product') product;

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
