"""You're going to write a binary search function.
You should use an iterative approach - meaning
using loops.
Your function should take two inputs:
a Python list to search through, and the value
you're searching for.
Assume the list only has distinct elements,
meaning there are no repeated values, and
elements are in a strictly increasing order.
Return the index of value, or -1 if the value
doesn't exist in the list."""

def binary_search(input_array, value):
    """Your code goes here."""
    l = len(input_array)
    floor = 0
    ceil = l - 1
    while(floor<=ceil):
        pivot = (floor + ceil) / 2
        print floor,ceil,pivot
        if value == input_array[pivot]:
            return pivot
        elif value > input_array[pivot]:
            floor = pivot + 1
        else:
            ceil = pivot - 1

    return -1

test_list = [1,3,9,11,15,19,29,31,121,234,456,2434,3452]
test_val1 = 21
test_val2 = 15
print binary_search(test_list, test_val1)
print binary_search(test_list, test_val2)
