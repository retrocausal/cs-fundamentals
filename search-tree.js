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
  }
  vertexCover( assignment ) {
    console.log( assignment );
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
      const VC = assignment.reduce( ( sum, state ) => {
        sum += ( state !== null && state > 0 ) ? 1 : 0;
        return sum;
      }, 0 );
      return VC;
    } else {

      assignment[ vertex ] = 1;
      const sizeWithVertex = this.vertexCover( assignment );
      assignment[ vertex ] = 0;
      const sizeWithoutVertex = this.vertexCover( assignment );
      assignment[ vertex ] = null;
      return Math.min( sizeWithVertex, sizeWithoutVertex );
    }
  }
}
const Tree = new SearchTree();
const minVC = Tree.vertexCover( Tree.assignment );