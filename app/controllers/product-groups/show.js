import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import fade from 'ember-animated/transitions/fade';
import crossFadeTransition from 'frontend-freddie/utils/transitions/cross-fade';

export default class ProductGroupsShowController extends Controller {
  queryParams = [{ openProductIdString: "open" }];

  @tracked openProductIdString = "";

  get openProductIds(){
    return this.openProductIdString.split(",");
  }
  set openProductIds(values){
    this.openProductIdString = values.join(",");
  }

  get productGroup() {
    return this.model;
  }

  @action
  openProduct(product){
    this.openProductIds = [product.id, ...this.openProductIds];
  }
  @action
  closeProduct(product){
    this.openProductIds =
      [...this.openProductIds.filter( (x) => x != product.id )];
  }
  @action
  toggleShowProduct(product){
    const isOpen = this.openProductIds.includes( product.id );
    if( isOpen )
      this.closeProduct(product);
    else
      this.openProduct(product);
  }

  crossFade = crossFadeTransition
  transition = fade;
}
