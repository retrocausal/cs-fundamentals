class Element {
  constructor() {}
  set _value( val ) {
    return this.value = val;
  }
  get _value() {
    return this.value;
  }
  set _pointerNext( index = null ) {
    return this.next = index;
  }
  get _pointerNext() {
    return this.next;
  }
}

class List {
  constructor() {}
  set _head( obj ) {
    if ( obj instanceof Element )
      return this.head = obj;
    throw ( 'Expected an Element, did not get one' );
  }
  get _head() {
    return this.head || false;
  }
  add( element ) {
    if ( element instanceof Element ) {
      if ( !this._head ) {
        this._head = element;
      } else {
        let current = this._head;
        while ( current._pointerNext ) {
          current = current._pointerNext;
        }
        current._pointerNext = element;
      }
    } else {
      throw ( 'Expected an Element, did not get one' );
    }
  }
  search( value = null ) {
    let position = 1;
    let element = this._head;
    while ( element.value !== value ) {
      if ( !element._pointerNext )
        return ( -1 );
      element = element._pointerNext;
      position++;
    }
    return position;
  }
  fetch( position = null ) {
    return ( position ) ? ( () => {
      let element = this._head;
      let count = 1;
      while ( count < position ) {
        if ( !element._pointerNext ) {
          return false;
        }
        element = element._pointerNext;
        count++;
      }
      return element;
    } )() : false;
  }
  insert( newElement, position = null ) {
    return ( position ) ? ( () => {
      if ( position === 1 ) {
        const head = this._head;
        newElement.next = head;
        return this._head = newElement;
      }
      let element = this.fetch( position );
      if ( !element )
        return false;
      let prev = this.fetch( position - 1 );
      newElement._pointerNext = element;
      prev._pointerNext = newElement;
      return true;
    } )() : position;
  }
  remove( value ) {
    const position = this.search( value );
    if ( position !== -1 && position !== 1 ) {
      const element = this.fetch( position );
      const prev = this.fetch( position - 1 );
      const next = this.fetch( position + 1 );
      prev._pointerNext = next || null;
    } else if ( position !== -1 && position === 1 ) {
      const head = this._head;
      const next = this.fetch( 2 );
      if ( next ) {
        this._head = next;
      } else {
        this._head = new Element();
      }
    }
  }
}
const list = new List();
const head = new Element();
head._value = 1;
list.add( head );
const el = new Element();
el._value = 2;
list.add( el );
const el1 = new Element();
el1._value = 3;
list.add( el1 );
const el2 = new Element();
el2._value = 4;

console.log( list._head._pointerNext._pointerNext._value );
console.log( list.fetch( 3 )
  ._value );
list.insert( el2, 3 );
console.log( list.fetch( 3 )
  ._value );
list.remove( 1 );
console.log( list.fetch( 1 )
  ._value, list.fetch( 2 )
  ._value, list.fetch( 3 )
  ._value );
console.log( list.fetch( 4 )
  ._value );