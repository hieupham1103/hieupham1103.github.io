---
layout: post
title: "DSA Learning Log: Trees, BSTs, and AVL Balancing"
date: 2026-05-20
permalink: /content/learning-log/dsa-trees-bst-avl/
categories: [Learning Log, University, DSA]
tags: [tree, binary-tree, bst, avl-tree, traversal]
subject: "Data Structures and Algorithms"
level: "University"
course: "Data Structures and Algorithms"
semester: "Year 2"
excerpt: "A study note on tree terminology, traversal orders, binary search trees, and AVL rotations from my DSA course."
---

This note is about trees: the structure that turns linear data into hierarchy. The lesson moves from general tree vocabulary to binary trees, BSTs, and AVL trees. I want this note to preserve the main invariants and the reason each traversal exists.

## General Tree Vocabulary

A tree is a hierarchical data structure. Unlike an array or linked list, which have a linear order, a tree branches.

Core terms:

- **Root**: the top node.
- **Leaf**: a node with no children.
- **Inner node**: a node that is not the root and not a leaf.
- **Subtree**: a node together with all of its descendants.
- **Depth / level**: number of edges from the root to the node.
- **Height**: longest path from a node down to a leaf.

The habit I want to keep: depth measures downward from the root; height measures upward from leaves.

## Tree Traversal

For binary trees, I will use three letters:

- `N`: visit the current node;
- `L`: traverse the left subtree;
- `R`: traverse the right subtree.

The three standard traversals are just different orders of these actions.

### Preorder: N-L-R

Preorder visits the node first, then left subtree, then right subtree.

This is useful when the root must be processed before its children. For example, copying a tree can use preorder because the parent should be created before the children are attached.

### Inorder: L-N-R

Inorder visits left subtree, then node, then right subtree.

For a Binary Search Tree, inorder traversal produces sorted values. That makes it the most important traversal for BST reasoning.

### Postorder: L-R-N

Postorder visits children before the node.

This is the safe order for deleting a tree from memory. If I delete a parent first, I may lose access to its children. Postorder guarantees children are handled before the parent disappears.

## Binary Trees

A binary tree is a rooted tree where each node has at most two children: left and right.

Important types:

- **Full binary tree**: every internal node has exactly two children.
- **Perfect binary tree**: all internal nodes have two children and all leaves are at the same depth.
- **Complete binary tree**: all levels are full except possibly the last, which is filled from left to right.

Important formulas:

- A binary tree of height $h$ has at most $2^h$ leaves.
- If there are $t$ leaves, then $\log_2 t \le h$.
- The maximum number of nodes at level $i$ is $2^i$.

These formulas connect height with complexity. If height is logarithmic, searching paths can be logarithmic. If height becomes linear, the tree loses its advantage.

## Binary Search Tree

A Binary Search Tree preserves an ordering invariant:

> Every value in the left subtree is smaller than the node, and every value in the right subtree is larger than the node.

This invariant makes search natural:

- if the key equals the node, stop;
- if the key is smaller, go left;
- if the key is larger, go right.

Average-case complexity for search, insert, and delete is $O(\log n)$ when the tree is reasonably balanced. But the worst case is $O(n)$. If values are inserted in sorted order, the BST can degenerate into a linked list.

## BST Deletion

Deletion is the operation that most often causes mistakes. It separates it into three cases:

1. The node is a leaf: remove it directly.
2. The node has one child: connect the parent directly to that child.
3. The node has two children: replace it with the smallest node in the right subtree, or the largest node in the left subtree, then delete that replacement node.

The two-child case works because the replacement value preserves the BST ordering invariant.

If I choose the minimum of the right subtree, it is larger than everything in the left subtree and no larger than the remaining right subtree nodes.

## AVL Trees

AVL trees solve the degeneration problem by maintaining balance.

An AVL tree must preserve two invariants:

1. It is a BST.
2. For every node, the height difference between left and right subtrees is at most `1`.

This keeps the height $O(\log n)$, so operations remain $O(\log n)$.

## Rotations

When insertion or deletion breaks the balance invariant, AVL trees repair the lowest unbalanced node using rotations.

The cheatsheet lists four cases:

- **Left-left**: right single rotation.
- **Right-right**: left single rotation.
- **Left-right**: left rotation on the child, then right rotation on the unbalanced node.
- **Right-left**: right rotation on the child, then left rotation on the unbalanced node.

The naming tells me where the inserted or problematic path went. For example, left-left means the tree became too heavy through the left child’s left subtree.

## Deletion Can Cascade

AVL deletion can trigger multiple rotations while moving back toward the root.

After deletion, a rotation may reduce the height of a subtree. That height reduction can make the parent unbalanced, then the grandparent, and so on. Insertion usually stops earlier once balance is restored, but deletion can propagate.

## What I Want To Remember

Trees are all about invariants:

- General trees preserve hierarchy.
- Binary trees preserve left/right child structure.
- BSTs preserve ordering.
- AVL trees preserve ordering and height balance.

Traversal order tells me when a node should be processed relative to its children. Rotations tell me how to preserve order while repairing height.
