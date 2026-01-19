---
name: rev-verification
description: Giai đoạn 4 - Tự động xác minh và bàn giao (Auto-Verification).
---

# Kỹ năng: Xác minh và Bàn giao (Phase 4)

Kỹ năng này đảm bảo sản phẩm chạy đúng trước khi báo cáo cho người dùng.

## Khả năng
- Thực thi giao thức xác minh.
- Chạy thử và giám sát lỗi (Launch & Monitor).
- Kiểm tra sự sống (Liveness Probe).
- Cổng xác minh Gemini (Verification Gate).

## Hướng dẫn cho AI (IDE)
1.  **Đọc giao thức**: Đọc file `verify.md`.
2.  **Launch & Monitor**:
    -   Tạo và chạy `scripts/run.bat`.
    -   Theo dõi Terminal xem có lỗi (Traceback, Crash) không.
3.  **Liveness Probe**:
    -   Chạy `tasklist` (Windows) hoặc `curl` để kiểm tra tiến trình/port.
4.  **Verification Gate**:
    -   Copy output của `tasklist`/`curl`.
    -   Hỏi Gemini: "Output này có chứng minh app đang chạy không? Yes/No".
    -   Nếu "Yes" -> Đóng gói và báo cáo.
    -   Nếu "No" -> Debug lại.

## Nguyên tắc
- Tuyệt đối KHÔNG báo cáo "Xong" cho người dùng nếu chưa tự xác minh (Self-verification).
