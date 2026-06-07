---
layout: post
title: "DSA: Linked Lists, Stacks, and Queues"
date: 2026-04-21
permalink: /content/learning-log/dsa-linked-lists-stacks-queues/
categories: [Learning Log, University, DSA]
tags: [linked-list, stack, queue, two-pointers, monotonic-stack]
subject: "Data Structures and Algorithms"
level: "University"
course: "Data Structures and Algorithms"
semester: "Year 2"
excerpt: "A study note on linked list operations, stack and queue implementations, and classic pointer patterns from my DSA course."
---

This note is about the pointer-heavy part of the course: linked lists, stacks, queues, and the small patterns that make these structures easier to control.

## Singly Linked Lists

A singly linked list stores each element in a node, and each node points to the next node.

```cpp
struct Node {
    int info;
    Node* next;
};

struct List {
    Node* head;
    Node* tail;
};
```

The two pointers `head` and `tail` are the list’s external memory of where the chain starts and ends. Most bugs happen when I update one but forget the other.

Common edge cases:

- inserting into an empty list;
- deleting the head;
- deleting the tail;
- deleting the only node;
- traversing until `nullptr` without losing the current node.

The safest habit is to write each operation with the empty-list case first.

## Processing and Removing A List

Traversal is straightforward:

```cpp
for (Node* p = list.head; p != nullptr; p = p->next) {
    process(p);
}
```

Deleting the whole list needs more care because after deleting a node, I cannot use it to move forward. The pattern is:

1. Save the current head in a temporary pointer.
2. Move `head` to the next node.
3. Delete the saved node.
4. At the end, set `tail` to `nullptr`.

The invariant during deletion:

> Every node before `head` has already been freed; every node from `head` onward is still reachable.

## Sorting Linked Lists

Sorting lists is different from sorting arrays because random access is gone. We cannot jump to index `i`; we must move through pointers.

### Selection Sort On Lists

The list version repeatedly finds the minimum node, detaches it from the original list, and appends it to a result list.

The important helper is often not `findMin`, but `findMinPrev`: to detach a node from a singly linked list, I need the node before it.

### Insertion Sort On Lists

The insertion sort version repeatedly removes the head of the original list and inserts it into the correct place in the result list.

The cases are:

- result list is empty;
- the new node belongs before the current head;
- the new node belongs in the middle or at the tail.

This is a good exercise in pointer order: connect the new node to its successor before changing the previous node’s `next`.

### Quick Sort On Lists

The list quick sort chooses a pivot node, partitions the rest into two lists, recursively sorts them, then concatenates:

1. `list1`: nodes less than or equal to the pivot.
2. `pivot`: the chosen node.
3. `list2`: nodes greater than the pivot.

Unlike array quick sort, there is no in-place index partitioning. The partition is done by moving whole nodes between lists.

### Merge Sort On Lists

Merge sort fits linked lists very naturally. It splits the list into two lists by alternating nodes, recursively sorts both, then merges by repeatedly taking the smaller head node.

The merge step is pointer-friendly because taking the head of a list is cheap.


## Stacks

A stack is Last-In, First-Out. The main operations are:

- `push`: add to the top;
- `pop`: remove from the top;
- `top`: inspect the top;
- `isEmpty`: check whether the stack has elements.

With an array, `topIndex` tracks the top position. With a linked list, the head pointer can serve as the top.

For infix to postfix conversion:

- operands go directly to output;
- operators may force older operators to leave the stack first;
- opening parentheses act as barriers;
- closing parentheses pop until the matching opening parenthesis.

## Queues

A queue is First-In, First-Out. The main operations are:

- `enqueue`: add to the back;
- `dequeue`: remove from the front;
- `front`: inspect the next item to leave.

An array queue needs careful handling of front and rear positions. A linked-list queue is simpler conceptually because `head` is the front and `tail` is the back.

Queues show up naturally in breadth-first search, simulations, and scheduling.

## Monotonic Stack: Next Smaller Element

> For each `a[i]`, find the first element to the right that is smaller than `a[i]`; otherwise return `-1`.

The clean solution scans from right to left and maintains a stack of candidate indices.

```cpp
vector<int> nextSmallerElement(const vector<int>& a) {
    vector<int> result(a.size(), -1);
    stack<int> st;

    for (int i = (int)a.size() - 1; i >= 0; i--) {
        while (!st.empty() && a[st.top()] >= a[i]) {
            st.pop();
        }

        if (!st.empty()) {
            result[i] = a[st.top()];
        }

        st.push(i);
    }

    return result;
}
```

The stack is monotonic because values in it are kept useful for future elements. Any value greater than or equal to `a[i]` cannot be the next smaller element for `a[i]` or for elements to the left that are also smaller, so it is removed.

## What I Want To Remember

Linked structures are less about formulas and more about pointer discipline.

Before writing code, I should know:

- which pointer owns the start;
- which pointer owns the end;
- which node is being detached;
- whether the detached node still points somewhere old;
- which edge case changes `head` or `tail`.

Once those are clear, stacks and queues become simple special cases of list manipulation.
