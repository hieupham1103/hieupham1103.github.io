---
layout: post
title: "DSA Learning Log: Heaps, Priority Queues, and Hashing"
date: 2026-04-25
permalink: /content/learning-log/dsa-heaps-priority-queues-hashing/
categories: [Learning Log, University, DSA]
tags: [heap, priority-queue, hashing, collision-resolution, probing]
subject: "Data Structures and Algorithms"
level: "University"
course: "Data Structures and Algorithms"
semester: "Year 2"
excerpt: "A study note on priority queue implementations, binary heaps, hash functions, and collision handling from my DSA."
---

This note covers two structures that both try to make access fast, but in different ways. A heap makes the highest-priority item easy to access. A hash table makes an item easy to find by computing where it should live.

## Priority Queue

A priority queue supports:

- `push`: insert an item with priority;
- `top`: inspect the highest-priority item;
- `pop`: remove the highest-priority item.

There are three implementation ideas.

### Multiple Queues

If there are $M$ priority levels, we can store one queue per priority. Push is fast: put the new item into its priority queue in $O(1)$. But `top` and `pop` may need to scan priorities to find the highest non-empty queue, which costs $O(M)$.

This is good only when the number of priority levels is small and fixed.

### AVL Tree

An AVL tree can support ordered operations in $O(\log n)$. It is powerful, but maybe too powerful. A priority queue does not usually need full search capability; it only needs the extreme element.

> AVL balancing work can be unnecessary overhead for a priority queue.

### Binary Heap

A binary heap is the natural fit. The root is always the item with highest priority. For a min-heap, the smallest key is at the root. For a max-heap, the largest key is at the root.

The operations become:

- `top`: read root, $\Theta(1)$;
- `push`: insert at the end, then percolate up, $\Theta(\log n)$;
- `pop`: replace root with the last element, then percolate down, $\Theta(\log n)$.

## Heap Indexing

Using a zero-based array:

- parent of `k`: `(k + 1) / 2 - 1`
- left child of `k`: `2k + 1`
- right child of `k`: `2k + 2`

Using a one-based array:

- parent of `k`: `k / 2`
- left child of `k`: `2k`
- right child of `k`: `2k + 1`

I personally prefer zero-based indexing in C++ arrays, but one-based indexing often makes heap formulas look cleaner on paper.

## Push: Percolate Up

To insert into a min-heap:

1. Put the new item at the next free array position.
2. Compare it with its parent.
3. If it is smaller than the parent, swap.
4. Continue until the heap property is restored.

The invariant:

> Only the path from the inserted node to the root can violate the heap property.

That is why we do not need to rebuild the whole heap after every insertion.

## Pop: Percolate Down

To remove the root:

1. Save the root value.
2. Move the last item to the root.
3. Remove the last array slot.
4. Compare the new root with its children.
5. Swap with the smaller child in a min-heap.
6. Continue downward until the heap property is restored.

The invariant:

> After replacing the root, only one downward path can be broken.

This is the same idea as `heapify` in heap sort.

## Hashing

Hashing maps a key to a table position. The ideal is constant-time access, but that depends on distribution.

A hash function should spread keys evenly. If many keys land in the same slot, the hash table degenerates into slower collision handling.

There are three common method

### Division Method

$$
h(k) = k \bmod p
$$

The table size `p` should usually be a good prime number to reduce patterns in collisions.

### Multiplication Method

The key is multiplied by a constant, the fractional part is extracted, and the result is scaled to the table size. The goal is to mix key bits more evenly than direct modulo in some cases.

### String Hashing

For strings, simply summing ASCII values is weak because different permutations can produce the same sum. A better approach multiplies the accumulated hash by a prime base before adding the next character. This makes character position matter.

That is the same general idea used in many competitive programming rolling hashes.

## Collision Resolution

Collisions are unavoidable because many possible keys map into a finite table.

### Separate Chaining

Each table slot stores a linked list. If two keys map to the same slot, both are stored in that slot’s chain.

This is easy to implement and deletion is straightforward, but performance depends on keeping chains short.

### Open Addressing

All elements live directly in the table. If a position is occupied, the algorithm probes other positions.

#### Linear Probing

$$
h(k, i) = (h(k) + i) \bmod p
$$

Linear probing is simple, but it can cause **primary clustering**: long consecutive occupied blocks that make future collisions more likely.

Some problems use modified linear probing, such as $h(k, i) = h(k) + 3i + 2$. If the jump step is greater than one, the step and table size must be coprime so the probing sequence can visit the whole table.

#### Quadratic Probing

$$
h(k, i) = (h(k) + i^2) \bmod p
$$

Quadratic probing reduces primary clustering, but it has constraints, that to guarantee finding an empty slot when space exists, `p` should be prime and the load factor should stay below `0.5`.

#### Double Hashing

$$
h(k, i) = (h_1(k) + i \cdot h_2(k)) \bmod p
$$

The second hash function must never return zero. If $h_2(k) = 0$, the probe sequence never moves, which can create an infinite loop.

## Deletion In Open Addressing

Deletion in open addressing is subtle. If a removed slot is marked as truly empty, searches may stop too early and fail to find keys that were inserted later in the same probe chain.

The solution is a special marker: **Deleted**.

During insertion:

- remember the first Deleted slot seen;
- continue probing until finding the key or a truly Empty slot;
- if the key does not exist, insert into the first Deleted slot if one was found, otherwise insert into the Empty slot.

This preserves search correctness while allowing deleted space to be reused.

## What I Want To Remember

Heaps and hash tables both rely on invariants:

- A heap preserves a parent-child priority relation.
- A hash table preserves a probing/search path relation.

For heaps, broken structure is repaired by moving up or down one path. For hashing, correctness depends on following the exact same probe sequence during search, insertion, and deletion.
