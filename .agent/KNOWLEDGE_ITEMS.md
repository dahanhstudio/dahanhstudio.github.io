# 🧠 KNOWLEDGE ITEM: BỘ TIÊU CHUẨN DẠ HÀNH STUDIO V4.2

Tài liệu này tổng hợp các kiến thức cốt lõi (Knowledge Items) đã được đúc kết sau quá trình nâng cấp hệ thống Antigravity.

---

## 1. 🛡️ CƠ CHẾ BẢO MẬT LOCAL SECRETS (KI #001)
*   **Kiến thức**: Tuyệt đối không hardcode GitHub Token hoặc API Key vào các tệp Workflow (.md).
*   **Giải pháp**: Sử dụng cơ chế nạp biến từ tệp `secrets.local.md` (nằm trong `.gitignore`).
*   **Cách dùng**: Agent phải đọc file này trước khi thực hiện các tác vụ liên quan đến Git hoặc API bên thứ ba.

## 2. 🏛️ KIẾN TRÚC MODULAR & QUY TẮC MONOLITH (KI #002)
*   **Kiến thức**: File code quá lớn (> 900 dòng) làm suy giảm khả năng chú ý của AI (Lost-in-the-middle).
*   **Giải pháp**: Áp dụng quy tắc "No Monolith". Bắt buộc tách file khi vượt quá ngưỡng 900 dòng.
*   **Cấu trúc**: Phân tách rõ ràng thành `services/`, `components/`, và `utils/`.

## 3. ⚖️ GIAO THỨC GIÁM SÁT KHẮT KHE (AUDITOR AGENT) (KI #003)
*   **Kiến thức**: Agent thực thi thường có xu hướng bỏ qua các chi tiết nhỏ để hoàn thành task nhanh.
*   **Giải pháp**: Triệu hồi một Auditor Agent với tâm thế "Adversarial" (Đối nghịch).
*   **Tiêu chuẩn**: Zero-Tolerance. Chỉ chấp nhận kết quả đạt chuẩn `CERTIFIED` sau khi quét qua: Security, Architecture, và UI Slop.

## 4. 🎨 TIÊU CHUẨN CHỐNG AI SLOP (KI #004)
*   **Kiến thức**: AI thường có thói quen dùng Emoji làm icon hoặc viết code boilerplate thừa thãi.
*   **Giải pháp**: Quy tắc "Anti-AI Slop". Bắt buộc dùng SVG chuyên nghiệp (Lucide/Heroicons) và code tối giản, hiệu quả cao.

---
**Trạng thái**: Đã đồng bộ vào Knowledge Base hệ thống.
