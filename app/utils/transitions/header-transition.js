import scale from 'ember-animated/motions/scale';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';
import { wait } from 'ember-animated';

export default function*( { insertedSprites, removedSprites, keptSprites, duration }) {
  const [ insertedSprite, ...otherInsertedSprites ] = insertedSprites;
  const [ removedSprite, ...otherRemovedSprites ] = removedSprites;

  let keptSprite, otherKeptSprites = [];
  if( keptSprites.length > 0 ) {
    [ keptSprite, ...otherKeptSprites ] = keptSprites;
  }

  if( insertedSprite && removedSprite ) {
    // if for race conditions
    removedSprite.endAtSprite( insertedSprite );
    insertedSprite.startAtSprite( removedSprite );
  }

  for ( const sprite of [ insertedSprite, removedSprite, keptSprite ] ) {
    if( sprite && sprite.finalBounds ) { // keptSprite might be undefined
      scale( sprite, duration );
      move( sprite, duration );
    } else if( sprite ) {
      sprite.hide();
    }
  }

  for (const sprite of [...otherInsertedSprites, ...otherKeptSprites] ) {
    sprite.startTranslatedBy({dx: removedSprite.initialBounds.width, dy: 0});
    move( sprite );
    fadeIn( sprite );
  }
  for (const sprite of otherRemovedSprites )
    fadeOut( sprite );

  if( insertedSprite ) // race condition
    insertedSprite.hide();

  fadeOut( removedSprite, 2 * duration / 3 );
  yield wait( duration / 2 );
  if( insertedSprite ) {
    // race condition
    insertedSprite.reveal();
    fadeIn( insertedSprite, 2 * duration / 3 );
  }
}
