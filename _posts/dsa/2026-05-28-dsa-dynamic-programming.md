---
layout: post
title: "DSA: Dynamic Programming Patterns (And How to Survive Them)"
date: 2026-05-28
permalink: /content/learning-log/dsa-dynamic-programming/
categories: [Learning Log, University, DSA]
tags: [dynamic-programming, matrix-chain, knapsack, lcs, recurrence]
subject: "Data Structures and Algorithms"
level: "University"
course: "Data Structures and Algorithms"
semester: "Year 2"
excerpt: "A study note on the DP problems in my DSA: matrix-chain multiplication, 0-1 knapsack, and longest common subsequence. Because brute-forcing everything is frowned upon."
---

This note covers the dynamic programming (DP) section of my DSA course. Let's be honest: DP is usually the final boss of any algorithms course. But once you start recognizing the "shapes" of the problems, it gets a lot less intimidating. 

The three classic problems here are perfect because they teach three distinct DP patterns:
- **Interval DP:** Matrix-chain multiplication
- **Capacity DP:** 0-1 Knapsack
- **Two-string DP:** Longest Common Subsequence

At the end, I’ll also dive into a cool optimization trick ("Đổi biến" / Variable Swapping) that I picked up back in high school.

## What Dynamic Programming is *Actually* Doing

At its core, DP is just recursion for highly efficient (or lazy) people. It is useful when a problem has:
1. **Optimal substructure:** The best overall answer is built from the best answers to smaller subproblems. 
2. **Overlapping subproblems:** You keep running into the exact same subproblems, and you refuse to calculate them twice.

My go-to survival workflow for any DP problem:
1. **Define the state** (What does one cell in my table actually mean?).
2. **Define the recurrence** (How do I build this cell from smaller cells?).
3. **Define base cases** (Where does it all start?).
4. **Decide table order** (Don't query a cell you haven't filled yet!).
5. **Recover the answer**, and if needed, trace the choices.

*Pro-tip:* If your state is wrong, your recurrence will feel incredibly awkward. If your recurrence is clear, the implementation is just a fancy nested `for` loop.

---

## Matrix-Chain Multiplication

Matrix multiplication is associative. Yay, math!

```text
(A1 A2) A3 = A1 (A2 A3)
```

Both groupings give the same final matrix, but the number of scalar multiplications required can be wildly different depending on where you place the parentheses. It's an optimization game.

Given a sequence of matrix dimensions:
$$p_0, p_1, \ldots, p_n$$

Matrix `i` has the size:
$$p_{i-1} \times p_i$$

The goal is to find the parenthesization that results in the absolute minimum multiplication cost.

### State
Let:
$$m[i, j] = \text{minimum cost to multiply matrices } i \text{ through } j$$

### Recurrence
To compute the cost for `m[i, j]`, we chop the chain at some split point `k`:

$$
m[i, j] = \min_{i \le k < j} \left( m[i, k] + m[k + 1, j] + p_{i-1}p_kp_j \right)
$$

That final term? That's just the cost of combining the two resulting matrices after the left and right sides of the split have already been perfectly optimized.

### Base Case
$$m[i, i] = 0$$
A single matrix doesn't need to be multiplied with itself. Cost: zero.

### Complexity
- **Time:** $O(n^3)$
- **Space:** $\Theta(n^2)$

This is called **Interval DP** because every state represents a specific interval `[i, j]`.

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 505;
int dp[N][N], trace[N][N], p[N];
int n;

void printPath(int i, int j, char &name) {
    if (i == j) { cout << name++; return; }
    cout << "(";
    printPath(i, trace[i][j], name);
    printPath(trace[i][j] + 1, j, name);
    cout << ")";
}

int main() {
    ios_base::sync_with_stdio(0); cin.tie(0);
    
    cin >> n;
    for (int i = 0; i <= n; ++i) cin >> p[i];
    for (int len = 2; len <= n; ++len) {
        for (int i = 1; i <= n - len + 1; ++i) {
            int j = i + len - 1;
            dp[i][j] = 1e9;
            for (int k = i; k < j; ++k) {
                int cost = dp[i][k] + dp[k+1][j] + p[i-1] * p[k] * p[j];
                if (dp[i][j] > cost) {
                    dp[i][j] = cost;
                    trace[i][j] = k;
                }
            }
        }
    }

    cout << dp[1][n] << "\n";
    char name = 'A';
    printPath(1, n, name);
    
    return 0;
}

