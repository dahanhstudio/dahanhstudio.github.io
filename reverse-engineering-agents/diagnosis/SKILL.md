---
name: rev-diagnosis
description: Giai đoạn 0 - Khởi tạo, Nhận diện và Chẩn đoán mục tiêu Reverse Engineering.
---

# Kỹ năng: Chẩn đoán Reverse Engineering (Phase 0)

Kỹ năng này thực hiện bước đầu tiên trong quy trình Reverse Engineering: Hiểu đối thủ trước khi hành động.

## Khả năng
- Nhận diện công nghệ đóng gói (Electron, Python, .NET, C++).
- Giải nén và Decompile mã nguồn gốc.
- Dọn dẹp sơ bộ (Format code, đổi tên biến vô nghĩa).
- Phân tích Stack công nghệ (Framework, Build Tool).

## Hướng dẫn cho AI (IDE)
1.  **Thu thập (Identification & Collection)**:
    -   Nếu là Web/Extension: Đổi tên thư mục gốc thành `Original_Sources` hoặc tạo thư mục `Original_Sources` và di chuyển toàn bộ file hiện tại vào đó.
    -   Nếu là File chạy (.exe):
        -   Dùng tool (`Detect It Easy`) xác định loại.
        -   **Electron**: Tìm `resources/app.asar` -> chạy `npx asar extract`.
        -   **Python**: Dùng `pyinstxtractor` -> `uncompyle6`.
        -   **.NET**: Dùng `dnSpy` hoặc `ILSpy`.
2.  **Dọn dẹp (Initial Cleanup)**:
    -   Chạy `Prettier` (JS) hoặc `Black` (Python) để format code.
    -   Đổi tên các biến vô nghĩa (`_0x12ab`) thành có nghĩa theo ngữ cảnh.
3.  **Phân tích (Stack Analysis)**:
    -   Xác định React/Vue/jQuery, Webpack/Vite.
    -   Tạo file `docs/ANALYSIS_REPORT.md`.
4.  **Lập kế hoạch**:
    -   Tạo `docs/TODO.md` (Checklist chi tiết).
    -   Tạo `CHANGELOG.md`.

## Nguyên tắc
- Không tự ý giả định logic (No Guesswork).
- Phải tạo đủ file report trước khi sang bước tiếp theo.
