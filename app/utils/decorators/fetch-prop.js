import { get, set } from '@ember/object';

/**
 * A decorator which creates an instance if (after fetching) it could
 * not be found.
 *
 * @param property {string} The property to be searched.
 * @param kind {string} The type that will be sent to createRecord
 */
export default function decoratorsFetchProp(property, kind) {
  return function( target, name, descriptor ) {
    let that;

    const originalGetter = () => get( that, property );

    const fetchProperty = async function(){
      if( ! await originalGetter() ){
        set( that, property, that.store.createRecord( kind ) );
      }
    };

    descriptor.get = function() {
      that = this;
      fetchProperty();
      return originalGetter();
    };
  };
}