```

---

## 0-1 Knapsack (The Thief's Dilemma)

The setup:
- You have `n` items.
- Item `i` has weight `w_i` and value `v_i`.
- Your bag has a maximum capacity of `W`.
- You either take an item completely, or leave it. No chopping items in half (that's the "0-1" part).
- Goal: Maximize your loot's value without ripping the bag.

### State
Let:
$$V(k, w) = \text{maximum value using the first } k \text{ items with a capacity limit of } w$$

### Recurrence
If item `k` is too heavy for the current capacity `w`, you have no choice but to skip it:
$$V(k, w) = V(k - 1, w)$$

If it *does* fit, you have to make a choice: skip it anyway, or pack it:
$$V(k, w) = \max \left\{ V(k - 1, w), V(k - 1, w - w_k) + v_k \right\}$$

### Base Cases
$$V(0, w) = 0, \qquad V(k, 0) = 0$$
No items to steal, or a bag that holds nothing? Zero value.

### Complexity
The DP table has `(n + 1) * (W + 1)` states.
- **Time and Space:** $O(nW)$

### Tracing The Chosen Items
DP gives you the max value, but what if the cops want to know *exactly* what you stole? You have to trace back.

Start at the bottom-right of your table: `V[n, W]`.
- If $V[k, w] \neq V[k - 1, w]$, it means item `k` was chosen! Record it, then jump back to $k - 1$ and reduce your capacity to $w - w_k$.
- If $V[k, w] = V[k - 1, w]$, you skipped item `k`. Just move to $k - 1$ and keep your capacity at `w`.

Stop when `k = 0` or `w = 0`. 

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 5005, MAXW = 100005;
int dp[N][MAXW], w[N], v[N];
int n, W;

int main() {
    ios_base::sync_with_stdio(0); cin.tie(0);
    
    cin >> n >> W;
    for (int i = 1; i <= n; ++i) cin >> w[i] >> v[i];

    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= W; ++j) {
            dp[i][j] = dp[i-1][j];
            if (j >= w[i]) {
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
            }
        }
    }

    cout << dp[n][W] << "\n";

    int curW = W;
    for (int i = n; i > 0; --i) {
        if (dp[i][curW] != dp[i-1][curW]) {
            cout << i << " ";
            curW -= w[i];
        }
    }
    
    return 0;
}
```

---

## Longest Common Subsequence (LCS)

A subsequence is formed by deleting characters from a string without messing up the order of the remaining characters. It doesn't need to be contiguous.

> **The Problem:** Given strings `X` and `Y`, find the longest sequence that appears in both strings in the exact same order.

### State
Let:
$$L[i, j] = \text{length of the LCS of the prefix } X[1..i] \text{ and prefix } Y[1..j]$$

### Recurrence
If the last characters of our prefixes match, great! We found a common letter. Add 1 to the sequence and move diagonally backwards:
$$L[i, j] = 1 + L[i - 1, j - 1]$$

If they don't match, we drop one character from either `X` or `Y` and see which path gives us a better score:
$$L[i, j] = \max \left( L[i - 1, j], L[i, j - 1] \right)$$

### Base Cases
$$L[0, j] = 0, \qquad L[i, 0] = 0$$
Comparing anything to an empty string yields a big fat zero.

### Tracing The Sequence
Start from the end at $L[m, n]$.
- If `X[i] == Y[j]`, that character is part of the LCS. Write it down and move diagonally up-left to `i - 1, j - 1`.
- If they differ, look at your neighbors (up or left) and step towards the larger value.

