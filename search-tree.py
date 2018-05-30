#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# This and the next problem are mainly concerned with implementing the
# improved search tree for vertex cover. But before we do any
# improvements, let's implement the brute-force algorithm (the one
# with size 2^n) first before doing further optimizations.
#
# Write code in recursive_vertex_cover where specified.
#

# This function initializes and calls the search tree


def vertex_cover_tree(input_graph):
    n = len(input_graph)
    assignment = [None] * n
    return recursive_vertex_cover(input_graph, assignment)


# This function recursively builds the search tree

def recursive_vertex_cover(input_graph, assignment):

    # ###########
    # YOUR CODE GOES HERE
    #
    # - Check if it's still possible to construct a valid vertex cover,
    # if not, return float("inf") (the Python expression for infinity)
    # - If the assignment is a valid vertex cover, return the size of
    # that cover
    # - Otherwise, Find a vertex v that does not have an assignment

    n = len(input_graph)
    v = -1

    for i in range(n):
        if assignment[i] == None:
            v = i
        for j in range(n):
            if input_graph[i][j] == 1:
                if assignment[i] == 0 and assignment[j] == 0:
                    return float('inf')
        if v == -1:
            size = 0
            for i in range(n):
                if assignment[i] == 1:
                    size += 1
            return size

    # END OF YOUR CODE. The following code takes care of the recursive
    # branching. Do not modify anything below here!
    # #############
    print assignment
    assignment[v] = 0
    size_v_0 = recursive_vertex_cover(input_graph, assignment)
    assignment[v] = 1
    size_v_1 = recursive_vertex_cover(input_graph, assignment)
    assignment[v] = None
    return min(size_v_0, size_v_1)


def test():
   # assert 1 == vertex_cover_tree([[0,1], [1, 0]])
   # assert 1 == vertex_cover_tree([[0, 1, 1], [1, 0, 0], [1, 0, 0]])
   print vertex_cover_tree([[ 0, 0, 0, 1, 1 ],[ 0, 0, 1, 1, 0 ],[ 0, 1, 0, 1, 0 ],[ 1, 1, 1, 0, 1 ],[ 1, 0, 0, 1, 0 ]])
   return False

test();
