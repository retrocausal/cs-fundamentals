function isSAT( numberOfVariables, clauses = [ [ 1, 2, -3 ], [ 2, -4 ], [ -1, 3, 4 ] ], assignment = [ 0, 1, 0, 1, 1 ] ) {
  let count = 0;
  for ( const clause of clauses ) {
    const iterate = clause[ Symbol.iterator ]();
    let satisfies = false;
    let next;
    while ( !satisfies ) {
      next = iterate.next();
      if ( !next.done ) {
        if ( next.value > 0 && assignment[ next.value ] == 1 ) {
          satisfies = true;
        } else if ( next.value < 0 && assignment[ next.value ] == 0 ) {
          satisfies = true;
        }
        count += ( satisfies ) ? 1 : 0;
      } else {
        satisfies = true;
      }
    }
  }
  return count === clauses.length;
}