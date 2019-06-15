import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';
import scale from 'ember-animated/motions/scale';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';
import { wait } from 'ember-animated';

export default class ProductGroupCardComponent extends Component {
  @action
  sortedChildren() {
    /* do nothing */
  }

  emptyArary = []

  /* -- Open state -- */
  @tracked isOpen = false

  headerTransition = function*( { insertedSprites, removedSprites, duration }) {
    const [ insertedSprite ] = insertedSprites;
    const [ removedSprite ] = removedSprites;

    removedSprite.endAtSprite( insertedSprite );
    insertedSprite.startAtSprite( removedSprite );

    for ( const sprite of [ insertedSprite, removedSprite ] ) {
      scale( sprite, duration );
      move( sprite, duration );
    }

    insertedSprite.hide();

    fadeOut( removedSprite, 2 * duration / 3 );
    yield wait( duration / 2 );
    insertedSprite.reveal();
    fadeIn( insertedSprite, 2 * duration / 3 );
  }

  /* -- editing state -- */

  @tracked
  editing = false;

  @action
  toggleEditing(){
    this.editing = !this.editing;
  }

  transition = fade;

  /* -- editing functionality -- */
  @action
  update() {
    this.args.productGroup.save();
  }

  @action
  undo() {
    this.args.productGroup.rollbackAttributes();
  }

  /* -- creation functionality -- */

}
