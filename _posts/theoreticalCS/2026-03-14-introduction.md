---

## layout: post
title: “Introduction to Theoretical Computer Science”  
date: 2026-03-14  
permalink: /content/learning-log/tcs-introduction/  
categories: \[Learning Log, University, TCS\]  
tags: \[\]  
subject: “Theoretical Computer Science”  
level: “University”  
course: “Theoretical Computer Science”  
semester: “Year 2”  
excerpt: “”

# Language

## Alphabet

Alphabet, ký hiệu thường là $\sum$, là một tập hữu hạn, không rỗng các ký hiệu.

| Loại alphabet | Ví dụ |
| --- | --- |
| Binary | $\sum=\{0, 1\}$ |
| Chữ thường | $\sum= \{a, b, c, ..., z\}$ |
| Alphanumeric | $\sum=\{a-z, A-Z, 0-9\}$ |
| DNA | $\sum=\{A, C, G, T\}$ |

## String / Word
Một string là một dãy hữu hạn các ký hiệu lấy từ alphabet $\sum$.

Ví dụ nếu $\sum = {a, b}$ thì:
```
λ, a, b, aa, ab, ba, bb, aba, aaaa, abababbaab
```
đều là các chuỗi trên $\sum$.

Chuỗi rỗng ký hiệu là $\lambda$. Chuỗi rỗng có độ dài bằng 0.

## Độ dài chuỗi
Độ dài của chuỗi $w$ ký hiệu là $|w|$, bằng số lượng ký hiệu trong chuỗi.

## Các phép toán trên chuỗi
### Concatenation
Là phép nối 2 string lại với nhau
$$
w = a_1a_2...a_m \\
v = b_1b_2...b_n \\

wv = a_1a_2...a_mb_1b_2...b_n
$$

### Reverse
Chuỗi đảo của $w$ ký hiệu là $w^R$.
$$
w = a_1a_2...a_n\\
w^R = a_n...a_2a_1
$$

### Lũy thừa chuỗi

Nếu $w$ là một chuỗi thì $w^n$ là chuỗi thu được bằng cách lặp $w$ đúng $n$ lần.
$$
w = ab \\
w^2 = abab \\
w^3 = ababab \\
w^0 = \lambda
$$


## Các tập chuỗi đặc biệt

| Ký hiệu | Ý nghĩa |
| --- | --- |
| $\sum^k$ | Tập tất cả chuỗi có độ dài đúng bằng $k$ |
| $\sum^*$ | Tập tất cả chuỗi tạo từ $\sum$, bao gồm cả $\lambda$ |
| $\sum^+$ | Tập tất cả chuỗi tạo từ $\sum$, không bao gồm cả $\lambda$ |

## Language

Một language $L$ là một tập con của $\sum^*$.

Một chuỗi thuộc ngôn ngữ $L$ được gọi là một sentence của $L$.

$$
\sum = {a, b} \\
L = \{a, aa, aab\} \\
L = \{a^n b^n : n \geq 0\}
$$

# Grammar

Grammar là tập quy tắc dùng để mô tả và sinh ra các chuỗi hợp lệ trong một ngôn ngữ. Một grammar được định nghĩa bởi bộ 4: 

$$
G = (V, T, S, P)
$$

Trong đó thì:
- $V$: Tập biến, còn gọi là nonterminal symbols
- $T$: Tập terminal symbols
- $S$: Biến bắt đầu, $S \in V$
- $P$: Tập luật sinh, productions

## Production

Một production hay luật sinh có dạng:

$$
x \rightarrow y
$$

Với điều kiện là:
$$
x \in (V \cup T)^+ \\
y \in (V \cup T)^*
$$

Nghĩa là vế trái không được rỗng, còn vế phải có thể rỗng.

Ví dụ như là:

$$
S \rightarrow aSb \\
S \rightarrow \lambda
$$

## Derivation

Nếu có chuỗi:

$$
w = uXv
$$

Và production
$$ 
X \rightarrow y
$$

thì ta có thể thay $x$ bằng $y$:
$$ 
uXv \Rightarrow uyv
$$


| Ký hiệu | Ý nghĩa |
| --- | --- |
| $\Rightarrow$ | Dẫn xuất trong 1 bước |
| $\Rightarrow^*$ | Dẫn xuất trong 0 hoặc nhiều bước |
| $\Rightarrow^+$ | Dẫn xuất trong ít nhất 1 bước |

## language sinh bởi grammar

Ngôn ngữ sinh bởi grammar $G$ là:

$$
L(G) = \{w \in T^* : S \Rightarrow^* w\}
$$

Nghĩa là tập tất cả chuỗi terminal có thể được sinh ra từ biến bắt đầu $S$.

# Automata
Automata là mô hình trừu tượng của máy tính số. Nó hoạt động tự động dựa trên input, trạng thái hiện tại và tập luật chuyển trạng thái.

Bốn thành phần của Automaton:
- Input file: Chuỗi đầu vào, chia thành các ô, mỗi ô chứa một ký hiệu
- Control unit: Bộ điều khiển, chứa trạng thái hiện tại
- Storage: Bộ nhớ tạm, có thể đọc và thay đổi
- Output: Đầu ra của máy

## Deterministic và Nondeterministic Automaton

Deterministic automaton là một automaton mà mỗi configuration chỉ có đúng một move tiếp theo. Biết hiện tại thì dự đoán được tương lai.

Nondeterministic automaton thì ngược lại, một configuration có thể có nhiều move tiếp theo. Ta chỉ biết tập các khả năng có thể xảy ra.

## Accepter và Transducer
Accepter chỉ trả lời Yes / No, tức accept hoặc reject.

Transducer sinh ra chuỗi output.
