---
layout: post
title: "Pushdown Automata"
date: 2026-03-14
permalink: /content/learning-log/tcs-introduction/
categories: [Learning Log, University, TCS]
tags: []
subject: "Theoretical Computer Science"
level: "University"
course: "Theoretical Computer Science"
semester: "Year 2"
excerpt: ""
---

# Tại sao lại cần Pushdown Automata?
Các Finite Automata chỉ có bộ nhớ giới hạn, do đó chúng không thể nhận dạng được tất cả các context-free languages.

Ví dụ: Với một ngôn ngữ như $L=\{a^{n}b^{n}:n\ge0\}$, máy không chỉ cần kiểm tra xem tất cả chữ `a` có đứng trước chữ `b` không, mà còn phải đếm và ghi nhớ số lượng chữ `a` (một biến số $n$ không có giới hạn)

Để giải quyết việc cần một bộ nhớ có khả năng đếm không giới hạn, Pushdown Automata được trang bị thêm một cơ chế lưu trữ đặc biệt: Ngăn xếp (Stack).  

# Nondeterministic Pushdown Automata (NPA/NDPA)
## Cấu trúc cơ bản của NPA

Theo mô hình, một NPDA hoạt động dựa trên sự tương tác của 3 thành phần chính: 

- **Input file:** Chứa chuỗi ký tự cần được hệ thống đọc và xử lý.  
- **Control unit:** Thành phần đọc từng ký tự đầu vào và thực hiện thay đổi nội dung của ngăn xếp thông qua các thao tác stack thông thường
- Cấu trúc dữ liệu cho phép lưu trữ thông tin không giới hạn nhưng bị ràng buộc bởi nguyên tắc *LIFO*.

Mỗi bước đi của máy được quyết định bởi 3 yếu tố tại thời điểm hiện tại: ký tự đang đọc ở đầu vào, trạng thái của bộ điều khiển, và ký tự đang nằm ở trên cùng (đỉnh) của Stack.  

## Một vài định nghĩa toán học
Một cách chính thức, NPDA được định nghĩa bởi một bộ gồm 7 thành phần $M=(Q,\Sigma,\Gamma,\delta,q_{0},z,F)$, trong đó:

- $Q$: Tập hợp hữu hạn các trạng thái của **Control unit**.  
- $\Sigma$: Bảng chữ cái đầu vào.  
- $\Gamma$: Bảng chữ cái của **Stack**.  
- $\delta$: Transition function.  
- $q_{0}$: Trạng thái khởi đầu ($q_{0} \in Q$).
- $z$: Ký tự khởi đầu luôn nằm sẵn trong ngăn xếp ($z \in \Gamma$)
- $F$: Tập hợp các trạng thái kết thúc (Final states) ($F \subseteq Q$).  

### Hàm chuyển $\delta$
$$\delta(q, a, X) = \{(p, \gamma)\}$$

- $X$: Ký tự đang ở đỉnh ngăn xếp (sẽ luôn bị `POP` ở lúc đầu).
- $\gamma$ (gamma): Chuỗi ký tự sẽ được nhét ngược lại vào vị trí đỉnh ngăn xếp.

Dựa vào độ dài của $\gamma$, ta phân biệt được các phép toán như sau:

- Phép `POP`:
    - Phép Pop xảy ra khi chuỗi thay thế $\gamma$ là chuỗi rỗng ($\lambda$).
    - **Cơ chế:** Máy lấy $X$ ra khỏi đỉnh ngăn xếp, sau đó "nhét" $\lambda$ (tức là không nhét gì cả) vào. Kết quả thực tế là ký tự ở đỉnh bị xóa đi.
    - **Ví dụ**: $\delta(q_1, a, a) = \{(q_1, \lambda)\}$.
        - Đang ở $q_1$, đọc chữ `a`, thấy đỉnh ngăn xếp là chữ `a`. Lấy `a` ra khỏi ngăn xếp và thay bằng rỗng ($\lambda$). Ngăn xếp ngắn đi một ký tự
- Phép `PUSH`:
    - Phép Push xảy ra khi chuỗi thay thế $\gamma$ có từ 2 ký tự trở lên.
    - **Cơ chế:** Máy lấy $X$ ra, sau đó nhét lại $X$ và nhét thêm các ký tự mới lên trên cùng.
    - **Ví dụ:** 
        - $\delta(q_0, a, z) = \{(q_0, az)\}$.
            - Đang ở $q_0$, đọc chữ `a`, thấy đỉnh ngăn xếp là chữ `z`. Lấy `z` ra, sau đó nhét chuỗi `az` vào. Theo nguyên tắc, `z` rơi xuống dưới, `a` nằm ở trên cùng. Kết quả thực tế là ta vừa giữ lại `z`, vừa push thêm `a` vào đỉnh. 
        -  $\delta(q_0, a, a) = \{(q_0, aa)\}$.
            - Lấy `a` ra, nhét lại 2 chữ `aa` $\rightarrow$ tức là push thêm một chữ `a` nữa lên trên. 

## Tính Nondeterministic
Điểm khác biệt của NPDA so với các Deterministic finite Automata nằm ở hàm chuyển trạng thái $\delta$:

