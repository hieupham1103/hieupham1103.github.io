---
layout: post
title: "Basic Counting"
date: 2026-03-15
permalink: /content/learning-log/basic_counting/
categories: [Learning Log, University, Discrete Mathematics]
tags: []
subject: "Discrete Mathematics"
level: "University"
course: Discrete Mathematics"
semester: "Year 2"
excerpt: ""
---

Đây là bài viết đầu tiên của mình, nhằm chia sẻ góc nhìn của một học sinh đã học qua về lập trình thi đấu ở cấp 3 khi học qua môn Discrete Mathematics

## Lời nói đầu
Trước khi học môn này thì cảm nhận đầu tiên của mình chắc là 1 môn khá hay, có liên quan mật thiết đến các kiến thức mà mình đã học khi còn học chuyên tin và lập trình thi đấu hồi cấp 3. Ban đầu mình nghĩ là sẽ học luôn vào tập hợp, đồ thị, ... nhưng bị úp bô bởi vì tập hợp thì học ở Linear Algebra trước đó (không hiểu sao lại cho tập hợp vào Linear-.-), và đồ thị thì ở nửa sau của bài nên cũng hơi hụt hẫn. MÌnh có nhìn sơ qua giáo trình thì có thấy có **Recurrence formula**, khá giống với đệ quy và quy hoạch động hồi đó. 

# Các Quy tắc Đếm Cơ bản
- **The sum rule:** Nếu một công việc có thể được thực hiện bằng một trong $n_1$ cách hoặc $n_2$ cách (và các tập hợp cách này không trùng nhau), thì tổng cộng có $n_1 + n_2$ cách để thực hiện công việc đó. Đối với các tập hợp rời rạc, kích thước của tập hợp hợp (union) bằng tổng kích thước của từng tập hợp thành phần.
- **The product rule:** Nếu một thủ tục được chia thành 2 nhiệm vụ liên tiếp, nhiệm vụ đầu có $m$ cách làm và với mỗi cách đó có $n$ cách làm nhiệm vụ thứ hai, thì tổng cộng có $m \cdot n$ cách.
- **The division rule:** Nếu ta phân hoạch một tập hợp (Partition of a set) có kích thước $n$ thành $m$ khối có cùng kích thước $r$, thì số khối là $m = \frac{n}{r}$. Quy tắc này thường dùng để đếm số hoán vị vòng quanh. 
- **The bijection rule:** Hai tập hợp có cùng lực lượng (kích thước) khi và chỉ khi tồn tại một tương ứng 1-1 (song ánh) giữa chúng.  

# Permutations and Combinations
- **Hoán vị ($k$-permutations):** Là cách sắp xếp có thứ tự $k$ vật từ một tập hợp $n$ vật. Công thức tính số hoán vị là $P(n, k) = \frac{n!}{(n-k)!}$. 
- **Tổ hợp ($k$-combinations):** Là cách chọn không quan tâm thứ tự $k$ phần tử từ tập $n$ phần tử. Ký hiệu là $\binom{n}{k}$ hoặc $C_n^k$, công thức là $\frac{n!}{k!(n-k)!}$.  
- **Hoán vị có lặp (Permutations with repetition):** Áp dụng cho đa tập (multiset), trong đó các phần tử có thể giống nhau. Số hoán vị cho $n$ vật với các nhóm giống nhau có số lượng lần lượt là $n_1, n_2, ..., n_k$ được tính bằng $\frac{n!}{n_1! \cdot n_2! [cite_start]\cdot ... \cdot n_k!}$. 
- **Tổ hợp lặp (Combinations with repetition):** Số cách chọn $k$ phần tử từ $n$ phần tử có cho phép lặp lại (ví dụ: chia $k$ quả táo giống hệt nhau cho $n$ đứa trẻ) là $\binom{n+k-1}{k}$.

# Định lý Nhị thức và Tam giác Pascal
- **Định lý Pascal:** Công thức đệ quy $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ dùng để xây dựng Tam giác Pascal.  
- **Định lý Nhị thức (Binomial Theorem):** Giúp khai triển biểu thức $(x+y)^n$ thành tổng các đơn thức $x^i y^{n-i}$ với hệ số tương ứng là $\binom{n}{i}$. 

# Bài toán chia kẹo Euler/Stars and Bars
Hãy tưởng tượng bạn có $n$ viên kẹo hoàn toàn giống hệt nhau (tượng trưng bằng $n$ ngôi sao $\star$) và bạn muốn chia cho $k$ đứa trẻ (phân biệt). Để chia số kẹo này thành $k$ phần, bạn sẽ cần dùng đến $k-1$ cái vách ngăn ($|$).
- Ví dụ: Có 5 viên kẹo ($n=5$) chia cho 3 đứa trẻ ($k=3$). Ta cần 2 vách ngăn.
- Một cách chia có thể là: $\star \star |\star | \star \star$ (Đứa thứ nhất được 2 viên, đứa thứ hai 1 viên, đứa thứ ba 2 viên).
- Tổng số vị trí để đặt cả kẹo và vách ngăn là: $n + k - 1$.
- Việc của bạn chỉ đơn giản là chọn ra $k-1$ vị trí để đặt vách ngăn trong tổng số $n+k-1$ vị trí đó.

Từ đó, ta có công thức gốc: $\binom{n+k-1}{k-1}$ hay $C_{n+k-1}^{k-1}$.

