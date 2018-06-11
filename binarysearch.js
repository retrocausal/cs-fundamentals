const binarySearch = function ( haystack, needle ) {
  const length = haystack.length;
  let floor = 0;
  let ceil = length;
  while ( floor <= ceil ) {
    const pivot = Math.floor( 0.5 * ( ceil + floor ) );
    const element = haystack[ pivot ];
    if ( element < needle ) {
      floor = pivot + 1;
    } else if ( element > needle ) {
      ceil = pivot - 1;
    } else {
      return pivot;
    }
  }
  return -1;
};

let test_list = [ 1, 3, 9, 11, 15, 19, 29, 31, 121, 234, 456, 2434, 3452 ];
let test_val1 = 21;
let test_val2 = 15;
console.log( binarySearch( test_list, test_val1 ) );
console.log( binarySearch( test_list, test_val2 ) );