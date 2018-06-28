class Mean {
  constructor() {
    this.struct = [];
    this.mean = null;
    this.sum = null;
  }
  add( value ) {
    this.struct.push( value );
    return this.updateOnAdd( value );
  }
  remove( needle ) {
    let floor = 0;
    let ceil = this.struct.length;
    let index = -1;
    while ( floor <= ceil ) {
      const pivot = Math.floor( 0.5 * ( ceil + floor ) );
      const element = this.struct[ pivot ];
      if ( element < needle ) {
        floor = pivot + 1;
      } else if ( element > needle ) {
        ceil = pivot - 1;
      } else {
        index = pivot;
        floor = ceil + 1;
      }
    }
    if ( index >= 0 ) {
      const newStruct = this.struct.filter( ( val, key ) => {
        if ( key !== index )
          return val;
      } );
      this.struct.length = 0;
      this.struct = newStruct;
      return this.updateOnRemove( needle );
    }
    return false;
  }
  calc() {
    let length = this.struct.length;
    let sum = null;
    if ( length ) {
      sum = this.struct.reduce( ( total, element ) => {
        total += element;
        return total;
      }, 0 );
    }
    return sum;
  }
  updateOnAdd( value ) {
    this.sum = ( this.sum === null ) ? this.calc() : this.sum + value;
    this.mean = this.sum / this.struct.length;
  }
  updateOnRemove( value ) {
    this.sum = ( this.sum === null ) ? this.calc() : this.sum - value;
    if ( this.struct.length )
      this.mean = this.sum / this.struct.length;
    else
      this.mean = 0;
  }
  getMean() {
    return this.mean;
  }
}

const M = new Mean();
for ( let i = 1; i <= 10; i++ ) {
  M.add( i );
  console.log( M.getMean() );
}
console.log( M );
for ( let i = 0; i < M.struct.length; i++ ) {
  const element = M.struct[ i ];
  M.remove( element );
  console.log( M.getMean() );
}
console.log( M );