## Các dạng bài hay gặp với chia kẹo Euler
### Dạng 1: Cơ bản nhất (Nghiệm nguyên không âm)
Đây là trường hợp bạn chia kẹo mà không có bất kỳ ràng buộc khó khăn nào, một đứa trẻ có thể không nhận được viên kẹo nào (tương ứng với biến bằng 0).
- **Mô hình toán học:** Tìm số nghiệm nguyên của phương trình:

$$x_1 + x_2 + \dots + x_k = n$$

- **Điều kiện:** $x_i \ge 0$ với mọi $i$.
- **Công thức:**
$$C_{n+k-1}^{k-1}$$

### Dạng 2: Có giới hạn dưới (Nghiệm nguyên dương hoặc lớn hơn một số $c$)
Trường hợp này có một ràng buộc gắt gao hơn: ví dụ mỗi đứa trẻ phải có ít nhất 1 viên kẹo, hoặc ít nhất $c$ viên kẹo.

- **Mô hình toán học:** Phương trình $x_1 + x_2 + \dots + x_k = n$ nhưng điều kiện là $x_i \ge c$.
- **Cách làm (Đổi biến):** Bạn hãy "phát trước" cho mỗi đứa trẻ $c$ viên kẹo để đảm bảo điều kiện. Đặt biến mới $x'_i + c = x_i$ (lúc này $x'_i \ge 0$).
- **Kết quả:** Phương trình ban đầu sẽ chuyển về dạng cơ bản với tổng số kẹo $n$ đã bị trừ đi một lượng tương ứng với số kẹo đã "phát trước". Sau đó áp dụng công thức của Dạng 1.

$$(x'_1 + c) + x_2 + \dots + x_k = n$$
$$x'_1 + c + x_2 + \dots + x_k = n - c$$

### Bất phương trình ($\le$)
Bài toán lúc này không yêu cầu phải chia hết kẹo. Bạn có tối đa $n$ viên kẹo và có thể giữ lại một ít.
- **Mô hình toán học:** Tìm số nghiệm của bất phương trình:
$$x_1 + x_2 + \dots + x_k \le n \quad (x_i \ge 0)$$
- **Cách làm (Thêm biến bù):** Hãy tưởng tượng có thêm một đứa trẻ thứ $k+1$ (đứa trẻ "ảo"). Đứa trẻ này sẽ nhận toàn bộ số kẹo còn dư lại. Phương trình trở thành dấu "=" hoàn hảo:
$$x_1 + x_2 + \dots + x_k + x_{k+1} = n$$
- **Công thức nhanh:** Lúc này số biến tăng lên 1 (thành $k+1$), ráp vào công thức gốc ta được:
$$C_{n+(k+1)-1}^{(k+1)-1} = C_{n+k}^{k}$$

### Dạng 4: Có giới hạn trên (Chặn trên)
Đây là dạng phức tạp nhất. Ví dụ: "Chia 10 viên kẹo cho 3 đứa trẻ, nhưng đứa thứ nhất không được nhận quá 4 viên" ($x_1 \le 4$).
- **Cách làm (Dùng phần bù):** Bạn sẽ tính tổng số cách chia bừa, sau đó trừ đi những cách chia vi phạm luật.
    - Bước 1: Tính tổng số nghiệm ban đầu phớt lờ điều kiện chặn trên (giải như Dạng 1).
    - Bước 2: Tính số nghiệm vi phạm. Vi phạm $x_1 \le m$ nghĩa là $x_1 \ge m+1$. Lúc này bài toán trở về Dạng 2 (có giới hạn dưới là $m+1$). Bạn lại "phát trước" $m+1$ viên kẹo cho đứa vi phạm rồi tính số cách chia số kẹo còn lại.
    - Bước 3: Lấy kết quả [Bước 1] trừ đi kết quả [Bước 2].

# Phân hoạch Tập hợp (Partitions of a Set)
- **Khái niệm:** Phân hoạch một tập hợp $A$ thành $k$ phần là việc chia nó thành $k$ tập con không rỗng và rời rạc nhau. Nói cho dễ hiểu là số cách xếp n đồ vật phân biệt vào k chiếc hộp giống nhau sao cho không có hộp nào rỗng.
- **Số Stirling loại 2 ($S(n,k)$):** Biểu diễn số cách phân hoạch một tập hợp $n$ phần tử thành $k$ phần. Công thức đệ quy là $S(n, k) = S(n-1, k-1) + kS(n-1, k)$.  
- **Số Bell ($B_n$):** Là tổng số tất cả các cách phân hoạch có thể có của một tập $n$ phần tử.

## Twelvefold Way
Xếp $k$ vật vào $n$ hộp với 3 tiêu chí:
- Vật phân biệt (labeled) hay vật giống nhau (unlabeled).  
- Hộp phân biệt (labeled) hay hộp giống nhau (unlabeled).  
- Cách xếp: Tùy ý (unrestricted), mỗi hộp chứa tối đa 1 vật ($\le 1$, tức đơn ánh), hoặc mỗi hộp chứa ít nhất 1 vật ($\ge 1$, tức toàn ánh).


| Objects | Boxes | unrestricted | $\le1$ | $\ge1$|
| -------- | -------- | -------- | -------- | -------- |
| labeled  | labeled  | $n^k$ | $P(n,k)$ | $n!S(k,n)$ |
| unlabeled  | labeled  | $\binom{n + k - 1}{k}$ | $\binom{n}{k}$ | $\binom{k - 1}{n - 1}$ |
| labeled  | unlabeled  | $\sum^n_{m=1}S(k,m)$ | $I_{k\le n}$ | $S(k,n)$ |
| unlabeled  | unlabeled  | ? | $I_{k\le n}$ | ? |
