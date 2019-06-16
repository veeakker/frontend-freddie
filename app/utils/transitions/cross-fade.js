import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import scale from 'ember-animated/motions/resize';

export default function*( {insertedSprites, removedSprites, keptSprites} ) {
  for( const sprite of [ ...insertedSprites, ...keptSprites ] ) {
    fadeIn( sprite );
  }

  for( const sprite of removedSprites ) {
    fadeOut( sprite );
  }
}

const crossFadeAndMatch = function*( {insertedSprites, removedSprites, keptSprites} ){
  for( let i = 0; i < Math.min( insertedSprites.length, removedSprites.length ); i ++ ) {
    const inserted = insertedSprites[i];
    const removed = removedSprites[i];
    inserted.startAtSprite( removed );
    removed.endAtSprite( inserted );
    inserted.scale();
    removed.scale();
  }

  for( const sprite of [ ...insertedSprites, ...keptSprites ] ) {
    fadeIn( sprite );
  }

  for( const sprite of removedSprites ) {
    fadeOut( sprite );
  }
};

export { crossFadeAndMatch };
