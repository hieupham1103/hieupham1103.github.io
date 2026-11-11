---
layout: post
title: "Databases: Relational Algebra and Relational Calculus"
date: 2026-11-03
permalink: /content/learning-log/relational-algebra-calculus/
categories: [Learning Log, University, Databases]
tags: [Databases, relational model, relational algebra, relational calculus, joins]
subject: "Databases"
level: "University"
course: "Databases"
semester: "Year 3"
duration: "10 min read"
excerpt: "A concise guide to relations, algebraic query operators, joins, division, and tuple relational calculus, with worked examples."
---


## 1. The relational model

- A **relation** is a set of tuples (rows) with named attributes (columns).
- Its **schema** gives the relation name, attributes, and their domains (allowed types). Its **instance** is the current set of tuples.
- **Cardinality** $\lvert R\rvert$ is the number of tuples in relation $R$.
- A **candidate key** is a minimal set of attributes that uniquely identifies a tuple. One candidate key is chosen as the **primary key**.
- Relations have **set semantics**: row order does not matter and duplicate tuples are removed.
- Relational algebra has **closure**: every operation returns another relation, so operations can be combined.

We will use these schemas (with `MatrNr`, `LectNr`, and `ProfID` as identifiers):

```text
Student(MatrNr, SName, Birthday, Semester)
Lecture(LectNr, Title, Credits)
attends(MatrNr, LectNr)
Professor(ProfID, PName, RoomNr)
gives(ProfID, LectNr)
```

The slide's `Student` instance (showing the columns used in its examples):

| MatrNr | SName | Birthday |
| --- | --- | --- |
| 1 | Becker, Hans | 1990-10-12 |
| 2 | Graf, Anne | 1992-07-30 |
| 3 | Schulze, Iris | 1991-03-24 |
| 4 | Petersen, Bernd | 1992-07-30 |

Here `Birthday` has a date domain and `MatrNr` can serve as the primary key. The `Semester` attribute from our extended schema is not needed for this particular slide example.

## 2. Relational algebra: select and combine data

Read a nested expression **from the inside out**. The first operations work on one relation:

| Operator | What it does | Example |
| --- | --- | --- |
| **Selection** $\sigma_p(R)$ | Keeps tuples satisfying predicate $p$. | $\sigma_{Semester=2}(Student)$ |
| **Projection** $\pi_{A,B}(R)$ | Keeps specified attributes and removes duplicate result tuples. | $\pi_{SName}(Student)$ |
| **Renaming** $\rho_{New\leftarrow Old}(R)$ | Changes an attribute name, often to avoid ambiguity. | $\rho_{ID\leftarrow MatrNr}(Student)$ |

### Worked examples from the lecture

- **Select students:** $\sigma_{MatrNr\leq3\ \land\ Birthday>1991\text{-}01\text{-}01}(Student)$ keeps only students meeting *both* conditions:

  | MatrNr | SName | Birthday |
  | --- | --- | --- |
  | 2 | Graf, Anne | 1992-07-30 |
  | 3 | Schulze, Iris | 1991-03-24 |

- **Select, then project:** $\pi_{SName}(\sigma_{Semester=2}(Student))$ returns just the names of students in semester 2.
- **Projection removes duplicates:** Graf and Petersen share a birthday, but $\pi_{Birthday}(Student)$ contains that date **once**:

  | Birthday |
  | --- |
  | 1990-10-12 |
  | 1992-07-30 |
  | 1991-03-24 |

### Combining relations

- **Cartesian product** $R\times S$ pairs every tuple of $R$ with every tuple of $S$. Its cardinality is $\lvert R\rvert\cdot\lvert S\rvert$. Four lectures and two professors yield eight pairs, including pairs that do not describe an actual teaching assignment.
- A **theta join** $R\bowtie_p S$ keeps only product pairs satisfying predicate $p$: $R\bowtie_p S=\sigma_p(R\times S)$. An **equi-join** uses equality for $p$.
- A **natural join** $R\bowtie S$ matches on *every* equally named attribute and outputs each shared attribute once. If the relations share no attribute name, it behaves like a Cartesian product.

The lecture's Lecture–Professor example starts with these two relations (only the relevant columns are shown):

`Lecture`:

| LectNr | ProfPersID |
| --- | --- |
| 1 | 1 |
| 2 | 1 |
| 3 | 2 |
| 4 | 2 |

`Professor`:

| PersID | Name |
| --- | --- |
| 1 | Schmitt |
| 2 | Maier |

The join uses an explicit condition:

$$Lecture\bowtie_{Lecture.ProfPersID=Professor.PersID}Professor$$

Its result is:

| LectNr | ProfPersID | PersID | Name |
| --- | --- | --- | --- |
| 1 | 1 | 1 | Schmitt |
| 2 | 1 | 1 | Schmitt |
| 3 | 2 | 2 | Maier |
| 4 | 2 | 2 | Maier |

The join discards the four other pairs produced by the Cartesian product.

In our schemas, a student's lectures come from $Student\bowtie attends\bowtie Lecture$: the first join matches `MatrNr`, and the second matches `LectNr`. For names of students attending a six-credit lecture:

$$\pi_{SName}(\sigma_{Credits=6}(Student\bowtie attends\bowtie Lecture))$$

**Watch attribute names:** A natural join checks *all* shared names. For $R(A,B,C)$ and $S(B,C,D)$, it requires both $R.B=S.B$ and $R.C=S.C$. Rename attributes when equal names have different meanings or when a join needs to align differently named keys.

