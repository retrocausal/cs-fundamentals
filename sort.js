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
}

const Sort = new CustomSort();
const myList = [ 21, 4, 1, 3, 9, 20, 25, 6, 21, 14 ];
const time = performance.now();
console.log( Sort.bubble( myList ) );
console.log( performance.now() - time );