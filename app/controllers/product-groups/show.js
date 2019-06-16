import Controller from '@ember/controller';
import fade from 'ember-animated/transitions/fade';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import scale from 'ember-animated/motions/scale';

export default class ProductGroupsShowController extends Controller {
  fadeAndScale = function*( {insertedSprites, removedSprites, keptSprites} ) {
    for( const sprite of [ ...insertedSprites, ...keptSprites ] ) {
      fadeIn( sprite );
    }

    for( const sprite of removedSprites ) {
      fadeOut( sprite );
    }
  }

  transition = fade;
}