*(Note: Because you're walking backwards, you'll need to reverse the final string to get the actual LCS. Don't forget this, or your string will look like alien gibberish.)*

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 5005;
int dp[N][N];
char x[N], y[N];

int main() {
    ios_base::sync_with_stdio(0); cin.tie(0);
    
    cin >> (x + 1) >> (y + 1);
    int m = strlen(x + 1), n = strlen(y + 1);

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (x[i] == y[j]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }

    cout << dp[m][n] << "\n";

    string res = "";
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (x[i] == y[j]) {
            res += x[i];
            i--; j--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    
    reverse(res.begin(), res.end());
    cout << res << "\n";
    
    return 0;
}
```

---

## My DP Checklist

Whenever I'm staring blankly at a DP problem, I ask myself these 5 questions:
1. What does one single cell in my table represent?
2. What smaller cells does this cell depend on?
3. What are the base cases?
4. What loop order safely fills the table without looking into the void?
5. Do they just want the max/min number, or do I need to trace the actual path?

---

## DP Optimization: Change Variables ("Đổi biến")

Sometimes, you encounter a DP state where one dimension is terrifyingly huge, but the actual values you are calculating (the answers) have a very tiny range. This is where we use "Đổi biến", we swap the axes!

Let's revisit the LCS problem.

Imagine the length of the longest common subsequence won't exceed $\min(m, n)$, but the second dimension of your state (let's say the length of string `B`) is massive, like `MAX_M = 1,000,000`.

Instead of making a giant array, we flip the definition. 

Let $L(i, j)$ be the **smallest position** `k` in string `B` such that the LCS of $A[1..i]$ and $B[1..k]$ is exactly `j`.

To pull this off, we use a helper array. Let $nextPos(i, c)$ be the smallest index $j > i$ such that $A[j] = c$ (where `c` is a character). You can precalculate this `nextPos` array in time bounded by the alphabet size (like $M \times 26$).

Now, we push our values forward instead of directly looking back:
- **Init:** Set all $L(i, j) = \infty$, except $L(0, 0) = 0$.
- For `i` and `j` incrementing, whenever $L(i, j)$ is not infinity:
  - You can always just skip the character in $B$, so we tentatively update: $L(i+1, j) = \min(\text{current}, L(i, j))$.
  - Find the next time the character $B[i+1]$ shows up in $A$ after our current position. Let $k = nextPos(L(i, j), B[i+1])$.
  - If `k` exists, it means we can extend our LCS by 1! So we update $L(i+1, j+1)$ to be the minimum of its current value and `k`.

To find the final answer, just look for the largest `j` where $L(i, j)$ isn't infinity. It’s like magic: you just turned a massive memory-limit-exceeded error into an elegant, highly optimized solution!

```cpp
#include <bits/stdc++.h>
using namespace std;

const int M = 1e6 + 6;
const int N = 5005;

int dp[N][N];
char a[M], b[N];
int nextPos[M][26];
int m, n;

void minimize(int &x, int y) {
    if (x == -1 || x > y) x = y;
}

int main() {
    ios_base::sync_with_stdio(0); cin.tie(0);
    
    cin >> (a + 1) >> (b + 1);
    m = strlen(a + 1); 
    n = strlen(b + 1);
    
    for (int c = 0; c < 26; ++c) {
        for (int i = m - 1; i >= 0; --i) {
            nextPos[i][c] = (a[i + 1] - 'A' == c) ? i + 1 : nextPos[i + 1][c];
        }
    }
    
    int maxLength = min(m, n);
    memset(dp, -1, sizeof(dp));
    dp[0][0] = 0;
    
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j <= i; ++j) {
            if (dp[i][j] >= 0) {
                minimize(dp[i + 1][j], dp[i][j]);
                
                int new_value = nextPos[dp[i][j]][b[i + 1] - 'A'];
                if (new_value > 0) minimize(dp[i + 1][j + 1], new_value);
            }
        }
    }
    
    int ans = 0;
    for (int j = maxLength; j > 0; --j) {
        for (int i = j; i <= n; ++i) {
            if (dp[i][j] >= 0) ans = j;
        }
        if (ans != 0) break;
    }
    
    cout << ans << "\n";
    return 0;
}
```

---

## Divide and Conquer DP

So far, most of our DP tables have been filled in the straightforward way: define a state, loop through all possibilities, pray the complexity does not explode.

But sometimes, the recurrence itself has a hidden structure. If we can exploit that structure, we can replace a slow brute-force transition with something much smarter.

That is exactly what **Divide and Conquer DP Optimization** does.

This technique usually appears when the recurrence looks like this:

$$
dp[i][j] = \min_{k \le j} \left(dp[i - 1][k] + C(k, j)\right)
$$

Here:

* `i` usually represents the number of groups, partitions, operations, or stages.
* `j` represents how many elements we have processed.
* `k` is the splitting point.
* `C(k, j)` is the cost of taking the segment or decision from `k` to `j`.

Without optimization, for every pair `(i, j)`, we try every possible `k`.

If there are `m` layers and `n` positions, the complexity becomes:

$$
O(mn^2)
$$

Which is algorithm-speak for: “good luck passing the time limit.”

Divide and Conquer DP helps reduce this by narrowing down the range of `k` we need to check.


### The Key Observation

Let:

$$
opt[i][j] = \text{the best value of } k \text{ that gives } dp[i][j]
$$

In other words, `opt[i][j]` is the split point where the minimum value is achieved.

The magic condition we want is:

$$
opt[i][j] \le opt[i][j + 1]
$$

This is called the **monotonicity condition**.

It means that as `j` moves to the right, the best split point does not move backwards.

That sounds innocent, but it is extremely powerful.

Because if we know the best split for the middle position, then:

* Everything on the left only needs to search split points up to that middle optimum.
* Everything on the right only needs to search split points starting from that middle optimum.

So instead of blindly checking every `k` for every `j`, we recursively divide the row and keep shrinking the valid range of `k`.

This is why the technique is called **Divide and Conquer DP**.


### The Recursion Shape

Suppose we are currently computing one DP layer: `dp_cur`.

We want to compute all values:

```text
dp_cur[l], dp_cur[l + 1], ..., dp_cur[r]
```

And we already know that the optimal split point for this range must lie somewhere between:

```text
optL and optR
```

We take the middle:

```text
mid = (l + r) / 2
```

Then we brute-force only the valid split range:

```text
k from optL to optR
```

to compute `dp_cur[mid]`.

After finding the best split `bestK`, monotonicity tells us:

```text
opt for the left half  <= bestK
opt for the right half >= bestK
```

So we recurse like this:

```text
compute(l, mid - 1, optL, bestK)
compute(mid + 1, r, bestK, optR)
```

The DP row is not filled from left to right anymore. It is filled in a recursive “middle-first” order.

Honestly, it feels illegal the first time you see it.


### Generic Implementation

The code structure is usually very reusable. The only thing that changes between problems is the cost function `C(k, j)` and the base initialization.

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 4e18;

int n, m;
vector<long long> dp_before, dp_cur;

long long C(int k, int j) {
    // Problem-specific cost function.
    return 0;
}

void compute(int l, int r, int optL, int optR) {
    if (l > r) return;

    int mid = (l + r) >> 1;

    pair<long long, int> best = {INF, -1};

    for (int k = optL; k <= min(mid, optR); ++k) {
        long long value = dp_before[k] + C(k, mid);
        if (value < best.first) {
            best = {value, k};
        }
    }

    dp_cur[mid] = best.first;
    int bestK = best.second;

    compute(l, mid - 1, optL, bestK);
    compute(mid + 1, r, bestK, optR);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> m >> n;

    dp_before.assign(n + 1, INF);
    dp_cur.assign(n + 1, INF);

    // Initialize the first layer here.
    // For example:
    // dp_before[j] = C(0, j);

    for (int i = 1; i < m; ++i) {
        fill(dp_cur.begin(), dp_cur.end(), INF);

        compute(0, n, 0, n);

        dp_before.swap(dp_cur);
    }

    cout << dp_before[n] << '\n';

    return 0;
}
```

