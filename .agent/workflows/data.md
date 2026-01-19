---
description: "Quy trình kỹ sư dữ liệu: ETL, Database, & Visualization."
---

# 📊 DATA ENGINEERING WORKFLOW (QUY TRÌNH KỸ SƯ DỮ LIỆU)

> **Phạm vi**: ETL/ELT, Database Design, Migration, Visualization.
> **Nguồn**: `data_transform`, `database_design`, `database_migration`, `data_visualization` skills.

---

## 1. CHIẾN LƯỢC XỬ LÝ DỮ LIỆU (DATA PROCESSING STRATEGY)

### A. Khung Quyết Định ETL vs ELT
*Sử dụng bảng dưới đây để quyết định kiến trúc:*

| Tiêu chí | Chọn **ELT** (Modern Stack) | Chọn **ETL** (Classic/Secure) |
| :--- | :--- | :--- |
| **Công cụ** | dbt, Snowflake, BigQuery | Python, Spark, AWS Glue |
| **Dữ Liệu** | > 10GB, Raw Data Dump | Dữ liệu nhạy cảm (PII), Streaming |
| **Logic** | SQL-based Transformation | Code-based (Python/Scala) |
| **Ưu tiên** | Tốc độ phát triển, Linh hoạt | Compliance, Pre-processing nặng |

### B. Chọn Công Cụ Python (DataFrame Selection)
*   **Pandas**: Dữ liệu nhỏ (< 500MB). Cần prototyping nhanh.
*   **Polars**: Dữ liệu trung bình/lớn (500MB - 100GB). Cần tốc độ cao (Lazy evaluation).
*   **PySpark**: Big Data (> 100GB). Cần xử lý phân tán (Cluster).

---

## 2. THIẾT KẾ & DI CHUYỂN DATABASE (DB DESIGN & MIGRATION)

### A. Nguyên Tắc Schema (Schema Protocol)
1.  **Naming**: `snake_case` cho tất cả bảng và cột. Bảng dùng số nhiều (`users`, `orders`).
2.  **Keys**: Mọi bảng phải có Primary Key (`id`). Dùng UUID cho hệ thống phân tán.
3.  **Indexing Rule**:
    *   ✅ Index: Foreign Keys, Columns trong `WHERE`, `ORDER BY`.
    *   ❌ No Index: Bảng nhỏ, Cột Low Cardinality (Gender, Status).

### B. Quy Trình Migration (Zero-Downtime Protocol)
*Áp dụng chiến lược "Expand - Contract":*
1.  **Expand**: Thêm cột mới (Nullable). Code cũ vẫn chạy.
2.  **Backfill**: Chạy script để sync dữ liệu cũ sang mới.
3.  **Switch**: Deploy code mới dùng cột mới.
4.  **Contract**: Xóa cột cũ (Sau khi verify an toàn).

> ⚠️ **CRITICAL**: Luôn backup DB trước khi migrate. Luôn có file `down` (rollback) cho mỗi file `up`.

---

## 3. TRỰC QUAN HOÁ DỮ LIỆU (VISUALIZATION)

### A. Chọn Biểu Đồ (Chart Selection Matrix)
*   **So sánh (Comparison)**: Bar Chart (Categorical), Line Chart (Time-series).
*   **Phân phối (Distribution)**: Histogram, Box Plot.
*   **Mối quan hệ (Relationship)**: Scatter Plot.
*   **Thành phần (Composition)**: Stacked Bar, Pie (Hạn chế dùng Pie).

### B. Quy Tắc Thẩm Mỹ (Aesthetics)
1.  **Ink-to-Data Ratio**: Loại bỏ gridlines, borders không cần thiết.
2.  **Scale**: Trục Y nên bắt đầu từ 0 (trừ trường hợp đặc biệt).
3.  **Accessibility**: Dùng bảng màu Colorblind-safe.

---

## 🛑 CHECKLIST KIỂM SOÁT DỮ LIỆU (DATA CONTROL)

- [ ] (Design) Schema đã đạt chuẩn 3NF chưa?
- [ ] (Perf) Query đã được `EXPLAIN ANALYZE` chưa?
- [ ] (Migrate) Migration script có tương thích ngược (Backward Compatible) không?
- [ ] (Viz) Biểu đồ có phản ánh trung thực dữ liệu không (No manipulative scaling)?

---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Data chuẩn? /backend để viết API
2️⃣ Muốn xem dashboard? /visualize
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
