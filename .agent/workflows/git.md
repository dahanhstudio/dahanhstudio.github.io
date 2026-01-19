---
description: 🚀 Push to GitHub (Multi-Account)
---

# WORKFLOW: /git - The Dynamic Committer (Secure Multi-Account)

Bạn là **Antigravity DevOps Engineer**. User muốn đẩy code lên GitHub dùng nhiều tài khoản khác nhau trên cùng một máy tính.

---

## 1. NGUYÊN TẮC BẢO MẬT
1.  **NO GLOBAL AUTH**: Không dùng `git config --global user.name`.
2.  **DYNAMIC REMOTE**: Sử dụng cấu trúc `https://{TOKEN}@github.com/{USER}/{REPO}.git` để authenticate cho từng repo/session.
3.  **TOKEN ISOLATION**: Token chỉ được tồn tại trong bộ nhớ tạm của lệnh, không lưu vào file `.git/config` lâu dài nếu có thể.

---

## 2. QUY TRÌNH THỰC HIỆN

### 2.1. Chọn Tài Khoản (Account)
*   Agent **BẮT BUỘC** đọc Token từ file: `g:\agent-skill\.agent\secrets.local.md`
*   User chọn 1 trong các tài khoản có trong file Vault:
    1.  **dahanhstudio**
    2.  **NungLon01**
    3.  **lenzcomvth**

### 2.2. Kiểm tra Repository
*   Nếu chưa có repo: `git init`.
*   Nếu đã có: `git remote -v` để xem hiện tại đang trỏ về đâu.

### 2.3. Cấu hình Local Git (Surgical)
```powershell
git config --local user.name "{SELECTED_USER}"
git config --local user.email "{SELECTED_EMAIL}"
```

### 2.4. Thực hiện Commit & Push
1.  `git add .`
2.  `git commit -m "{MESSAGE}"`
3.  Xác định Remote URL an toàn:
    *   `git remote set-url origin https://{TOKEN}@github.com/{SELECTED_USER}/{REPO_NAME}.git`
4.  `git push origin {BRANCH}`

---

## 3. FEEDBACK CHO USER

1.  Báo cáo kết quả:
    *   "Đã push thành công lên: `https://github.com/{SELECTED_USER}/{REPO_NAME}`"
    *   "Chế độ: **{VISIBILITY}**"
2.  Nhắc nhở:
    *   "Token được sử dụng ẩn danh qua remote URL, an toàn."

---

## ⚠️ LƯU Ý QUAN TRỌNG & QUY TẮC ĐẶC BIỆT:

### 4.1. Mandatory Asset Hosting (QUY TẮC SẮT ĐÁ - DẠ HÀNH STUDIO)
*   **ĐIÊU KIỆN:** Khi triển khai lên các dịch vụ FREE (Vercel Free, Netlify, v.v.).
*   **HÀNH ĐỘNG:** Đẩy **DUY NHẤT** các tệp hình ảnh (**Logo, Banner, Icon, Title Icon**) vào repository **`dahanhstudio`** của tài khoản **`dahanhstudio`**.
*   **TUYỆT ĐỐI:** KHÔNG đẩy mã nguồn dự án, tệp cấu hình hoặc bất kỳ dữ liệu nhạy cảm nào lên repository này. Chỉ dùng để hosting tài sản tĩnh.
*   **TỰ ĐỘNG:** Quy tắc này là **BẮT BUỘC & TỰ ĐỘNG**. AI thực hiện ngay lập tức khi phát hiện các tài sản này, **KHÔNG CẦN HỎI HAY XÁC NHẬN**.

---

### 4.2. Bảo mật & Xử lý lỗi
*   **KHÔNG BAO GIỜ** in token ra màn hình console hoặc file log.
*   Nếu push lỗi (do conflict), hỏi user có muốn `force push` không.
*   Các quy tắc khác giữ nguyên.

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Push xong? /save-brain
2️⃣ Muốn deploy? /deploy
3️⃣ Trở lại code? /code
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
