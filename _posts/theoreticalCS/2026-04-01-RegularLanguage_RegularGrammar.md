---
## layout: post
title: "Regular Language & Regular Grammar"  
date: 2026-04-01  
permalink: /content/learning-log/tcs-rl_rg/  
categories: [Learning Log, University, TCS]  
tags: []  
subject: "Theoretical Computer Science"  
level: "University"  
course: "Theoretical Computer Science"  
semester: "Year 2"  
excerpt: ""
---

# Regular Expression
Regular Expression (RE) là cách viết ngắn gọn để mô tả ngôn ngữ chính quy. Một ngôn ngữ là regular nếu tồn tại DFA/NFA nhận nó; ngoài automata, ta có thể mô tả bằng regular expression hoặc regular grammar.

Các ký hiệu cơ bản:
- $\empty$: biểu diễn ngôn ngữ rỗng.
- $\lambda$: biểu diễn $\{\lambda\}$.

Nếu $r_1$, $r_2$ là RE thì $r_1 + r_2$, $r_1r_2$, $r_1^*$, $(r_1)$ cũng là RE.

- $+$ là hợp: $L(r_1 + r_2) = L(r_1) \cup L(r_2)$
- $.$ hoặc viết liền là nối: $L(r_1r_2) = L(r_1)L(r_2)$
- $*$ là Kleene star: lặp $0$ hoặc nhiều lần.

Thứ tự ưu tiên toán tử là:
$*$ trước, rồi nối $.$, cuối cùng là $+$.


# RE - NFA - Regular Language

Định lý quan trọng:
> với mọi regular expression $r$, tồn tại một NFA nhận $L(r)$, nên $L(r)$ là regular language.

## Dựng NFA từ regular expression

![](/assets/img/Therectical/RE/nfa_re.png)

### Trick 1: Ưu tiên dùng loop nếu khối đơn giản

Theo Thompson, $r^∗$ thường cần thêm start, final, cạnh bỏ qua, cạnh quay lại.

Nhưng nếu $r$ là một ký tự hoặc một cụm đơn giản, ta có thể dùng loop.

Ví dụ:

$$
a^*
$$

Thay vì:

$$
q_0\xrightarrow{\lambda}​q_1​,q_1 \xrightarrow{a}q_2​, q_2 \xrightarrow{\lambda} ​q_1​,q_0 \xrightarrow{\lambda}q_f​
$$

Ta có thể dùng:

$$
q_0 \xrightarrow{a}q_0
$$

### Với biểu thức dạng "khối lặp", biến khối đó thành chu trình

Ví dụ:
$$
r = (a + bb)^*
$$

![](/assets/img/Therectical/RE/example_0.png)

Rút gọn thành:

![](/assets/img/Therectical/RE/example_0_1.png)

# Regular Grammar

Regular Grammar gồm hai loại:
- Right-linear grammar: $A \rightarrow xB$ hoặc $A \rightarrow x$
- Left-linear grammar: $A \rightarrow Bx$ hoặc $A \rightarrow x$

với $A, B \in V, x \in T^*$. Một regular grammar là văn phạm hoặc right-linear hoặc left-linear.

$S \rightarrow abS | a$ là right-linear.
Ngôn ngữ sinh ra là $(ab)^*a$

> Một grammar có từng production nhìn giống right/left-linear nhưng trộn cả hai hướng thì không phải regular grammar

# Generalized Transition Graph

Dùng để tìm Regular expression cho tôi NFA.

## Ý tưởng của GTG

Với NFA bình thường, cạnh có dạng:
$$
q_i \xrightarrow{a} q_j
$$​

nghĩa là từ $q_i$ đọc ký tự $a$ thì sang $q_j$.

Với GTG, cạnh có thể là:

$$
q_i \xrightarrow{​a+b} q_j​
$$

nghĩa là từ $q_i$ sang $q_j$ bằng cách đọc a hoặc b.

Hoặc:

$$
q_i \xrightarrow{​a∗b} q_j​
$$

nghĩa là từ $q_i$ sang $q_j$ bằng chuỗi gồm nhiều $a$, sau đó một $b$.

Vậy GTG vẫn là "máy nhận chuỗi", nhưng mỗi cạnh có thể đại diện cho một tập chuỗi, không chỉ một ký tự.

## Quy trình tổng quát từ NFA sang RE

### Bước 1: Chuẩn hóa NFA

Ta nên đưa NFA về dạng có:

- Một start state duy nhất.
- Một final state duy nhất.
- Start state khác final state.

Nếu NFA có nhiều final states, thêm final mới $q_f$ , rồi từ mỗi final cũ thêm cạnh:

$$
q_{old final} \xrightarrow{\lambda} q_f
$$	​


