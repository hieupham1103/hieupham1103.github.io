---
## layout: post
title: "Free Context"  
date: 2026-04-01  
permalink: /content/learning-log/tcs-free_context/  
categories: [Learning Log, University, TCS]  
tags: []  
subject: "Theoretical Computer Science"  
level: "University"  
course: "Theoretical Computer Science"  
semester: "Year 2"  
excerpt: ""
---

# Context-Free Language

Ở các chương trước, ta học regular language và finite automata. Nhưng không phải mọi ngôn ngữ đều regular. Ví dụ kinh điển:

$$
L=\{a^nb^n:n\geq0\}
$$

Các chuỗi như aabb, aaabbb thuộc L, nhưng aab không thuộc L. Ngôn ngữ này cần “đếm” số lượng a và b bằng nhau, trong khi finite automata không có bộ nhớ vô hạn để đếm. Đây là lý do ta mở rộng từ regular languages sang context-free languages, đặc biệt để mô tả các cấu trúc lồng nhau trong ngôn ngữ lập trình.

# Context-Free Grammar

Một grammar:

$$
G=(V,T,S,P)
$$

được gọi là context-free grammar nếu mọi luật sinh trong $P$ đều có dạng:

$$
A \rightarrow x
$$

trong đó:

$$
A\in V,x\in (V\cup T)^∗
$$

Nghĩa là vế trái chỉ được có đúng một biến. Một ngôn ngữ $L$ được gọi là context-free language nếu tồn tại CFG $G$ sao cho:

$$
L=L(G)
$$

> “Context-free” nghĩa là khi thấy biến $A$, ta có thể thay $A$ bằng vế phải $x$ mà không cần quan tâm ngữ cảnh xung quanh $A$.

## Các mẫu grammar nên nhớ

### Sinh $a^nb^n$

$$
S\rightarrow aSb∣\lambda
$$



### Sinh $a^nb^n, n \geq 1$

$$
S\rightarrow aSb∣ab
$$

### Sinh palindrome chẵn trên $\{a,b\}$

$$
S\rightarrow aSa∣bSb∣\lambda
$$




# Quan hệ giữa Regular Language và Context-Free Language

- Mọi regular language đều là context-free.
- Nhưng có nhiều context-free language không regular

# Leftmost và Rightmost Derivations

Trong grammar không linear, một sentential form có thể có nhiều biến. Khi đó ta có thể chọn biến nào để thay trước.

$$
S \rightarrow AB \\
A \rightarrow aaA \mid \lambda \\
B \rightarrow Bb \mid \lambda
$$

Dẫn xuất chuỗi `aab` có thể theo nhiều thứ tự khác nhau.

$$
S \Rightarrow AB \Rightarrow aaAB \Rightarrow aaB \Rightarrow aaBb \Rightarrow aab \\
S \Rightarrow AB \Rightarrow ABb \Rightarrow aaABb \Rightarrow aaAb \Rightarrow aab
$$

Hai dẫn xuất này dùng cùng luật sinh, sinh cùng chuỗi, nhưng khác thứ tự thay biến.

- Một derivation là leftmost derivation nếu ở mỗi bước ta thay biến ngoài cùng bên trái.

- Một derivation là rightmost derivation nếu ở mỗi bước ta thay biến ngoài cùng bên phải.

# Derivation Tree / Parse Tree

Derivation tree là cách biểu diễn dẫn xuất bằng cây, độc lập với thứ tự áp dụng luật.

Derivation tree là ordered tree thỏa các điều kiện:
- Root được gắn nhãn $S$.
- Mọi leaf thuộc $T \cup \{\lambda\}$.
- Mọi internal vertex thuộc $V$.
- Nếu node có nhãn $A$ và các con từ trái sang phải là $a_1,a_2,…,a_n$, thì grammar phải có luật:

$$
A\rightarrow a_1​a_2​⋯a_n​
$$

- Nếu một leaf là $\lambda$, nó không có sibling.

![](/assets/img/Therectical/FreeContext/dev_tree.png)

