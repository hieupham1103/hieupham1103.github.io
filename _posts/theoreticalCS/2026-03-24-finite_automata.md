---

## layout: post
title: "Finite Automata"  
date: 2026-03-14  
permalink: content/learning-log/tcs-finite_automata/  
categories: [Learning Log, University, TCS]  
tags: []  
subject: "Theoretical Computer Science"
level: "University"  
course: "Theoretical Computer Science"  
semester: "Year 2"  
excerpt: ""
---

Finite Automata là mô hình máy trừu tượng có số trạng thái hữu hạn, dùng để nhận diện chuỗi thuộc hay không thuộc một ngôn ngữ. Trong bài này, "finite accepter" chỉ trả lời accept/reject, không sinh output phức tạp.

# DFA - Deterministic Finite Accepter

Một DFA được định nghĩa bởi bộ 5:
$$
M=(Q,\sum,\delta,q_0​,F)
$$

Trong đó:
- $Q$ Tập hữu hạn các trạng thái
- $\sum$: Bảng chữ cái đầu vào
- $ \delta: Q \times \sum \rightarrow Q$: Hàm chuyển trạng thái 
- $q_0 \in Q$: Trạng thái bắt đầu
- $F \subseteq Q$: Tập trạng thái kết thúc/chấp nhận

DFA là "deterministic" vì tại mỗi cặp $(q,a)$, chỉ có một trạng thái kế tiếp duy nhất. Vì vậy khi chạy một chuỗi, DFA chỉ có đúng một đường đi.

## Cách hoạt động của DFA
DFA bắt đầu ở $q_0$, đọc chuỗi từ trái sang phải. Mỗi bước đọc đúng một ký tự và chuyển trạng thái theo δ. Khi đọc hết chuỗi, nếu trạng thái hiện tại thuộc $F$ thì chuỗi được chấp nhận, ngược lại bị từ chối.

Ví dụ:

$$
\delta(q_0​,a)=q_1​
$$

thì khi đang ở $q_0$ và đọc ký tự a, máy chuyển sang $q_1$.

## Transition Graph

Transition graph dùng để visualize automata: vertices là states, edges là transitions, nhãn cạnh là input symbol, initial state có mũi tên vào, final state vẽ bằng double circle.

![](/assets/img/Therectical/FiniteAutomata/dfa.png)

## Extended Transition Function $\delta^*$

Hàm $\delta$ chỉ xử lý một ký tự, còn $\delta^*$ xử lý một chuỗi:

$$
\delta^*:Q×\Sigma^* \rightarrow Q
$$

## Ngôn ngữ được DFA chấp nhận

Là tập tất cả các chuỗi làm DFA kết thúc ở trạng thái chấp nhận.

Nếu:

$$
\delta^*(q_0,w) \not\in F
$$

thì $w$ bị từ chối.

## Regular Language

Một ngôn ngữ $L$ được gọi là regular nếu tồn tại DFA $M$ sao cho:

$$
L=L(M)
$$

Vì vậy nếu gặp dạng "show that L is regular":

- Xây dựng DFA nhận $L$.
- Giải thích ngắn gọn vì sao DFA đó nhận đúng $L$.
- Kết luận $L$ regular.

# NFA - Nondeterministic Finite Accepter

NFA cũng có dạng:


$$
M=(Q,\Sigma,\delta,q_0​,F)
$$

nhưng hàm chuyển khác DFA:

$$
\delta: Q \times (\Sigma \cup {\lambda}) \rightarrow 2^Q
$$

Nghĩa là từ một trạng thái và một ký tự, máy có thể đi đến một tập trạng thái, không chỉ một trạng thái duy nhất. Ngoài ra NFA cũng cho phép đối số thứ hai là $\lambda$, tức máy có thể chuyển trạng thái mà không tiêu thụ ký tự đầu vào.

![](/assets/img/Therectical/FiniteAutomata/nfa.png)

# Định lý DFA và NFA tương đương về sức mạnh

DFA là một dạng bị hạn chế của NFA, nên mọi ngôn ngữ DFA nhận thì NFA cũng nhận được. Ngược lại, với mọi NFA, luôn tồn tại một DFA nhận cùng ngôn ngữ; do đó DFA và NFA có cùng sức mạnh nhận ngôn ngữ

# NFA2DFA

- Bắt đầu DFA với trạng thái khởi đầu là tập hợp chứa các trạng thái NFA có thể đạt được bằng các bước nhảy $\lambda$ từ $q_{0}$: $\delta_{N}^{*}(q_{0},\lambda)$.
- Với mỗi trạng thái DFA mới $\{q_{i},q_{j},...,q_{k}\}$ và ký tự $a$, tính toán tập hợp các trạng thái tiếp theo bằng cách hợp (union) kết quả của từng trạng thái NFA con.
- Tạo trạng thái mới trong DFA cho tập hợp vừa tìm được (nếu chưa có) và thêm cạnh (transition).
- Lặp lại cho đến khi không còn trạng thái mới nào được sinh ra.
- Trạng thái kết thúc của DFA: Bất kỳ trạng thái (tập hợp) nào của DFA có chứa ít nhất một trạng thái kết thúc $q_{f}$ của NFA ban đầu ($q_{f}\in F_{N}$).

# Reduction of the Number of States in Finite Automata

**Bước 1: Dọn dẹp - Kiểm tra trạng thái không thể chạm tới**

• Nhìn nhanh từ trạng thái bắt đầu $q_0$, lần theo các mũi tên (hoặc bảng chuyển) xem có trạng thái nào bị cô lập, không có đường đi tới không.

**Bước 2: Kẻ bảng bán phần & Đánh dấu**

**Đợt 1 (Đánh dấu trạng thái khác biệt rõ ràng):** Ký hiệu các trạng thái kết thúc (thuộc tập $F$).

- Điền dấu **X** vào tất cả các ô giao giữa một trạng thái $\in F$ và một trạng thái $\notin F$.

**Đợt 2 (Đánh dấu lan truyền):**  Xét các ô **còn trống**. Với mỗi ô trống $(p, q)$, bạn nhìn nhanh xem với từng ký tự đầu vào (ví dụ $a$ và $b$), chúng dẫn đến cặp trạng thái nào.


**Bước 3: Đọc kết quả & Gom nhóm**

- Sau khi bảng đã chốt, bạn chỉ cần tìm những ô **còn trống** (không bị đánh dấu **X**). Đó chính là các cặp trạng thái "anh em" (không thể phân biệt).

- Gom các cặp này lại thành các tập hợp lớn hơn (nếu $q_0$ chung nhóm $q_1$, $q_1$ chung nhóm $q_2$ thì gom thành $\{q_0, q_1, q_2\}$). Các trạng thái không chung nhóm với ai thì đứng một mình. Đây sẽ là các trạng thái của DFA mới.

**Bước 4:**

- Vẽ bảng chuyển trạng thái (hoặc sơ đồ) cho các nhóm vừa gom.
- **Quy tắc gắn nhãn:**
    - Nhóm nào chứa trạng thái bắt đầu cũ (như $q_0$) $\rightarrow$ Trở thành trạng thái bắt đầu mới.
    - Nhóm nào chứa trạng thái kết thúc cũ (như $q_3, q_4$) $\rightarrow$ Trở thành trạng thái kết thúc mới.
    - Đường đi của nhóm mới chính là đường đi của một trạng thái đại diện bất kỳ trong nhóm đó (vì chúng đi giống hệt nhau).