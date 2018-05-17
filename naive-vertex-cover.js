//Represent a network as a matrix
const network = [
  [ 0, 0, 0, 1, 1 ],
  [ 0, 0, 1, 1, 0 ],
  [ 0, 1, 0, 1, 0 ],
  [ 0, 0, 0, 0, 1 ],
  [ 0, 1, 1, 0, 0 ]
];
//AD,AE,BC,BD,CD,DE,EB,EC - number of edges
//Initially the minimum vertices monitored is 5/network hub span
let min = network.length;
//gather existing number of edges in the graph
const edgesToCover = network.reduce( ( edges, vertex ) => {
  const index = network.indexOf( vertex );
  for ( let i = 0; i < vertex.length; i++ ) {
    if ( i !== index && network[ index ][ i ] === 1 && !edges.has( `${i}${index}` ) ) {
      edges.add( `${index}${i}` );
    }
  }
  return edges;
}, new Set() );
/*
*@vertexCover checks if the given combination is viable and covers all edges
*/
const vertexCover = function ( combinations, combination ) {
  //helper for minimum vertex cover
  let sum = 0;
  //covered edges for input combintation
  let covered = new Set();
  //loop through the combination, and check for edge cover
  for ( let i = 0; i < combination.length; i++ ) {
    //track the number of hubs on which monitoring devices are needed
    sum += combination[ i ];
    //continue only if the combintation specifies a monitor on this hub
    if ( combination[ i ] ) {
      //loop through the vertex's span and count edges covered
      for ( let j = 0; j < combination.length; j++ ) {
        //Do not check for loopbacks, accept if there is either a leading edge / a converging edge 
        //and if the covered set does not already have the edge
        if ( i !== j && ( network[ i ][ j ] === 1 || network[ j ][ i ] === 1 ) && !covered.has( `${j}${i}` ) ) {
          covered.add( `${i}${j}` );
        }
      }
    }
  }
  //Are all edges covered with the input combo?
  if ( covered.size === edgesToCover.size && sum <= min ) {
    //If current comination has lesser monitors, reset the minimum required monitors
    min = sum;
    combinations.add( combination );
  }
  return combinations;
};
//Define env
const numberOfHubs = 5;
const permutations = Math.pow( 2, numberOfHubs );
//compute / generate combinations for number of permutations
const possibilities = ( function () {
  const combinations = [];
  for ( let i = permutations; i > 0; i-- ) {
    const combination = [];
    for ( let shift = 0; shift < network.length; shift++ ) {
      //right shift, the 32 bit unsigned integer in JS, represented by i, shift number of times
      let rightShifted = i >> shift;
      //follow the truthy values - when Anded, the result is a one wherever there is a one in the right shifted value
      let state = rightShifted & 1;
      //store the current state as an element of the combination
      combination.unshift( state );
    }
    //push the current generated combination into the list of combinations
    combinations.unshift( combination );
  }
  return combinations;
} )();
//reduce the combinations generated for available permutations, to
// a set of viable and minimum span combinations
const combinations = possibilities.reduce( vertexCover, new Set() );
console.log( possibilities, combinations );