## Định lý liên hệ giữa sentential form và derivation tree

Với CFG $G=(V,T,S,P)$:

- Với mọi $w\in L(G)$, tồn tại một derivation tree của $G$ có yield là $w$.
- Ngược lại, yield của mọi derivation tree đều thuộc $L(G)$.
- Nếu một partial derivation tree có root là $S$, yield của nó là một sentential form của $G$.

# Parsing và Membership

**Membership algorithm** là bất kì thuật toán nào dùng để kiểm tra $w \in L(G)$ hay không?

**Parsing** là tìm một dãy luật sinh để dẫn xuất ra $w$.

# s-Grammar
Một CFG $G=(V,T,S,P)$ là simple grammar hoặc s-grammar nếu mọi production có dạng:

$$
A\rightarrow ax, A\in V,a\in T,x\in V^∗
$$

và với mỗi cặp $(A,a)$, trong $P$ xuất hiện nhiều nhất một lần.

Đơn giản hơn thì:
- RHS phải bắt đầu bằng terminal.
- Sau terminal chỉ được là chuỗi biến.
- Không được có hai luật cùng vế trái $A$ và cùng terminal đầu $a$.

Ví dụ:

$$
S\rightarrow aS∣bSS∣c
$$

là s-grammar.


$$
S\rightarrow aS∣bSS∣aSS∣c
$$

không là s-grammar vì có hai luật bắt đầu bằng cùng cặp $(S,a)$.

$$
S \rightarrow aS \\
S \rightarrow aSS
$$

# Ambiguity

Một CFG $G$ được gọi là ambiguous nếu tồn tại một chuỗi:
$$
w \in L(G)
$$
có ít nhất hai derivation trees khác nhau.

Tương đương, w có ít nhất hai leftmost derivations hoặc hai rightmost derivations khác nhau.

![](/assets/img/Therectical/FreeContext/ambiguous.png)

# Simplification of Context-Free Grammars

## Removing Useless Productions

Một biến $A$ được gọi là useful nếu nó thật sự xuất hiện trong một dẫn xuất tạo ra chuỗi terminal hoàn chỉnh. Một production chứa biến useless cũng là useless production.


### Trường hợp 1: Không sinh được chuỗi terminal


Ví dụ

$$
A\rightarrow aA
$$

Biến $A$ cứ gọi lại chính nó, không bao giờ kết thúc thành toàn terminal. Vậy $A$ không sinh được terminal string.

### Trường hợp 2: Không reachable từ start symbol

$$
S \rightarrow aS \mid b \\
A \rightarrow a
$$

Biến $A$ có thể sinh terminal $a$, nhưng từ $S$ không bao giờ đi tới $A$. Vậy $A$ vẫn useless.


### Quy trình loại useless productions

#### Bước 1: Loại biến không sinh được terminal
Tìm tập biến generating, tức là biến có thể sinh ra chuỗi terminal.
- Biến nào có luật dạng dưới thì thì đánh dấu generating.

$$
A\rightarrow w,w\in T^∗
$$

- Nếu có luật dưới mà mọi biến trong RHS đều generating, còn terminal thì không cần xét, thì A cũng generating.

$$
A\rightarrow x_1​x_2​⋯x_k​
$$

- Lặp đến khi không thêm được biến mới.
- Xóa mọi biến không generating và các production liên quan.

#### Bước 2: Loại biến không reachable từ $S$

Tìm các biến reachable từ $S$
- Đánh dấu $S$ là reachable.
- Nếu $A$ reachable và có production dạng dưới thì $B$ reachable:
$$
A\rightarrow xBy
$$

- Lặp đến khi không thêm được biến mới.
- Xóa các biến không reachable và các production liên quan.

## Removing $\lambda$-Productions
$$
A\rightarrow \lambda
$$
được gọi là $\lambda$-production

Một biến $A$ được gọi là nullable nếu:
$$
A\Rightarrow^∗\lambda
$$

A nullable không nhất thiết phải có luật trực tiếp $A\rightarrow \lambda$


### Quy trình loại $\lambda$-productions