- **Nhiều lựa chọn:** Hàm chuyển trạng thái $\delta$ trỏ tới một tập hợp các tập con hữu hạn. Điều này có nghĩa là trong cùng một tình huống, máy có thể có nhiều lựa chọn khác nhau cho bước đi tiếp theo của mình.  
- **$\lambda$-transition:** Máy có khả năng tự động thay đổi trạng thái và thao tác với ngăn xếp mà không cần phải đọc bất kỳ ký tự đầu vào nào (thể hiện qua tham số $\lambda$).  
- **Dead configuration:** Hàm chuyển trạng thái không bắt buộc phải được khai báo cho mọi tổ hợp đầu vào và ngăn xếp. Những chuyển đổi không được chỉ định sẽ dẫn tới các tập rỗng, đại diện cho một "cấu hình chết" của máy.  

## Điều kiện chấp nhận một chuỗi
Một chuỗi đầu vào được NPDA chấp nhận khi và chỉ khi sau khi đọc hết chuỗi, hệ thống đưa máy vào được một trong các trạng thái kết thúc. Trạng thái cuối cùng của ngăn xếp (còn bao nhiêu ký tự, là ký tự gì) hoàn toàn không ảnh hưởng đến việc chuỗi đó có được chấp nhận hay không.  

Ngôn ngữ được chấp nhận bởi máy $M$ được biểu diễn bằng công thức:

$$L(M)=\{w\in\Sigma^{*}:(q_{0},w,z)\vdash_{M}^{*}(q_{f},\lambda,u),q_{f}\in F,u\in\Gamma^{*}\}$$

## Ví dụ về các hoạt động của NDPA
> Kiểm tra xem một sring có phải là Palindrome có độ dài chẵn.
Ngôn ngữ này được biểu diễn bằng công thức:$$L = \{ww^R : w \in \{a,b\}^*\}$$

### Solution

Cỗ máy $M$ của chúng ta sẽ có các thành phần sau:
- Tập trạng thái ($Q$):
    - $q_0$: Trạng thái đang đọc nửa đầu của chuỗi (đẩy vào ngăn xếp).
    - $q_1$: Trạng thái đang đọc nửa sau của chuỗi (lấy ra khỏi ngăn xếp để so sánh).
    - $q_f$: Trạng thái kết thúc (chấp nhận chuỗi).
- Bảng chữ cái đầu vào ($\Sigma$): $\{a, b\}$
- Bảng chữ cái ngăn xếp ($\Gamma$): $\{a, b, z\}$ (với $z$ là ký tự đánh dấu đáy ngăn xếp).



#### Hàm chuyển $\delta$
**Giai đoạn 1:** Đọc và Lưu trữ (Trạng thái $q_0$)

- Khi đọc bất kỳ ký tự nào ở nửa đầu, máy chỉ việc push nó vào đỉnh ngăn xếp.
- $\delta(q_0, a, z) = \{(q_0, az)\}$ (Đọc `a` lúc stack rỗng, đẩy `a` vào)
- $\delta(q_0, b, z) = \{(q_0, bz)\}$ (Đọc `b` lúc stack rỗng, đẩy `b` vào)
- $\delta(q_0, a, a) = \{(q_0, aa)\}$ (Đọc `a` lúc đỉnh stack là `a`, đẩy tiếp `a`)
- $\delta(q_0, b, b) = \{(q_0, bb)\}$ (Đọc `b` lúc đỉnh stack là `b`, đẩy tiếp `b`)
- $\delta(q_0, b, a) = \{(q_0, ba)\}$ (Đọc `b` lúc đỉnh stack là `a`, đẩy tiếp `b`)
- $\delta(q_0, a, b) = \{(q_0, ab)\}$ (Đọc `a` lúc đỉnh stack là `b`, đẩy tiếp `a`)

**Giai đoạn 2:** Bước nhảy Nondeterministic

Vì cỗ máy không biết trước chuỗi dài bao nhiêu, nó không thể biết đâu là điểm giữa. Nhờ tính "không đơn định", máy được phép đoán nó đã đến giữa chuỗi và tự động thực hiện một bước nhảy ($\lambda$-transition) sang trạng thái $q_1$ mà không cần đọc thêm ký tự nào từ đầu vào.

- $\delta(q_0, \lambda, a) = \{(q_1, a)\}$
- $\delta(q_0, \lambda, b) = \{(q_1, b)\}$

**Giai đoạn 3:** So khớp nửa sau

Ở trạng thái $q_1$, máy sẽ đọc phần còn lại của chuỗi. Mỗi khi đọc một ký tự, nó sẽ lấy (pop) ký tự trên cùng của ngăn xếp ra. Nếu 2 ký tự này giống nhau, máy tiếp tục.

- $\delta(q_1, a, a) = \{(q_1, \lambda)\}$ (Đọc `a`, đỉnh stack là `a` $\rightarrow$ Xóa `a` khỏi stack)
- $\delta(q_1, b, b) = \{(q_1, \lambda)\}$ (Đọc `b`, đỉnh stack là `b` $\rightarrow$ Xóa `b` khỏi stack)

**Giai đoạn 4:** Kết thúc

Nếu máy đã đọc hết chuỗi và ngăn xếp chỉ còn lại ký tự đáy $z$, máy chuyển sang trạng thái kết thúc $q_f$

- $\delta(q_1, \lambda, z) = \{(q_f, z)\}$
