---
layout: post
title: "DSA: Foundations, Cost Models, and Searching"
date: 2026-03-20
permalink: /content/learning-log/dsa-foundations-searching/
categories: [Learning Log, University, DSA]
tags: [data-structures, algorithms, arrays, searching, complexity]
subject: "Data Structures and Algorithms"
level: "University"
course: "Data Structures and Algorithms"
semester: "Year 2"
excerpt: "A study note on basic data representations, operation costs, and the main searching patterns from my DSA course."
---

This note is my first pass through the DSA: before jumping into specific structures, I want a clean mental model for how data is stored, what operations cost, and why searching algorithms behave the way they do.

## Operation Cost Is The First Question

- An **unsorted array** inserts quickly at the end, but searching and finding the minimum require scanning.
- A **sorted array** allows binary search, but insertion and deletion are expensive because elements must be shifted.
- A **singly linked list** supports constant-time insertion or deletion if the position is already known, but searching is still linear.
- A **hash table** aims for expected constant-time lookup, but this depends on the hash function, load factor, and collision strategy.
- A **balanced tree** gives logarithmic search, insert, delete, and find-min operations, but it needs extra logic to preserve balance.

The practical lesson is: always ask which operation dominates the problem. If the problem mostly searches, sorting or hashing may help. If it constantly inserts and deletes near known nodes, linked structures become attractive. If it needs ordered operations, balanced trees are safer than plain hashing.

## Arrays, Pointers, and Structs

Arrays are the base model for many algorithms because indexing is direct. If `a` is an array, `a[i]` is reachable in constant time. That makes arrays very convenient for binary search, heap representation, dynamic programming tables, and adjacency matrices.

Pointers and structs are the bridge between low-level memory and custom data structures:

```cpp
struct Node {
    int value;
    Node* next;
};
```

Once a structure stores a pointer to another object, it stops being just a block of values and becomes a shape: a list, a tree, a graph adjacency list, or something more specialized.

The important habit is to track ownership and reachability:

- If a node is no longer reachable, it may leak memory.
- If two pointers are updated in the wrong order, the structure can lose a whole chain of nodes.
- If the head or tail pointer is not updated after insertion/deletion, the structure may look valid but fail at edge cases.

## Linear Search

Linear search is the most direct way to find a key:

```cpp
int linearSearch(int a[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (a[i] == key) {
            return i;
        }
    }
    return -1;
}
```

The complexity is $O(n)$ because in the worst case the key is at the end or not present at all. This is not fancy, but it is robust: it works on unsorted arrays, linked lists, and almost any sequential container.

## Binary Search

Binary search is only valid when the data is sorted by the key. Each comparison cuts the remaining search interval roughly in half:

```cpp
int binarySearch(int a[], int n, int key) {
    int left = 0;
    int right = n - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (a[mid] == key) {
            return mid;
        }

        if (key > a[mid]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
```

The key invariant is:

> If the key exists, it must be inside the interval `[left, right]`.

Every update must preserve that invariant. If `key > a[mid]`, the key cannot be at `mid` or on the left side, so the new interval starts at `mid + 1`. If `key < a[mid]`, the interval ends at `mid - 1`.


## Randomized Search

The randomized search idea samples random positions for a bounded number of attempts. This does not replace binary search or hashing, but it is useful as a thinking exercise: randomness can sometimes avoid adversarial patterns, but it also introduces probability into correctness.

For exam and implementation purposes, the important distinction is:

- Linear and binary search are deterministic.
- Randomized search may be fast on some distributions, but it can miss a key unless the algorithm is designed with a correctness guarantee.

## What I Want To Remember

Searching is not only about finding a value. It is about what assumptions I am allowed to use.

- If I know nothing about the order, I scan.
- If the data is sorted, I can halve the search space.
- If I maintain a hash table, I can search by computed address.
- If I maintain a balanced tree, I can search by ordered branching.

The structure creates the algorithm. The algorithm only works because the structure preserves the right invariant.