Nếu có cạnh đi vào start state, thường thêm start mới $q_s$:
$$
q_s	​\xrightarrow{\lambda} q_0
$$


Mục đích là để cuối cùng dễ đọc regular expression từ start đến final.

### Biến NFA thành GTG hoàn chỉnh

#### Gộp cạnh cơ bản
Với mỗi cặp state $q_i$, $q_j$, ta cần có đúng một nhãn:

$$
R_{ij}
$$

là regular expression mô tả mọi cách đi trực tiếp từ $q_i$ sang $q_j$.

Quy tắc đổi:

- Nếu có cạnh: $q_i \xrightarrow{a} q_j​$ thì $R_{ij}​=a$

- Nếu có nhiều cạnh song song: $q_i \xrightarrow{​a} q_j, q_i \xrightarrow{​b} q_j$​ thì $R_{ij}​=a + b$

#### Khử một state

Giả sử ta muốn loại bỏ state $q_k$.

Xét hai state còn lại bất kỳ $q_i,q_j$, với $i,j\not=k$.

- Đường đi trực tiếp: $q_i​ \xrightarrow{R_{ij}}​ q_j$​

- Đường đi qua $q_k$: $q_i​ \xrightarrow{R_{ik}}​ q_k$​

- Lặp lại ở $q_k$ bao nhiêu lần cũng được: $q_k​ \xrightarrow{R_{kk}}​ q_k$​

- Từ $q_k$ qua $q_j$: $q_k​ \xrightarrow{R_{kj}}​ q_j$​

Công thức rút gọn:

$$
R_{ij}'=R_{ij} + R_{ik} (R_{kk})^* R_{kj}
$$

#### Công thức tổng quát giữa có 2 state:

Các cạnh:
- $q_i​ \xrightarrow{R_{ii}}​ q_i$​
- $q_i​ \xrightarrow{R_{ij}}​ q_j$​
- $q_j \xrightarrow{R_{jj}}​ q_j$​
- $q_j​ \xrightarrow{R_{ji}}​ q_i$

$$
R_{ii}^∗​R_{ij}​(R_{jj}​+R_{ji}​R_{ii}^∗​R_{ij}​)^∗​
$$


# Grammar và NFA


## Grammar to NFA
> Nếu G là right-linear grammar thì L(G) là regular language.

$$
G_R​=(V,T,S,P)
$$

- Mỗi biến $V_i \in V$ trở thành một state.

- Biến bắt đầu $S$ trở thành initial state.

- Nếu có production:

$$
V_i​\rightarrow a_1​a_2​…a_m​V_j​
$$

thì thêm đường đi đọc chuỗi $a_1a_2…a_m$ từ $V_i$ đến $V_j$. Nếu chuỗi terminal dài hơn $1$ thì thêm state trung gian.

- Nếu có production:

$$
V_i​\rightarrow a_1​a_2​…a_m​
$$

thì thêm đường đi từ $V_i$ đến một final state mới $V_f$.

- Nếu có: 

$$
V_i\rightarrow \lambda
$$

thì có thể đánh dấu $V_i$ là final state, hoặc thêm $\lambda$-transition từ $V_i$ đến final state mới.

## NFA to right-linear grammar

$$
M=(Q,\Sigma,\delta,q_0​,F)
$$

Tạo grammar

$$
G=(V,\Sigma,S,P), V=Q,S=q_0​
$$


Nếu NFA có transition: 
$$
\delta(q_i,a_j)=q_k
$$

thì thêm production:

$$
q_i\rightarrow a_j​q_k​
$$

Nếu $q_f\in F$, thêm:
$$
q_f​ \rightarrow \lambda
$$

# Các dạng bài khác

## Tìm ngôn ngữ được biểu diễn bởi regular expression

$$
r_1​=(aa)^∗(bb)^∗b
$$

Solution:

$$
(aa)^∗ \Rightarrow a^{2n} \\
(bb)^∗b \Rightarrow b^{2m+1} \\
L(r_1​)=\{a^{2n}b^{2m+1}:n\geq0,m\geq0\}
$$

## Right-linear grammar sang Left-linear grammar

Right-linear grammar:
$$
S\rightarrow aS∣bA \\
A\rightarrow bB∣a \\
B\rightarrow aS∣b \\
$$

Một left-linear grammar tương đương có thể viết là:

$$
X\rightarrow Ya∣Zb \\
Y\rightarrow Ub \\
Z\rightarrow Yb \\
U\rightarrow Ua∣Za∣\lambda
$$

Ý tưởng:
- Chuyển right-linear grammar sang NFA.
- Đảo hướng suy luận để sinh chuỗi theo left-linear grammar.
- Các transition $P \xrightarrow{a} Q$ được chuyển thành production dạng:

$$
Q\rightarrow Pa
$$

- Biến tương ứng với start state cũ có thêm $\lambda$


