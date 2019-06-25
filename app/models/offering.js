import DS from 'ember-data';
const { Model, belongsTo } = DS;

export default class OfferingModel extends Model {
  @belongsTo('unit-price-specification') unitPrice;
  @belongsTo('type-and-quantity') typeAndQuantity;

  calculatePricingSync( product ) {
    const offering = this;
    const productPriceUnit = product.get('unitPrice.unit');
    const productPricePrice = product.get('unitPrice.value');
    const productUnitUnit = product.get('targetUnit.value');
    const productUnitValue = product.get('targetUnit.value');
    const offeringPriceUnit = offering.get('unitPrice.unit');
    const offeringAmountAmount = offering.get('typeAndQuantity.value');
    const offeringAmountUnit = offering.get('typeAndQuantity.unit');

    // check the unit of the product
    // -> if the unit of product is piece and our unit is not, error
    if( productPriceUnit == "C62" && offeringPriceUnit !== "C62" ) {
      // eslint-disable-next-line no-console
      console.log("Cannot set price when product is in units but offering is not");
      return;
    }

    // if the unit of product == our unit
    // -> divide/multiply to get new result
    if( productPriceUnit == offeringPriceUnit ) {
      offering.set('unitPrice.value', (1.0 * productPricePrice * offeringAmountAmount).toFixed(2));
      offering.set('typeAndQuantity.unit', productPriceUnit);
    }

    // if the unit of product is weight and we are weight
    // -> convert units to same scale to get new result
    const unitMultiplier = function( amountObj ) {
      if( amountObj.get('unit') == "GRM" )
        return 1.0;
      if( amountObj.get('unit') == "KGM" )
        return 1000.0;
      return undefined; // C62
    };

    if( productPriceUnit != "C62" && offeringAmountUnit != "C62" ) {
      offering.set('unitPrice.unit', "C62");
      offering.set('unitPrice.value', // price = amount * price/amount (& reorder for rounding errors)
                   (1.0
                    * productPricePrice
                    * offeringAmountAmount
                    / ( unitMultiplier( offering.get('typeAndQuantity') )
                        * unitMultiplier( product.get('unitPrice'))))
                   .toFixed(2));
    }

    // if the unit of the product kg, and we are units
    // -> use normalized amount to calculate our target value <-- most common case
    if( productPriceUnit != "C62" && productUnitUnit != "C62" // product specified in weight
        && offeringAmountUnit == "C62" ) {
      const pricePerPiece =
            productPricePrice
            * productUnitValue
            / ( unitMultiplier( product.get('unitPrice') )
                * unitMultiplier( product.get('targetUnit') ) );

      offering.set('unitPrice.unit', "C62");
      offering.set('unitPrice.value',
                   (pricePerPiece * offeringAmountAmount).toFixed(2));
    }
  }
}