A very important detail:

```cpp
for (int k = optL; k <= min(mid, optR); ++k)
```

The `min(mid, optR)` part appears because many recurrences only allow `k <= j`. Since we are computing `dp_cur[mid]`, split points larger than `mid` are invalid.

This small boundary detail has ruined many submissions. Ask me how I know.


### Complexity

For one DP layer, the divide-and-conquer recursion has about `log n` levels.

At each level, the search ranges for `k` are controlled by the monotonicity of `opt`. So instead of paying `O(n^2)` per layer, we pay roughly:

$$
O(n \log n)
$$

For `m` layers, the total complexity becomes:

$$
O(mn \log n)
$$

This is a big improvement over:

$$
O(mn^2)
$$

The memory can usually be reduced to:

$$
O(n)
$$

because each layer only depends on the previous layer.

So the optimization gives us:

* **Time:** from $O(mn^2)$ to $O(mn \log n)$
* **Space:** usually $O(n)$ with rolling arrays

Not bad for just being clever about where the best `k` can hide.


### When Can We Use It?

The most important question is not “Can I write the code?”

The important question is:

> Can I prove that the optimal split point is monotonic?

We need:

$$
opt[i][j] \le opt[i][j + 1]
$$

If this is true, Divide and Conquer DP is safe.

If this is false, the algorithm may still compile, run very fast, and confidently give you complete nonsense.

