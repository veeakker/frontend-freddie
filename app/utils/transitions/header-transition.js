import scale from 'ember-animated/motions/scale';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';
import { wait } from 'ember-animated';

export default function*( { insertedSprites, removedSprites, duration }) {
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

