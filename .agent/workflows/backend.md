---
description: "Quy trình phát triển Backend: API, Cấu trúc dự án, Security & Coding Standards."
---

# 🏗️ BACKEND ENGINEERING WORKFLOW

> **Phạm vi**: API Design, System Architecture, Code Structure, Security.
> **Nguồn**: `backend_api` skill & `start.md` protocol.

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1.  **Dạ Hành Studio Standard**: Tuân thủ tuyệt đối quy tắc Header và Cấu trúc file.
2.  **One Function Per File**: Mỗi file chỉ chứa 1 Service/Class chính. Không gộp logic (Monolith logic).
3.  **No Hallucination**: Code phải chạy được, không dùng hàm/thư viện tưởng tượng.

---

## 2. CẤU TRÚC DỰ ÁN (PROJECT STRUCTURE)

### A. Python / Node.js Backend Structure

```text
src/
├── services/           # Business Logic (PURE LOGIC only)
│   ├── auth_service.py # Mỗi file = 1 Class
│   └── user_service.py
├── controllers/        # HTTP Handlers (Nhận Request -> Gọi Service -> Trả Response)
|   └── auth_controller.py
├── scripts/            # Script chạy 1 lần, Job, Bat files
│   └── migrate_db.py
├── utils/              # Hàm tiện ích chung (Date, String, Encryption)
├── models/             # Database Models (ORM)
└── app.py              # Entry Point
```

### B. Quy Tắc "Clean Separation"
1.  **Controller**: Chỉ validate input và gọi Service. KHÔNG truy cập DB.
2.  **Service**: Chỉ chứa Business Logic. KHÔNG đụng vào HTTP Request/Response check.
3.  **Model**: Chỉ định nghĩa Schema.

---

## 4. PYTHON CODING STANDARDS (PEP 8+)

### A. Style Guide
1.  **Naming**: `snake_case` cho biến/hàm (`get_user_by_id`), `PascalCase` cho Class (`UserService`).
2.  **Type Hints**: BẮT BUỘC dùng Type Hints cho mọi hàm:
    ```python
    def calculate_total(price: float, quantity: int) -> float:
        return price * quantity
    ```
3.  **Docstrings**: Mô tả hàm rõ ràng (Args, Returns, Raises).

### B. Error Handling (Try-Except)
*   Luôn catch exception cụ thể, không catch `Exception` chung chung nếu không cần thiết.
*   Log lỗi đầy đủ kèm Stack Trace (dùng thư viện `logging`, không dùng `print`).

---

## 5. CHANGELOG PROTOCOL

*   Mọi thay đổi phải được ghi lại trong `CHANGELOG.md` của dự án.
*   Format: `[DATE] [TYPE] [FILE] - Description`.

---

## BÀI KIỂM TRA (CHECKLIST)

- [ ] File đã có Header của Dạ Hành Studio chưa?
- [ ] Code có Type Hints đầy đủ không?
- [ ] Logic có bị gộp chung vào 1 file không (Phải tách Service)?
- [ ] Đã update CHANGELOG.md chưa?


---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ API xong? /test để kiểm tra
2️⃣ Có lỗi? /debug
3️⃣ Cần dọn code? /refactor
```

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

