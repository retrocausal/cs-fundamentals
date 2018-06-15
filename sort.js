class CustomSort {
  constructor() {}
  bubble( input ) {
    const temp = input.slice( 0 );
    let sorted = false;
    let swaps = 0;
    let limit = input.length;
    while ( !sorted ) {
      sorted = true;
      for ( let i = 0; i < limit; i++ ) {
        if ( input[ i ] > input[ i + 1 ] ) {
          input = this.swap( input, i, i + 1 );
          swaps++;
          sorted = false;
        }
      }
      limit--;
    }
    console.log( `${swaps} swaps to sort ${temp}` );
    return input;
  }
  swap( array, index1, index2 ) {
    let temp = array[ index2 ];
    array[ index2 ] = array[ index1 ];
    array[ index1 ] = temp;
    return array;
  }
  naiveMerge( input ) {
    const floor = 0;
    const ceil = input.length;
    const pivot = Math.floor( ( floor + ceil ) * ( 1 / 2 ) );
    if ( ceil <= 1 )
      return;
    const A1 = input.slice( floor, pivot );
    const A2 = input.slice( pivot, ceil );
    this.naiveMerge( A1 );
    this.naiveMerge( A2 );
    return this.mergeHalves( input, A1, A2 );
  }
  mergeHalves( A, A1, A2 ) {
    const merge = [];
    let i = 0;
    let j = 0;
    while ( i < A1.length && j < A2.length ) {
      if ( A1[ i ] < A2[ j ] ) {
        merge.push( A1[ i ] );
        i++;
      } else {
        merge.push( A2[ j ] );
        j++;
      }
    }
    while ( i < A1.length ) {
      merge.push( A1[ i ] );
      i++;
    }
    while ( j < A2.length ) {
      merge.push( A2[ j ] );
      j++;
    }
    let k = 0;
    while ( k < A.length ) {
      A[ k ] = ( merge[ k ] >= 0 || merge[ k ] < 0 ) ? merge[ k ] : A[ k ];
      k++;
    }
    return A;
  }
  quick( input, low, high ) {
    //console.log( input.slice( 0 ) );
    const floor = ( low >= 0 ) ? low : 0;
    const ceil = ( high >= 0 ) ? high : input.length;
    if ( floor < ceil ) {
      const pivot = this.getPivot( input, floor, ceil );
      const pivotEl = input[ pivot ];
      this.quick( input, floor, pivot );
      this.quick( input, pivot + 1, ceil );
      return input;
    }
  }
  getPivot( A, low, high ) {
    const floor = ( low >= 0 ) ? low : 0;
    const ceil = ( high >= 0 ) ? high : input.length;
    let pivot = floor;
    const pivotEl = A[ pivot ];
    let k = pivot + 1;
    while ( k < ceil ) {
      if ( A[ k ] < pivotEl ) {
        pivot++;
        this.swap( A, pivot, k );
      }
      k++;
    }
    this.swap( A, pivot, floor );
    return pivot;
  }
}
let time;
const Sort = new CustomSort();
let myList = [ 986, 999, 1010, 23, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 21, 4, 1, 3, 9, 2334, 354, 1, 0, 0, 45, 123, 121, 111, 1111, 11111, 2324343434, 20, 25, 6, 21, 14 ];

time = performance.now();
console.log( Sort.bubble( myList.slice( 0 ) ) );
console.log( performance.now() - time );

time = performance.now();
console.log( Sort.naiveMerge( myList.slice( 0 ) ) );
console.log( performance.now() - time );
time = performance.now();
console.log( Sort.quick( myList.slice( 0 ) ) );
console.log( performance.now() - time );