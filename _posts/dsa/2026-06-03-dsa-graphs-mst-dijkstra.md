---
layout: post
title: "DSA: Graphs, MSTs, and Dijkstra"
date: 2026-05-15
permalink: /content/learning-log/dsa-graphs-mst-dijkstra/
categories: [Learning Log, University, DSA]
tags: [graph, mst, prim, kruskal, dijkstra, shortest-path]
subject: "Data Structures and Algorithms"
level: "University"
course: "Data Structures and Algorithms"
semester: "Year 2"
excerpt: "A study note on graph vocabulary, connectivity, minimum spanning trees, and Dijkstra's shortest path algorithm from my DSA course."
---

Graphs are more vocabulary-heavy than arrays or trees, but the payoff is big: once the language is clear, MST and shortest-path algorithms become much easier to reason about.

## Graph Basics

A graph $G$ has:

- a set of vertices $V(G)$;
- a set of edges $E(G)$.

An edge connects two vertices, or in some graph types, a vertex to itself.

Important types:

- **Directed graph / digraph**: edges have direction.
- **Simple graph**: undirected graph with no loops and no parallel edges.
- **Complete graph `K_n`**: every pair of distinct vertices is connected by exactly one edge.
- **Complete bipartite graph `K_m,n`**: vertices are split into two disjoint groups, and every vertex in one group connects to every vertex in the other group.

The degree of a vertex is the number of edge endpoints touching it. A loop counts twice.

The Handshake Theorem:

$$
\sum_{v \in V} \deg(v) = 2\lvert E \rvert
$$

This means the total degree of any undirected graph is always even.

For planar graph reasoning, there is a formula from Euler:

$$
V - E + F = 2
$$

where `F` is the number of faces.

## Walks, Trails, Paths, and Cycles

The vocabulary matters:

- **Walk**: sequence of adjacent vertices and edges; repetition is allowed.
- **Trail**: a walk with no repeated edge.
- **Path**: a trail with no repeated vertex.
- **Circuit / cycle**: a closed trail.
- **Simple circuit**: a closed path except the first and last vertex are the same.

Euler and Hamilton ideas are different:

- An **Euler trail/circuit** is about using every edge.
- A **Hamilton cycle** is about visiting every vertex exactly once.

Euler conditions:

- Euler trail exists when the graph is connected and exactly two vertices have odd degree.
- Euler circuit exists when the graph is connected and every vertex has even degree.

## Connectivity

A graph is connected if every vertex can reach every other vertex through some walk.

A connected component is a maximal connected subgraph. “Maximal” means it cannot be expanded by adding more vertices from the original graph while staying connected.

- **Bridge**: an edge whose removal disconnects the graph.
- **Vertex cut / articulation point**: a vertex whose removal disconnects the graph.

These are useful when studying network vulnerability.

## Minimum Spanning Trees

A spanning tree connects all vertices using exactly $\lvert V \rvert - 1$ edges and no cycles. A Minimum Spanning Tree minimizes the total edge weight.

The two algorithms are Prim and Kruskal.

## Prim’s Algorithm

Prim grows one tree outward from a starting vertex.

Mental model:

1. Start with one vertex in the tree.
2. Keep a min-heap of edges crossing from the tree to outside vertices.
3. Repeatedly choose the cheapest crossing edge.
4. Add the new vertex and expose its outgoing edges.

The key invariant:

> The current structure is always a tree, and each step adds one cheapest safe edge from the tree boundary.

Prim feels natural when I think from the perspective of expanding territory.

## Kruskal’s Algorithm

Kruskal starts from edges rather than vertices.

Mental model:

1. Sort all edges by weight.
2. Start with an empty edge set.
3. Consider edges from cheapest to most expensive.
4. Add an edge only if it does not create a cycle.
5. Stop when the MST has $\lvert V \rvert - 1$ edges.

Cycle checking is usually done with DSU / Union-Find.

The invariant:

> The selected edges always form a forest, and each accepted edge safely merges two components.

Kruskal feels natural when the graph is given as an edge list.

## Dijkstra’s Algorithm

Dijkstra finds shortest paths from a source in graphs with non-negative edge weights.

1. Set `dist[source] = 0`.
2. Set all other distances to infinity.
3. Repeatedly choose the unfinalized vertex with the smallest distance.
4. Use it to relax its neighbors.
5. Continue until the destination is finalized or all reachable vertices are finalized.

Relaxation means:

$$
\text{if } dist[u] + w(u, v) < dist[v],
\quad dist[v] \leftarrow dist[u] + w(u, v)
$$

Then set $prev[v] \leftarrow u$ so the path can be reconstructed.

The most important idea:

> Once Dijkstra chooses the unvisited vertex with smallest distance, that distance is final.

This works because all edge weights are non-negative. A future path cannot go through extra non-negative edges and become shorter than the current minimum.

## Dijkstra With A Min-Heap

However the normal Dijkstra is very slow when the graph is sparse.

- priority queue stores vertices by current `dist`;
- `extract_min` finalizes the next closest vertex;
- `decrease_key` updates a vertex when a better path is found.

The complexity becomes roughly:

$$
O((\lvert E \rvert + \lvert V \rvert)\log \lvert V \rvert)
$$

depending on heap implementation details.

For solving by hand, I want to remember the simpler sentence:

> Find the unfinalized vertex with the smallest distance, use it as the new anchor, update its neighbors, and repeat.

## What I Want To Remember

MST and shortest path problems are different:

- MST connects all vertices cheaply; it does not care about a source-to-target path.
- Dijkstra finds shortest paths from a source; it does not try to connect the whole graph with minimum total edge cost.

Prim and Dijkstra look similar because both use a frontier and a minimum choice, but the meaning of the priority is different. Prim chooses the cheapest edge to grow a tree. Dijkstra chooses the smallest known distance from the source.
