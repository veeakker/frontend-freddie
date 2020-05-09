import Model, { belongsTo } from '@ember-data/model';

export default class OfferingModel extends Model {
  @belongsTo('unit-price-specification') unitPrice;
  @belongsTo('type-and-quantity') typeAndQuantity;

  calculatePricingSync( product ) {
    const offering = this;
    // the product's price (specified first)
    const productPrice = product.get('unitPrice');
    const productPriceUnit = product.get('unitPrice.unit');
    const productPricePrice = product.get('unitPrice.value');
    // the product's comparison to unit (specified second)
    const productTarget = product.get('targetUnit');
    const productUnitUnit = product.get('targetUnit.unit');
    const productUnitValue = product.get('targetUnit.value');
    // the offering's amount/unit (and optionally price)
    const offeringPriceUnit = offering.get('unitPrice.unit');
    const offeringAmount = offering.get('typeAndQuantity');
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
    if( productPriceUnit != "C62" && offeringAmountUnit != "C62" ) {

      // const productUnitPriceMultiplier = unitMultiplier( product.get('unitPrice') );
      // const offeringAmountUnitMultiplier = unitMultiplier( product.get('offeringAmountUnit') );

      offering.set('unitPrice.unit', "C62");
      offering.set('unitPrice.value', // price = amount * price/amount (& reorder for rounding errors)
                   (1.0
                    * productPricePrice
                    * offeringAmountAmount
                    * offeringAmount.get('gramsPerUnit')
                    / productPrice.get('gramsPerUnit'))
                   .toFixed(2));
    }

    // if the unit of the product kg, and we are units
    // -> use normalized amount to calculate our target value <-- most common case
    if( productPriceUnit != "C62" && productUnitUnit != "C62" // product specified in weight
        && offeringAmountUnit == "C62" ) {

      // const productUnitPriceMultiplier = unitMultiplier( product.get('unitPrice') );
      // const targetUnitMultiplier = unitMultiplier( product.get('targetUnit') );

      // variables:
      // - offeringAmountAmount: The amount of items ordered
      // - product.unitPrice: Price of the product, specified in weight

      // Calculate the price for *one* unit
      const pricePerPiece =
        productPricePrice
        * productUnitValue
        * productTarget.get('gramsPerUnit')
        / productPrice.get('gramsPerUnit');

      offering.set('unitPrice.unit', "C62");
      offering.set('unitPrice.value',
                   (pricePerPiece * offeringAmountAmount).toFixed(2));
    }
  }
}
