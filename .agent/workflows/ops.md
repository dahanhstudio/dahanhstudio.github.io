---
description: "Quy trình vận hành: Compliance & Content Strategy."
---

# ⚙️ OPERATIONS & STRATEGY WORKFLOW (QUY TRÌNH VẬN HÀNH CHIẾN LƯỢC)

> **Phạm vi**: Compliance, Content Strategy, Security Governance.
> **Nguồn**: `compliance_analyst`, `content_strategist` skills.

---

## 1. QUY TRÌNH TUÂN THỦ (COMPLIANCE PROTOCOL)

### A. Kiểm Soát Dữ Liệu (Data Governance)
Áp dụng cho mọi tính năng xử lý dữ liệu người dùng:

1.  **GDPR Check**:
    *   Có thu thập dữ liệu cá nhân (PII) không?
    *   Người dùng có quyền "Được Quên" (Right to be Forgotten) không?
    *   Dữ liệu có được mã hoá (Encryption At Rest) không?
2.  **SOC 2 Check**:
    *   Truy cập có được ghi log (Audit Log) không?
    *   Hệ thống có backup plan không?

### B. Phân Tích Khoảng Cách (Gap Analysis)
Khi triển khai quy định mới:
1.  **Inventory**: Liệt kê hệ thống bị ảnh hưởng.
2.  **Assess**: So sánh Hiện tại vs Yêu cầu.
3.  **Remediate**: Lên kế hoạch khắc phục khoảng cách.

---

## 2. CHIẾN LƯỢC NỘI DUNG (CONTENT STRATEGY)

### A. Chuẩn Mực Nội Dung (Content Standards)
Mọi nội dung (Docs, Blog, UI Text) phải đạt chuẩn:
1.  **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness).
2.  **User-Centric**: Giải quyết vấn đề của người dùng, không chỉ để SEO.

### B. Quy Trình SEO (SEO Workflow)
1.  **Keyword Research**: Xác định từ khóa chính (Primary) và phụ (LSI).
2.  **Structure**:
    *   H1: Chứa từ khóa chính.
    *   Meta Description: < 160 ký tự, hấp dẫn + từ khóa.
    *   H2/H3: Cấu trúc logic, dễ đọc (Scannable).
3.  **Optimization**:
    *   Internal Links: Liên kết đến các bài viết liên quan (Topic Cluster).
    *   Alt Text: Mô tả ảnh cho Accessibility & SEO.

---

## 🛑 CHECKLIST VẬN HÀNH (OPS CHECKLIST)

- [ ] (Compliance) Tính năng mới đã qua review bảo mật chưa?
- [ ] (Content) Bài viết đã được tối ưu SEO on-page chưa?
- [ ] (Backup) Có plan rollback nếu deploy thất bại không?

---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Vận hành ổn? /deploy
2️⃣ Cần audit lại? /audit
3️⃣ Lưu kiến thức? /save-brain
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
