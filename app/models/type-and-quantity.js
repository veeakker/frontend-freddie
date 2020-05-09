import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class TypeAndQuantityModel extends Model {
  @attr('number') value;
  @attr() unit; // GRM = g; KGM = kg; C62 = 1
  @belongsTo('product') product;

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
};