There are usually two ways to justify the monotonicity condition:

1. Prove the monotonicity of `opt` directly.
2. Prove a stronger property of the cost function, usually the **quadrangle inequality**.

The second path is common because the quadrangle inequality is often easier to verify from the cost function.


### Relationship Between Quadrangle Inequality and Monotonicity

Now let’s connect the scary math condition to the thing the algorithm actually needs.

For Divide and Conquer DP, what we truly need is:

$$
opt[i][j] \le opt[i][j + 1]
$$

This is the **monotonicity condition**.

It says: as the right endpoint `j` increases, the best split point should not move to the left.

However, proving this directly can be annoying. So instead, we often prove that the cost function `C` satisfies the **quadrangle inequality**:

$$
C(a, c) + C(b, d) \le C(a, d) + C(b, c)
$$

for:

$$
a < b \le c < d
$$

This condition basically says that the cost function behaves in a “well-ordered” way when intervals are stretched. It prevents the optimal split points from jumping backwards.

Here is the important implication:

$$
\text{Quadrangle Inequality} \implies \text{Monotonicity of } opt
$$

More specifically:

$$
C(a, c) + C(b, d) \le C(a, d) + C(b, c)
$$

implies:

$$
opt[i][j] \le opt[i][j + 1]
$$

So the quadrangle inequality is a sufficient condition for Divide and Conquer DP.

But be careful:

$$
\text{Monotonicity of } opt \;\not\!\!\!\implies \text{Quadrangle Inequality}
$$

The implication only goes one way.

That means:

* If `C` satisfies the quadrangle inequality, then we are safe.
* If `C` does not obviously satisfy it, Divide and Conquer DP might still work, but we need another proof of monotonicity.
* We should never blindly assume the optimization is valid just because the recurrence “looks partition-y.”

#### Proof Sketch

Let us prove the increasing case.

Assume the opposite of what we want.

Suppose there exists a position `j` such that:

$$
opt[i][j] > opt[i][j + 1]
$$

Let:

$$
p = opt[i][j], \qquad q = opt[i][j + 1]
$$

So:

$$
p > q
$$

Because `p` is optimal for `j`, choosing `p` must be better than choosing `q`:

$$
dp[i - 1][p] + C(p, j) < dp[i - 1][q] + C(q, j)
$$

Because `q` is optimal for `j + 1`, choosing `q` must be better than choosing `p`:

$$
dp[i - 1][q] + C(q, j + 1) < dp[i - 1][p] + C(p, j + 1)
$$

Now rearrange these two inequalities. The `dp[i - 1]` terms cancel out, leaving us with:

$$
C(p, j) + C(q, j + 1) < C(q, j) + C(p, j + 1)
$$

But since:

$$
q < p \le j < j + 1
$$

the quadrangle inequality gives us:

$$
C(q, j) + C(p, j + 1) \le C(q, j + 1) + C(p, j)
$$

or equivalently:

$$
C(p, j) + C(q, j + 1) \ge C(q, j) + C(p, j + 1)
$$

This directly contradicts the inequality we got from assuming `p > q`.

Therefore, our assumption was false.

So:

$$
opt[i][j] \le opt[i][j + 1]
$$

And that is exactly the monotonicity condition needed for Divide and Conquer DP.

Moral of the story: the quadrangle inequality is not the optimization itself. It is the certificate that tells us the optimization is allowed.

Or in less formal terms:

> Divide and Conquer DP is the trick.
> Monotonicity is the permission slip.
> Quadrangle inequality is one common way to get that permission slip signed.

