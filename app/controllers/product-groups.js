import { tracked } from '@glimmer/tracking';
import { computed, action } from '@ember/object';
import Controller from '@ember/controller';

import { wait } from 'ember-animated';
import { fadeIn } from 'ember-animated/motions/opacity';
import fade from 'ember-animated/transitions/fade';

export default class ProductGroupsController extends Controller {
  /* -- Sorting -- */
  @tracked sortProperty = 'sortIndex'
  @tracked sortProperties = ['sortIndex', 'label']

  @computed( "model.@each.sortIndex" )
  get sortedProductGroups() {
    return this.get('model').sortBy(this.sortProperty);
  }

  @action
  updateSort( newProperty ){
    this.sortProperty = newProperty;
  }

  /* -- Editing -- */
  @tracked
  editing = false

  @action
  toggleEditing() {
    this.editing = ! this.editing;
  }

  fade = fade;

  /* -- Animations -- */
  * productGroupsTransition( { insertedSprites, duration } ) {
    debugger;

    const timeout = duration / 10;

    for( const sprite of insertedSprites ) {
      fadeIn( sprite, duration );
      yield wait( timeout );
    }
  }
}
