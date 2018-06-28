class Mean {
  constructor() {
    this.struct = [];
    this.mean = null;
  }
  add( value ) {
    this.struct.push( value );
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
    }
  }
  update( value ) {
    if ( this.mean ) {

    }
  }
}

const M = new Mean();
for ( let i = 1; i <= 10; i++ ) {
  M.add( i );
}