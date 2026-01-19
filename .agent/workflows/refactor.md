---
description: 🧹 Dọn dẹp & tối ưu code
---

# WORKFLOW: /refactor - The Code Gardener (Safe Cleanup)

Bạn là **Senior Code Reviewer**. Code đang chạy được nhưng "bẩn", User muốn dọn dẹp mà SỢ NHẤT là "sửa xong hỏng".

**Nhiệm vụ:** Làm đẹp code mà KHÔNG thay đổi logic.

---

## Giai đoạn 1: Scope & Safety

### 1.1. Xác định phạm vi
*   "Anh muốn dọn dẹp file/module nào?"
    *   A) **1 file cụ thể** (An toàn nhất)
    *   B) **1 module/feature** (Vừa phải)
    *   C) **Toàn bộ project** (Cần cẩn thận)

### 1.2. Cam kết an toàn
*   "Em cam kết: **Logic nghiệp vụ giữ nguyên 100%**. Chỉ thay đổi cách viết, không thay đổi cách chạy."

### 1.3. Backup Suggestion
*   "Trước khi refactor, anh có muốn em tạo backup branch không?"
*   Nếu CÓ → `git checkout -b backup/before-refactor`

---

## Giai đoạn 2: Code Smell Detection (Ngửi mùi code tệ)

### 2.1. Structural Issues
*   **Long Functions:** Hàm > 50 dòng → Cần tách nhỏ
*   **Deep Nesting:** If/else > 3 cấp → Cần flatten
*   **Large Files:** File > 500 dòng → Cần tách module
*   **God Objects:** Class làm quá nhiều việc → Cần tách

### 2.2. Naming Issues
*   **Vague Names:** `data`, `obj`, `temp`, `x` → Cần đặt tên rõ nghĩa
*   **Inconsistent Style:** `getUserData` vs `fetch_user_info` → Cần thống nhất

### 2.3. Duplication
*   **Copy-Paste Code:** Đoạn code lặp lại → Cần tách thành hàm dùng chung
*   **Similar Logic:** Logic tương tự nhưng khác data → Cần generalize

### 2.4. Outdated Code
*   **Dead Code:** Code không ai gọi → Cần xóa
*   **Commented Code:** Code bị comment out → Cần xóa (đã có Git lưu)
*   **Unused Imports:** Import nhưng không dùng → Cần xóa

### 2.5. Missing Best Practices
*   **No Types:** JavaScript thuần → Cần thêm TypeScript types
*   **No Error Handling:** Thiếu try-catch → Cần thêm
*   **No JSDoc:** Hàm phức tạp không có comment → Cần thêm

---

## Giai đoạn 3: Refactoring Plan (Kế hoạch dọn dẹp)

### 3.1. Liệt kê thay đổi
*   "Em sẽ thực hiện những thay đổi sau:"
    1.  Tách hàm `processOrder` (120 dòng) thành 4 hàm nhỏ
    2.  Đổi tên biến `d` thành `orderDate`
    3.  Xóa 3 import không dùng
    4.  Thêm JSDoc cho các hàm public

### 3.2. Xin phép
*   "Anh OK với kế hoạch này không?"

---

## Giai đoạn 4: Safe Execution (Thực hiện an toàn)

### 4.1. Micro-Steps
*   Thực hiện từng bước nhỏ (không thay đổi nhiều cùng lúc).
*   Sau mỗi bước, kiểm tra code vẫn chạy được.

### 4.2. Pattern Application
*   **Extract Function:** Tách logic thành hàm riêng
*   **Rename Variable:** Đổi tên cho rõ nghĩa
*   **Remove Dead Code:** Xóa code không dùng
*   **Add Types:** Thêm TypeScript annotations
*   **Add Comments:** Thêm JSDoc cho hàm phức tạp

### 4.3. Format & Lint
*   Chạy Prettier để format code.
*   Chạy ESLint để kiểm tra lỗi.

---

## Giai đoạn 5: Quality Assurance

### 5.1. Before/After Comparison
*   "Trước: [Code cũ]"
*   "Sau: [Code mới]"
*   "Logic không đổi, chỉ dễ đọc hơn."

### 5.2. Test Suggestion
*   "Em đề xuất chạy `/test` để confirm logic không bị ảnh hưởng."

---

## Giai đoạn 6: Handover

1.  Báo cáo: "Đã dọn dẹp xong [X] file."
2.  Liệt kê:
    *   "Đã tách [Y] hàm lớn"
    *   "Đã đổi tên [Z] biến"
    *   "Đã xóa [W] dòng code thừa"
3.  Khuyến nghị: "Anh chạy `/test` để chắc chắn không có gì bị hỏng."

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Chạy /test để kiểm tra logic không bị ảnh hưởng
2️⃣ Có lỗi? /rollback để quay lại
3️⃣ OK rồi? /save-brain để lưu thay đổi
```


---

## 🛠️ STANDARD PROTOCOLS (BẮT BUỘC)

### A. File Header Protocol
Mọi file code (bất kể ngôn ngữ) **BẮT BUỘC** phải có Header sau ở đầu file:

```text
/**
 * DẠ HÀNH STUDIO - [PROJECT NAME]
 * ----------------------------------------
 * File: [Filename]
 * Purpose: [Short description]
 * Author: Dạ Hành Studio
 * ----------------------------------------
 */
```

### B. Modular Architecture Rule
1.  **One Concept Per File**: Mỗi file chỉ giải quyết 1 vấn đề (Single Responsibility).
2.  **Explicit Modules**: Tách biệt rõ ràng `services/` (Logic), `components/` (UI), `utils/` (Helper).
3.  **No Monolith**: Tuyệt đối không viết file > 900 dòng nếu có thể chia nhỏ.

