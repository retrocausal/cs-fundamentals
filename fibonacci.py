"""Implement a function recursivly to get the desired
Fibonacci sequence value.
Your code should have the same input/output as the
iterative code in the instructions."""

def get_fib_memoized(position):
    fib = []
    if position == 0:
        return 0
    elif position <0:
        return -1
    else:
        while position >= 1:
            if len(fib) > 1:
                current = fib[0]
                prev = fib[1]
            else:
                current = 1
                prev = 0
            number = current + prev
            fib.insert(0,number)
            position = position - 1
        return fib[0]

def get_fib(position):
    if(position == 1):
        return 1
    elif(position==0):
        return 0
    elif position > 1:
        return get_fib(position - 2) + get_fib(position - 1)
    else:
        return -1
# Test cases
print get_fib_memoized(9)
print get_fib_memoized(11)
print get_fib(9)
print get_fib(11)
