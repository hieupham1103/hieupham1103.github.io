---
## layout: post
title: “Regular Language & Regular Grammar"  
date: 2026-04-01  
permalink: /content/learning-log/tcs-rl_rg/  
categories: \[Learning Log, University, TCS\]  
tags: \[\]  
subject: “Theoretical Computer Science”  
level: “University”  
course: “Theoretical Computer Science”  
semester: “Year 2”  
excerpt: “”
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

# Regular Grammar

Regular Grammar gồm hai loại:
- Right-linear grammar: $A \rightarrow xB$ hoặc $A \rightarrow x$
- Left-linear grammar: $A \rightarrow Bx$ hoặc $A \rightarrow x$

với $A, B \in V, x \in T^*$. Một regular grammar là văn phạm hoặc right-linear hoặc left-linear.

$S \rightarrow abS | a$ là right-linear.
Ngôn ngữ sinh ra là $(ab)^*a$

> Một grammar có từng production nhìn giống right/left-linear nhưng trộn cả hai hướng thì không phải regular grammar

# Generalized Transition Graph

# Grammar - NFA

> Nếu G là right-linear grammar thì L(G) là regular language.