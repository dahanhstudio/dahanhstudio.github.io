---
name: rev-reconstruction
description: Giai đoạn 3 - Tái cấu trúc toàn diện (Full Reconstruction) theo chiến lược Oil Spill.
---

# Kỹ năng: Tái cấu trúc (Phase 3)

Kỹ năng này lắp ghép các phần đã dịch thành một hệ thống hoàn chỉnh.

## Khả năng
- Giám sát logic bởi Gemini (Active Supervision).
- Triển khai lớp Service (Backend logic).
- Triển khai lớp UI (Frontend).

## Hướng dẫn cho AI (IDE)
1.  **Giám sát (Paying Gemini Debt)**:
    -   Trước khi viết code cho chunk: Hỏi Gemini kiểm tra logic.
    -   Sau khi viết xong: Hỏi Gemini xác nhận đúng 100% chưa.
    -   Chỉ gạch bỏ khỏi `PROCESS_LIST.md` khi Gemini nói "Ok".
2.  **Lớp Service (Backend/Logic)**:
    -   Tách biệt hoàn toàn: `GeminiService.js`, `FirebaseService.js`.
    -   Không chứa logic UI (DOM manipulation).
    -   Loại bỏ mã độc/tracking/license check.
3.  **Lớp UI (Frontend)**:
    -   **Dumb Components**: Nút, Input (dùng Tailwind).
    -   **Smart Components**: Màn hình chính, kết nối với Service.
    -   **State**: Dùng `useState`, `Context` thay cho biến toàn cục.

## Nguyên tắc
- Một file chỉ chứa một mục đích/Service (Single Responsibility).
- Không được "lump" (gộp chung) logic vào các file chung chung như `CommonService`.
