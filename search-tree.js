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
    this.BVCMap = new Map();
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
      assignment[ vertex ] = 0;
      const sizeWithoutVertex = this.vertexCover( assignment );
      assignment[ vertex ] = 1;
      const sizeWithVertex = this.vertexCover( assignment );
      assignment[ vertex ] = null;
      const MinimumCover = Math.min( sizeWithVertex, sizeWithoutVertex );
      return MinimumCover;
    }
  }

  betterVertexCover( assignment ) {
    console.log( assignment );
    let v1 = null;
    let v2 = null;
    for ( let i = 0; i < this.network.length; i++ ) {
      if ( assignment[ i ] === null )
        v1 = i;
      const limit = ( v1 === null ) ? this.network.length : v1;
      for ( let j = 0; j < limit; j++ ) {
        if ( v1 !== j && assignment[ j ] === null )
          v2 = j;
      }
      for ( let k = 0; k < this.network.length; k++ ) {
        if ( this.network[ i ][ k ] ) {
          if ( assignment[ i ] === 0 && assignment[ k ] === 0 )
            return Infinity;
        }
      }
    }
    if ( v1 === null && v2 === null ) {
      const Key = assignment.slice( 0 );
      const VC = assignment.reduce( ( sum, state ) => {
        sum += ( state !== null && state > 0 ) ? 1 : 0;
        return sum;
      }, 0 );
      this.BVCMap.set( Key, VC );
      return VC;
    }
    if ( v2 !== null ) {
      assignment[ v1 ] = 1;
      assignment[ v2 ] = 0;
      const sizeWithV1 = this.betterVertexCover( assignment );
      assignment[ v1 ] = 0;
      assignment[ v2 ] = 1;
      const sizeWithV2 = this.betterVertexCover( assignment );
      assignment[ v1 ] = 1;
      assignment[ v2 ] = 1;
      const sizeWithAll = this.betterVertexCover( assignment );
      assignment[ v1 ] = null;
      assignment[ v2 ] = null;
      return Math.min( sizeWithV1, sizeWithV2, sizeWithAll );
    } else {
      assignment[ v1 ] = 0;
      const sizeWithoutVertex = this.betterVertexCover( assignment );
      assignment[ v1 ] = 1;
      const sizeWithVertex = this.betterVertexCover( assignment );
      assignment[ v1 ] = null;
      return Math.min( sizeWithoutVertex, sizeWithVertex );
    }
  }
}
const Tree = new SearchTree();
const minVC = new Promise( ( resolve ) => {
  resolve( Tree.vertexCover( Tree.assignment ) );
} );
const minimums = minVC.then( VC => {
  const viableVCs = new Set();
  for ( const [ VCoverAssignment, VCover ] of Tree.VCMap ) {
    if ( VCover === VC )
      viableVCs.add( VCoverAssignment );
  }
  console.log( viableVCs );
  return viableVCs;
} )

const BetterVC = Promise.resolve( Tree.betterVertexCover( Tree.assignment ) )
  .then( VC => {
    const viableVCs = new Set();
    for ( const [ VCoverAssignment, VCover ] of Tree.BVCMap ) {
      if ( VCover === VC )
        viableVCs.add( VCoverAssignment );
    }
    console.log( viableVCs );
    return viableVCs;
  } )