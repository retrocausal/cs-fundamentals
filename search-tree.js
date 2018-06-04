class SearchTree {
  constructor() {
    //Represent a network as a matrix
    this.network = [
      [ 0, 0, 0, 1, 1 ],
      [ 0, 0, 1, 1, 0 ],
      [ 0, 1, 0, 1, 0 ],
      [ 1, 1, 1, 0, 1 ],
      [ 1, 0, 0, 1, 0 ]
    ];
    this.networkA = [ [ 0, 1 ], [ 1, 0 ] ];
    this.assignmentA = [ null, null ];
    this.assignment = [ null, null, null, null, null ];
    this.VCMap = new Map();
  }
  vertexCover( assignment ) {
    let vertex = null;
    for ( let i = 0; i < this.network.length; i++ ) {
      if ( assignment[ i ] === null ) {
        vertex = i;
      }
      for ( let j = 0; j < this.network.length; j++ ) {
        if ( this.network[ i ][ j ] ) {
          if ( assignment[ i ] === 0 && assignment[ j ] === 0 )
            return Infinity;
        }
      }
    }
    if ( vertex === null ) {
      const Key = assignment.slice( 0 );
      const VC = assignment.reduce( ( sum, state ) => {
        sum += ( state !== null && state > 0 ) ? 1 : 0;
        return sum;
      }, 0 );
      this.VCMap.set( Key, VC );
      return VC;
    } else {

      assignment[ vertex ] = 1;
      const sizeWithVertex = this.vertexCover( assignment );
      assignment[ vertex ] = 0;
      const sizeWithoutVertex = this.vertexCover( assignment );
      assignment[ vertex ] = null;
      const MinimumCover = Math.min( sizeWithVertex, sizeWithoutVertex );
      return MinimumCover;
    }
  }
}
const Tree = new SearchTree();
const minVC = new Promise( ( resolve ) => {
  resolve( Tree.vertexCover( Tree.assignment ) );
} );
const minimums = minVC.then( VC => {
  /*const Keys = Object.keys( Tree.VCs );
  const viableVCs = Keys.reduce( ( minVCs, assignment ) => {
    if ( Tree.VCs[ assignment ] === VC )
      minVCs.add( assignment );
    return minVCs;
  }, new Set() );*/
  const viableVCs = new Set();
  for ( const [ VCoverAssignment, VCover ] of Tree.VCMap ) {
    if ( VCover === VC )
      viableVCs.add( VCoverAssignment );
  }
  console.log( viableVCs );
  return viableVCs;
} )