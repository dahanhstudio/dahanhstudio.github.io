---
description: "Quy trình sáng tạo nội dung: Visual Design, Algorithmic Art, Tool Design & Animation."
---

# 🎨 CREATIVE STUDIO WORKFLOW

> **Phạm vi**: Visual Design, Generative Art, Tool/MCP Architecture, Research & Animation.
> **Nguồn**: `canvas-design`, `algorithmic-art`, `tool-design`, `mcp-builder`, `notebooklm`, `slack-gif-creator`.

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1.  **Visual Philosophy First**: Trước khi tạo hình ảnh/code, phải định nghĩa "Triết lý thiết kế" (Design Philosophy) bằng lời.
2.  **High Agency Art**: Nghệ thuật phải có "chủ đích" (Intentionality), không phải ngẫu nhiên.
3.  **Architecture as Art**: Việc thiết kế Tool/MCP cũng là một quá trình sáng tạo, đòi hỏi sự tinh gọn và chính xác.

---

## 2. VISUAL DESIGN (CANVAS & POSTER)

### A. Quy trình 2 Bước
1.  **Design Philosophy (.md)**: Viết bản tuyên ngôn nghệ thuật (Manifesto).
    *   Tập trung vào: Không gian, Hình khối (Form), Màu sắc, Bố cục.
    *   **Anti-pattern**: Không mô tả kỹ thuật (layout 3 cột, font size 12). Mô tả cảm xúc và triết lý (e.g., "Brutalist Silence").
2.  **Visual Expression (.pdf/.png)**: "Vẽ" bằng Code hoặc Design Tool.
    *   Ưu tiên sự tối giản (Minimalism) và tinh tế (Craftsmanship).
    *   Text là yếu tố thị giác, không phải văn bản đọc.

---

## 3. ALGORITHMIC ART (GENERATIVE CODE)

### A. Triết lý
*   **Process over Product**: Vẻ đẹp nằm ở thuật toán sinh ra tác phẩm, không chỉ là ảnh cuối cùng.
*   **Controlled Chaos**: Sử dụng sự ngẫu nhiên có kiểm soát (Seeded Randomness).

### B. Kỹ thuật (p5.js)
1.  **Seeded Randomness**: Luôn dùng `randomSeed(seed)` để tái tạo kết quả.
2.  **Parametric Design**: Định nghĩa các tham số (params) có thể điều chỉnh để biến đổi tác phẩm.
3.  **Template**: Bắt buộc dùng `templates/viewer.html` (trong skill) để đảm bảo UI chuẩn (Seed control, Params UI).

---

## 4. TOOL & MCP ARCHITECTURE

### A. Consolidation Principle (Nguyên tắc Hợp nhất)
*   Nếu không thể phân định rõ ràng tool nào cần dùng, hãy gộp chúng lại.
*   **Architectural Reduction**: Ưu tiên 1 tool mạnh (e.g., `run_command` với `grep`, `find`) hơn 10 tool nhỏ lẻ.

### B. MCP Server Standards
*   **Naming**: Bắt buộc có namespace `ServerName:tool_name`.
*   **Error Handling**: Error message phải hướng dẫn Agent cách khắc phục (Actionable Errors).
*   **Discovery**: Dùng `list_tools` để Agent tự khám phá capabilities.

---

## 5. RESEARCH & NOTEBOOKLM

### A. Query Protocol
*   Luôn dùng wrapper `scripts/run.py` (nếu có trong skill) để quản lý venv/auth.
*   **Smart Add**: Nếu user paste link NotebookLM, dùng script để query nội dung trước khi add vào library để có description chính xác.

### B. Follow-up Mechanism
*   Sau khi nhận câu trả lời từ NotebookLM, Agent phải tự đánh giá: "Dữ liệu này đã đủ để trả lời user chưa?". Nếu chưa, tự động hỏi tiếp (Follow-up query).

---

## 6. ANIMATION (SLACK GIFS)

### A. Constraints
*   **Size**: Emoji (128x128), Message (480x480).
*   **Duration**: < 3s (cho Emoji).
*   **FPS**: 10-15 (tối ưu file size).

### B. Techniques
*   **Easing**: Dùng easing functions (ease-in-out, bounce) để chuyển động mượt mà, chuyên nghiệp. Không dùng linear motion đơn điệu.
*   **Visual Depth**: Dùng shadow, gradient, layering để tạo chiều sâu. Tránh flat design nhàm chán.

---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Ý tưởng xong? /visualize để làm mockup
2️⃣ Muốn code luôn? /code
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
