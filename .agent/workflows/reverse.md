---
description: "Quy trình Reverse Engineering: Chẩn đoán, Map, Deconstruct, Reconstruct & Verify."
---

# 🛡️ REVERSE ENGINEERING PROTOCOL (QUY TRÌNH REVERSE)

> **Phạm vi**: Dành cho việc dịch ngược, viết lại và hiện đại hóa code cũ (Legacy/Obfuscated).
> **Nguồn**: `reverse-engineering-agents` (diagnosis, mapping, deconstruction, reconstruction, verification).

---

## ⛔ NGUYÊN TẮC BẤT KHẢ XÂM PHẠM (NO-SKIP POLICY)

1.  **TUẦN TỰ**: Phải đi theo thứ tự Phase 0 -> 4. **CẤM** nhảy cóc.
2.  **AUDIT**: Không chuyển phase nếu chưa tạo đủ file báo cáo (`REPORT.md`, `MAPPING.md`, `PROCESS_LIST.md`).
3.  **ISOLATION**: Code gốc phải được cách ly trong `Original_Sources/`.

---

## 🔥 PHASE 0: CHẨN ĐOÁN (DIAGNOSIS)

**Mục tiêu**: Hiểu đối thủ. Không code, chỉ đọc và phân tích.

1.  **Identification (Nhận diện)**:
    *   Web/Ext? -> Gom vào `Original_Sources`.
    *   Exe? -> Dùng tool (`Detect It Easy`, `asar`, `pyinstxtractor`, `dnSpy`) để unpack.
2.  **Cleanup (Dọn dẹp)**:
    *   Format code (`Prettier`, `Black`).
    *   Đổi tên biến obfuscated (`_0x...`) thành có nghĩa.
3.  **Report**: Tạo `docs/ANALYSIS_REPORT.md` (Stack công nghệ, Cấu trúc thư mục).

---

## 🗺️ PHASE 1: BẢN ĐỒ CHIẾN LƯỢC (MAPPING)

**Mục tiêu**: Lên kế hoạch cấu trúc mới TRƯỚC khi code.

1.  **Component Mapping**: Tạo `docs/MAPPING.md`.
    *   *Input*: File cũ (`legacy/main.js`).
    *   *Output*: Component mới (`src/components/MainDashboard.tsx`).
2.  **Architecture Setup**:
    *   Khởi tạo cấu trúc dự án chuẩn (React/Vite cho Web, Electron cho Desktop).
    *   Tách biệt `src/services` (Logic) và `src/components` (UI).

---

## ✂️ PHASE 2: PHÂN RÃ (DECONSTRUCTION)

**Mục tiêu**: Chia để trị (Divide & Conquer).

1.  **Chunking**: Cắt file gốc lớn thành các file nhỏ (`chunk_X.js`) trong `temp/`.
2.  **Process Queue**: Tạo `docs/PROCESS_LIST.md` liệt kê các chunk cần xử lý.
3.  **Jules Protocol (Integrity)**: Verify xem có file nào bị sót không.

---

## 🏗️ PHASE 3: TÁI CẤU TRÚC (RECONSTRUCTION)

**Mục tiêu**: Viết lại code sạch (Clean Code).

1.  **Active Supervision**:
    *   Mỗi khi viết xong 1 chunk -> Verify logic.
    *   Đánh dấu `[x]` trong `PROCESS_LIST.md`.
2.  **Service Layer**: Viết logic nghiệp vụ (API, Auth) vào `src/services/`. Loại bỏ mã độc/tracking.
3.  **UI Layer**: Viết giao diện vào `src/components/` dùng Tailwind CSS.
4.  **State Management**: Chuyển biến toàn cục thành React State/Context.

---

## ✅ PHASE 4: XÁC MINH (VERIFICATION)

**Mục tiêu**: Chứng minh sản phẩm chạy được.

1.  **Liveness Probe**: Chạy app và kiểm tra process/port (`tasklist`, `curl`).
2.  **Verification Gate**:
    *   Hỏi: "Output này có chứng minh app chạy không?".
    *   Nếu YES -> Bàn giao.
    *   Nếu NO -> Quay lại Phase 3 debug.

---

## 🛑 CHECKLIST REVERSE ENGINEERING
- [ ] (Phase 0) Đã backup code gốc vào `Original_Sources` chưa?
- [ ] (Phase 1) Đã có `MAPPING.md` chưa?
- [ ] (Phase 2) Đã liệt kê đủ chunk trong `PROCESS_LIST.md` chưa?
- [ ] (Phase 3) Đã loại bỏ hết mã độc và tracking chưa?
- [ ] (Phase 4) Đã có bằng chứng app chạy (`curl`, screenshot) chưa?

---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Xong 1 Phase? Chuyển sang Phase tiếp theo
2️⃣ Cần code logic mới? /code
3️⃣ Xong toàn bộ? /save-brain
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