### Outer joins and set operations

- An **inner join** omits unmatched tuples. A **left outer join** (`R ⟕ S`) keeps unmatched left tuples; a right outer join keeps unmatched right tuples; a full outer join keeps both. Missing values in the added rows become `NULL`.
- **Union** $R\cup S$ keeps tuples in either relation. **Intersection** $R\cap S$ keeps tuples in both. **Difference** $R\setminus S$ keeps tuples in $R$ but not $S$.
- Set operations need compatible schemas: the same number of attributes and compatible types in corresponding positions.

The slide uses two professor relations:

`Prof1`:

| PersID | Name |
| --- | --- |
| 1 | Schmitt |
| 2 | Maier |

`Prof2`:

| PersID | Name |
| --- | --- |
| 1 | Schmitt |
| 3 | Stein |

The results are:

| Query | PersID | Name |
| --- | --- | --- |
| $Prof1\cup Prof2$ | 1 | Schmitt |
| $Prof1\cup Prof2$ | 2 | Maier |
| $Prof1\cup Prof2$ | 3 | Stein |
| $Prof1\cap Prof2$ | 1 | Schmitt |
| $Prof1\setminus Prof2$ | 2 | Maier |
| $Prof2\setminus Prof1$ | 3 | Stein |

The last two rows show why **difference depends on order**.

### Division means “for every”

Division $R(X,Y)\div S(Y)$ returns each $x$ paired with **every** $y$ in $S$. The attributes of $S$ must be a subset of those in $R$.

`attends`:

| MatrNr | LectNr |
| --- | --- |
| 1 | 1 |
| 1 | 2 |
| 2 | 1 |
| 2 | 3 |
| 3 | 1 |
| 3 | 2 |
| 3 | 3 |

`RequiredLectures`:

| LectNr |
| --- |
| 1 |
| 2 |

Result of $attends\div RequiredLectures$:

| MatrNr |
| --- |
| 1 |
| 3 |

Students 1 and 3 attend both required lectures. Student 3 also attends lecture 3, which does not hurt the result. If only lecture 3 were required, the result would be $\{2,3\}$. This is the slide's central point: **the result changes with the divisor**.

## 3. Relational calculus: describe the result

Relational algebra describes operations that produce a result. **Relational calculus** states the conditions that the desired tuples must satisfy. It is based on first-order logic.

The slides distinguish **tuple relational calculus (TRC)** and **domain relational calculus (DRC)**; DRC is not studied further here. A TRC query has the form $\{t\mid P(t)\}$, meaning “all tuples $t$ for which $P(t)$ is true.” To return one attribute, write $\{t.A\mid P(t)\}$.

- **Atoms:** $s\in Student$, $s.MatrNr=a.MatrNr$, and $s.Semester>2$ are basic conditions.
- **Connectives:** $\land$ (and), $\lor$ (or), $\neg$ (not), and $\Rightarrow$ (implies) combine conditions.
- **Quantifiers:** $\exists$ means “there exists”; $\forall$ means “for every.” A quantifier **binds** its variable. A variable not bound by a quantifier is **free**, often describing the output.

### Worked TRC examples

**Professors in room 201:**

$$\{p\mid p\in Professor\land p.RoomNr=201\}$$

**Names of students attending at least one lecture:**

$$\{s.SName\mid s\in Student\land\exists a\in attends\ (a.MatrNr=s.MatrNr)\}$$

**IDs of students attending every lecture:**

$$\{s.MatrNr\mid s\in Student\land\forall l\in Lecture\ (\exists a\in attends\ (a.MatrNr=s.MatrNr\land a.LectNr=l.LectNr))\}$$

Read the last formula as: choose a student; for **every** lecture, there must **exist** an attendance tuple connecting that student to that lecture. The corresponding algebraic idea is division.

**Students attending a lecture given by Schmitt:** find a student's attendance tuple, a matching `gives` tuple, and finally a professor named Schmitt:

$$\{s.SName\mid s\in Student\land\exists a\in attends\ (s.MatrNr=a.MatrNr\land\exists g\in gives\ (a.LectNr=g.LectNr\land\exists p\in Professor\ (g.ProfID=p.ProfID\land p.PName=\text{Schmitt})))\}$$

### Logic rules and safety

Useful transformations:

- $\forall x\in R\ P(x)\equiv\neg\exists x\in R\ \neg P(x)$: “all” means “there is no counterexample.”
- $\exists x\in R\ P(x)\equiv\neg\forall x\in R\ \neg P(x)$.
- $\neg(P\lor Q)\equiv\neg P\land\neg Q$ and $\neg(P\land Q)\equiv\neg P\lor\neg Q$ (De Morgan's laws).
- $P\Rightarrow Q\equiv\neg P\lor Q$.

A calculus expression must be **safe**: its possible result values must be restricted to values in the referenced relations or constants. $\{n\mid\neg(n\in Professor)\}$ is unsafe because it asks for all tuples *outside* `Professor`, with no bounded source. The room-201 query above is safe because it selects from `Professor`.

## Quick recap

- **Selection** filters rows; **projection** chooses columns; **join** matches related rows.
- **Set operations** compare compatible relations; **division** expresses a “for every” requirement.
- **TRC** specifies the result with logical conditions, especially $\exists$ and $\forall$.
- Safe relational calculus and relational algebra have the same expressive power for these queries.
