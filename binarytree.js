class Node {
  constructor( data ) {
    this.data = ( data ) ? data : 0;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree {
  constructor( _Node ) {
    const node = ( _Node instanceof Node ) ? _Node : new Node( _Node );
    this._root = node;
  }
  set _root( node ) {
    return this.root = node;
  }
  get _root() {
    return this.root;
  }
  add( node, start ) {
    if ( start ) {
      if ( start.data <= node.data ) {
        if ( start.right )
          this.add( node, start.right );
        else
          start.right = node;
      } else {
        if ( start.left )
          this.add( node, start.left );
        else
          start.left = node;
      }
    }
    return node;
  }
  insert( _Node ) {
    const node = ( _Node instanceof Node ) ? _Node : new Node( _Node );
    return this.add( node, this._root );
  }
  find( start, data ) {
    if ( start ) {
      if ( data === start.data ) {
        return start;
      } else if ( data < start.data ) {
        if ( start.left )
          return this.find( start.left, data );
      } else {
        if ( start.right )
          return this.find( start.right, data );
      }
    }
    return false;
  }
  search( data ) {
    return this.find( this._root, data );
  }
  traverse( algorithm = 'in-order' ) {
    const root = this._root;
    this.collection = [];
    switch ( algorithm ) {
    case 'pre-order':

      break;
    case 'post-order':

      break;
    case 'in-order':
    default:
      return this.traverseInOrder( root );
    }
  }
  traverseInOrder( start ) {
    //this.collection.push( start.data );
    if ( start.left ) {
      this.traverseInOrder( start.left );
    }
    this.collection.push( start.data );
    if ( start.right ) {
      this.traverseInOrder( start.right );
    }
    //this.collection.push( start.data );
    return this.collection;
  }

}
//Set up tree
const node = new Node( 4 );
const tree = new BinaryTree( node );

//Insert elements
tree.insert( 2 );
tree.insert( 1 );
tree.insert( 3 );
tree.insert( 5 );
tree.insert( 6 );
tree.insert( -1 );
tree.insert( -10 );
tree.insert( 99 );
tree.insert( 81 );
tree.insert( 81 );
tree.insert( 81 );
//Check search
// Should be True
console.log( tree.search( 1 ) );
// Should be True
console.log( tree.search( 6 ) );
// Shoud be False
console.log( tree.search( 100 ) );
console.log( tree.traverse() );