- Tìm các nullable variable
- Xóa các $\lambda$-production 
- Thêm các production mới mà thế $\lambda tương ứng với các nullable variable vào.
    - Với mỗi production:
    $$ 
    A\rightarrow x_1​x_2​⋯x_m​
    $$
    - Nếu trong RHS có nullable variables, ta tạo thêm các production bằng cách xóa hoặc giữ từng nullable variable theo mọi tổ hợp.
    - Nếu xóa hết RHS thành $\lambda$, thì không thêm.

![](/assets/img/Therectical/FreeContext/lambda_production.png)

## Removing Unit-Productions

$$
A\rightarrow B; A,B \in V
$$
được gọi là unit-production.

Nếu:

$$
A\Rightarrow^∗B
$$

bằng các unit-productions, và $B$ có luật không phải unit:

$$
B\rightarrow x
$$

thì ta cho $A$ sinh trực tiếp:
$$
A\rightarrow y
$$


Sau đó xóa các unit-productions

![](/assets/img/Therectical/FreeContext/unit_prod_0.png)
![](/assets/img/Therectical/FreeContext/unit_prod_1.png)


## Thứ tự xóa gợi ý

- Loại λ-productions.
- Loại unit-productions.
- Loại useless productions.

> Loại λ có thể sinh ra unit-productions mới. Loại unit-productions có thể làm một số biến trở nên useless. Vì vậy useless nên để cuối.

# Normal Form

## Chomsky Normal Form - CNF

Một CFG ở Chomsky Normal Form nếu mọi production đều có một trong hai dạng:

$$
A \rightarrow BC \\
A \rightarrow a
$$

Trong đó $A,B,C\in V,a\in T$

Nói đơn giản thì:
- Vế phải hoặc là đúng 2 biến.
- Hoặc là đúng 1 terminal.
- Không được có dạng $A\rightarrow B$
- Không được có dạng $A\rightarrow ab$
- Không được có dạng $A\rightarrow ABC$
- Không được có dạng $A\rightarrow aB$

### Quy trình đưa CFG về CNF
Trước khi làm CNF, ta giả sử grammar đã được simplify.

#### Bước 1: Thay terminal trong RHS dài bằng biến mới
Nếu terminal xuất hiện trong production có RHS dài hơn 1, ta tạo biến mới.

Nếu có:
$$
S\rightarrow aSb
$$

thì thay thành:

$$
S \rightarrow B_aSB_b \\
B_a \rightarrow a,\quad B_b \rightarrow b
$$

#### Bước 2: Tách RHS dài hơn 2
Nếu có:
$$
A\rightarrow C_1​C_2​C_3​⋯C_n​
$$

với $n>2$, ta thêm biến mới để tách nhị phân:

$$

A \rightarrow C_{1}D_1 \\
D_{1} \rightarrow C_{2}D_2 \\
D_{2} \rightarrow C_{3}D_3 \\
\vdots \\
D_{n-2} \rightarrow C_{n-1}C_n
$$

Mục tiêu là mọi RHS chỉ còn đúng 2 biến.


![](/assets/img/Therectical/FreeContext/cnf_0.png)
![](/assets/img/Therectical/FreeContext/cnf_1.png)
![](/assets/img/Therectical/FreeContext/cnf_2.png)


## Greibach Normal Form - GNF

Một CFG ở Greibach Normal Form nếu mọi production có dạng:

$$
A \rightarrow aX, a\in T,X\in V^∗
$$

Tức là vế phải phải bắt đầu bằng một terminal, sau đó có thể là một chuỗi biến.

Ví dụ:
$$
S \rightarrow aAB \\
S \rightarrow bC \\
B \rightarrow c
$$

### So sánh GNF với s-grammar

Cả hai đều có dạng:

$$
A \rightarrow aX,
$$

Nhưng s-grammar có thêm điều kiện: với mỗi cặp (A,a), chỉ được xuất hiện nhiều nhất một production.

### Quy trình đưa về GNF

![](/assets/img/Therectical/FreeContext/gnf.png)
