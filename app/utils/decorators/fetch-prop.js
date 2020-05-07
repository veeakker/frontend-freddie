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
    const {
      configurable,
      enumerable,
      value,
      initializer
    } = descriptor;

    const intialValue = initializer ? initializer.call( this ) : value;

    const fetchProperty = async function(){
      if( ! await get( this, property ) )
        set( this, property, this.store.createRecord( kind ) );
    };

    return {
      configurable,
      enumerable,
      get() {
        fetchProperty.bind(this)();
        return get( this, property );
      },
      set(value) {
        set( this, property, value );
      }
    };
  };
}
