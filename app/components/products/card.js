import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { wait } from 'ember-animated';

export default class ProductsCardComponent extends Component {
  *transition( {insertedSprites, removedSprites, duration} ) {
    for( const sprite of insertedSprites ) {
      fadeIn( sprite );
    }

    for( const sprite of removedSprites ) {
      fadeOut( sprite, { duration: 4 * duration / 5, to: 0.8 });
    }

    yield wait( duration * 4 / 5 );
    for( const sprite of removedSprites ) {
      fadeOut( sprite, { duration: duration / 5, to: 0 } );
    }

  }

  @service store

  @action
  async saveProduct(){
    const product = this.args.product;
    await product.save();
  }

  get shouldSave(){
    const product = this.args.product;

    return product.get('hasDirtyAttributes')
      || product.get('hasDirtyRelationships');
  }
}