### Funny problems
- [Codeforces - 834D (The Bakery)](https://codeforces.com/contest/834/problem/D)
- [Atcoder - ARC067D (Yakiniku Restaurants)](https://atcoder.jp/contests/arc067/tasks/arc067_d)

---

## DP Optimization: Convex Hull Trick

Sometimes, a DP recurrence looks painfully quadratic:

$$
dp[i] = \min_{0 \le j < i} \left(dp[j] + \text{some cost involving } i \text{ and } j\right)
$$

At first glance, this screams:

```cpp
for (int i = 1; i <= n; ++i) {
    for (int j = 0; j < i; ++j) {
        dp[i] = min(dp[i], transition(j, i));
    }
}
```

Which gives us:

$$
O(n^2)
$$

And as usual, the time limit looks at that and says: absolutely not.

The **Convex Hull Trick** is used when we can rewrite the transition into something that looks like a line equation:

$$
y = ax + b
$$

More specifically, we want to transform the recurrence into this shape:

$$
dp[i] = \min_j \left(a_j x_i + b_j\right) + constant_i
$$

Where:

* $x_i$ depends only on the current state `i`.
* $a_j$ and $b_j$ depend only on the previous state `j`.
* $constant_i$ depends only on `i`, so it does not affect which `j` is optimal.

Once we reach this form, every previous state `j` becomes a line:

$$
y = a_jx + b_j
$$

Then computing `dp[i]` becomes:

> Among all lines added so far, which one gives the smallest value at $x = x_i$?

That is the entire trick.

We are no longer thinking of DP transitions as “trying all previous states.”
We are thinking of them as “querying the best line.”

Very classy. Very geometric. Very easy to mess up with signs.


### The Core Shape

Suppose we have a recurrence:

$$
dp[i] = \min_{j < i} \left(dp[j] + A_jB_i\right)
$$

This already looks suspiciously linear.

For a fixed `j`, we can define a line:

$$
y = A_jx + dp[j]
$$

And for the current `i`, we query at:

$$
x = B_i
$$

So:

$$
dp[i] = \min_{j < i} \left(A_jB_i + dp[j]\right)
$$

becomes:

$$
dp[i] = \min_j y_j(B_i)
$$

where each previous state `j` contributes one line:

$$
y_j(x) = A_jx + dp[j]
$$

That means the DP process becomes:

1. Add a line representing some previous state.
2. Query the best line for the current `x`.
3. Use that result to compute the current DP value.
4. Add the new line for future states.

In code terms:

```cpp
add_line(a_j, b_j);
dp[i] = query(x_i) + constant_i;
```

The hard part is not the DP anymore.

The hard part is maintaining the set of lines efficiently.

### Why Is It Called “Convex Hull”?

Imagine drawing all the lines on a graph.

For a minimum query, some lines will never be useful. They are always above another line, so they can never produce the minimum value for any `x`.

The useful parts of the remaining lines form the **lower envelope** of the set of lines.

That lower envelope behaves like a convex shape, which is where the name **Convex Hull Trick** comes from.

For maximum queries, we use the upper envelope instead.

So:

* Minimum query → lower hull.
* Maximum query → upper hull.

In implementation, we usually do not literally build a geometric convex hull of points. We maintain the useful lines and remove the useless ones.

Same vibe, different battlefield.


### When Can We Use The Simple Version?

There are several versions of Convex Hull Trick, and choosing the right one matters.

The easiest version works when:

1. Lines are added in sorted order of slope.
2. Queries are made in sorted order of `x`.

In that case, we can maintain the hull with a stack and answer queries with a moving pointer.

This gives us amortized:

$$
O(1)
$$

per insertion and query, after sorting or if the order is naturally guaranteed by the DP.

So the total complexity can become:

$$
O(n)
$$

or:

$$
O(n \log n)
$$

if sorting is needed beforehand.

This version is beautiful because it is short and fast.

But it is also picky.

If slopes are not sorted, or query points are not monotonic, we need a more flexible structure like `LineContainer` or Li Chao Tree.

### Removing Bad Lines

Suppose we are doing minimum queries, and lines are added in slope order.

When adding a new line, the last line in the hull may become useless.

Let the last three lines be:

$$
l_1, l_2, l_3
$$

where `l3` is the new line.

The middle line `l2` is bad if it never becomes the best line for any value of `x`.

Geometrically, this happens when the intersection of `l1` and `l3` appears before the intersection of `l1` and `l2`.

In code, we usually avoid floating-point division by cross multiplication.

For lines:

$$
l(x) = ax + b
$$

we can write a helper like this:

```cpp
struct Line {
    long long a, b;

    long long eval(long long x) const {
        return a * x + b;
    }
};

bool bad(const Line& l1, const Line& l2, const Line& l3) {
    return (l3.b - l1.b) * (l1.a - l2.a)
         <= (l2.b - l1.b) * (l1.a - l3.a);
}
```

Depending on whether you are maintaining a lower hull or upper hull, and whether slopes are increasing or decreasing, the comparison sign may need to change.

This is the part where one flipped inequality can send your whole solution into the shadow realm.

### Monotonic CHT Implementation

Here is a clean version for minimum queries when:

* Slopes are added in monotonic order.
* Query values `x` are also monotonic.

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

struct Line {
    ll a, b; // y = ax + b

    ll eval(ll x) const {
        return a * x + b;
    }
};

struct ConvexHullTrick {
    vector<Line> hull;
    int ptr = 0;

    bool bad(const Line& l1, const Line& l2, const Line& l3) {
        return (l3.b - l1.b) * (l1.a - l2.a)
             <= (l2.b - l1.b) * (l1.a - l3.a);
    }

    void addLine(ll a, ll b) {
        Line newLine = {a, b};

        while (hull.size() >= 2 &&
               bad(hull[hull.size() - 2], hull[hull.size() - 1], newLine)) {
            hull.pop_back();
        }

        hull.push_back(newLine);

        if (ptr >= (int)hull.size()) {
            ptr = (int)hull.size() - 1;
        }
    }

    ll query(ll x) {
        while (ptr + 1 < (int)hull.size() &&
               hull[ptr + 1].eval(x) <= hull[ptr].eval(x)) {
            ++ptr;
        }

        return hull[ptr].eval(x);
    }
};
```

This implementation uses a pointer because queries are monotonic.

As `x` moves in one direction, the best line also moves in one direction along the hull. So the pointer never moves backward.

That is why the total query cost is linear across all queries.


### What If Queries Are Not Monotonic?

If lines are added in sorted slope order, but queries are random, we can still use the hull.

Instead of a moving pointer, we binary search on the hull.

The idea is simple:

For a given `x`, compare two neighboring lines. If the next line gives a smaller value, move right. Otherwise, move left.

This gives:

$$
O(\log n)
$$

per query.

```cpp
ll query(ll x) {
    int l = 0, r = (int)hull.size() - 1;

    while (l < r) {
        int mid = (l + r) >> 1;

        if (hull[mid + 1].eval(x) <= hull[mid].eval(x)) {
            l = mid + 1;
        } else {
            r = mid;
        }
    }

    return hull[l].eval(x);
}
```

So the stack-based CHT has two common modes:

| Slopes    | Queries   | Query Method  | Complexity       |
| --------- | --------- | ------------- | ---------------- |
| Monotonic | Monotonic | Pointer walk  | Amortized $O(1)$ |
| Monotonic | Random    | Binary search | $O(\log n)$      |

If slopes are not monotonic, this stack version is no longer enough.


### Online CHT With LineContainer

When lines can be added in arbitrary slope order, we need a more general data structure.

A common competitive programming implementation is called `LineContainer`.

It stores lines in a `multiset`, sorted by slope. Each line also remembers the rightmost position where it is optimal.

This supports:

* Add a line in $O(\log n)$.
* Query the maximum or minimum value in $O(\log n)$.

Here is a standard max-query version using integer division.

To get minimum queries, we can insert `-a` and `-b`, query maximum, and then negate the answer.

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

const ll INF = LLONG_MAX;

struct Line {
    mutable ll a, b, p;

    bool operator<(const Line& other) const {
        return a < other.a;
    }

    bool operator<(ll x) const {
        return p < x;
    }
};

struct LineContainer : multiset<Line, less<>> {
    // Floored division.
    ll div(ll x, ll y) {
        return x / y - ((x ^ y) < 0 && x % y);
    }

    bool isect(iterator x, iterator y) {
        if (y == end()) {
            x->p = INF;
            return false;
        }

        if (x->a == y->a) {
            x->p = x->b > y->b ? INF : -INF;
        } else {
            x->p = div(y->b - x->b, x->a - y->a);
        }

        return x->p >= y->p;
    }

    void addLine(ll a, ll b) {
        auto z = insert({a, b, 0});
        auto y = z++;
        auto x = y;

        while (isect(y, z)) {
            z = erase(z);
        }

        if (x != begin() && isect(--x, y)) {
            isect(x, y = erase(y));
        }

        while ((y = x) != begin() && (--x)->p >= y->p) {
            isect(x, erase(y));
        }
    }

    ll queryMax(ll x) {
        assert(!empty());
        auto l = *lower_bound(x);
        return l.a * x + l.b;
    }

    void addMinLine(ll a, ll b) {
        addLine(-a, -b);
    }

    ll queryMin(ll x) {
        return -queryMax(x);
    }
};
```

This version is more powerful than the monotonic stack version, but also more annoying to debug.

Use it when:

* Slopes are not inserted in sorted order.
* Queries are not monotonic.
* You need a fully online structure.

For many DP problems, the monotonic version is enough and much simpler.

### How To Recognize CHT In A DP Problem

When staring at a recurrence, I usually ask:

1. Is there a `min` or `max` over a previous index `j`?
2. Can I separate the expression into:
   $$
   a_jx_i + b_j + constant_i
   $$
3. Does `a_j` depend only on `j`?
4. Does `x_i` depend only on `i`?
5. Can previous states be represented as lines?
6. Are slopes or queries monotonic?

If the answer is yes, there is probably a Convex Hull Trick hiding inside the recurrence.

The most important algebra move is to separate the expression into three groups:

$$
\text{stuff depending only on } j
$$

$$
\text{stuff depending only on } i
$$

$$
\text{stuff that looks like } a_jx_i
$$

Once you see:

$$
a_jx_i + b_j
$$

you should immediately think:

> Wait. This is just a line.

And then CHT enters the chat.

### Common Pitfalls

#### 1. Mixing Up Min And Max

For minimum queries, we need the lower hull.

For maximum queries, we need the upper hull.

Sometimes the easiest implementation trick is:

* Store lines normally for max queries.
* Store negated lines for min queries.

Because:

$$
\min y = -\max(-y)
$$

So if you already have a max-query `LineContainer`, you can do:

```cpp
addLine(-a, -b);
answer = -queryMax(x);
```

Clean. Slightly cursed. Very useful.


#### 2. Overflow

Line values can become huge.

If `a`, `x`, and `b` are around $10^9$, then:

$$
ax + b
$$

can reach $10^{18}$.

So use `long long`.

If values can go beyond that, use `__int128` for multiplication and cross products.

This is especially important inside the `bad()` function, because cross multiplication can overflow even when the final answer does not.


#### 3. Equal Slopes

Two lines with the same slope never cross.

For minimum queries:

* Keep the one with the smaller intercept.
* Throw away the one with the larger intercept.

For maximum queries:

* Keep the one with the larger intercept.
* Throw away the one with the smaller intercept.

Forgetting this case is a classic way to summon mysterious WA.


#### 4. Wrong Monotonic Assumption

The pointer-based version only works when query `x` values are monotonic.

If `x` goes up, down, then up again, the pointer may skip the correct line forever.

In that case, use binary search on the hull or a `LineContainer`.

Fast wrong answers are still wrong answers.

Unfortunately.


### Complexity Summary

For the monotonic stack version:

* **Add line:** amortized $O(1)$
* **Query with monotonic x:** amortized $O(1)$
* **Query with random x:** $O(\log n)$
* **Memory:** $O(n)$

For `LineContainer`:

* **Add line:** $O(\log n)$
* **Query:** $O(\log n)$
* **Memory:** $O(n)$

So Convex Hull Trick usually turns a DP from:

$$
O(n^2)
$$

into either:

$$
O(n)
$$

or:

$$
O(n \log n)
$$

depending on how friendly the line and query orders are.


### Funny problem
- [Codeforces - 631E (Product Sum)](https://codeforces.com/contest/631/problem/E)
- [Codeforces - 311B (Cats Transport)](https://codeforces.com/contest/311/problem/B)