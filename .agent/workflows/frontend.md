---
description: "Quy trình thiết kế & phát triển Frontend: UI/UX Premium, React Architecture, Anti-AI Slop."
---

# 🎨 FRONTEND MASTER WORKFLOW

> **Phạm vi**: UI/UX Design, React Engineering, Visual Aesthetics.
> **Nguồn**: `ui-ux-pro-max`, `frontend-design`, `web-artifacts-builder`.

---

## 1. NGUYÊN TẮC THIẾT KẾ (DESIGN MANIFESTO)

### A. Chống "AI Slop" (Anti-Slop Protocol)
Để tránh giao diện "nhìn là biết AI làm":
1.  ❌ **NO**: Purple gradients, Default Rounded Corners, Font "Inter" mặc định, Cấu trúc "Dashboard Center" nhàm chán.
2.  ✅ **YES**:
    *   **Typography**: Dùng font có cá tính (Display font) + Body font tinh tế.
    *   **Texture**: Dùng Noise, Grain, Mesh Gradients để tạo chiều sâu.
    *   **Layout**: Asymmetry (Bất đối xứng), Grid-breaking, Overlap.

### B. Premium Aesthetics (Thẩm Mỹ Cao Cấp)
*   **Glassmorphism**: Dùng `backdrop-blur-md` + `bg-white/10` + `border-white/20`. Nhớ test Light Mode!
*   **Micro-interactions**: Hover không chỉ đổi màu. Dùng `scale`, `y-lift`, `shadow-bloom`.
*   **Whitespace**: Khoảng trắng là sự sang trọng. Đừng nhồi nhét.

---

## 2. KỸ THUẬT STACK (TECH STACK STANDARDS)

### A. React & Next.js Architecture
1.  **RSC First**: Mặc định mọi component là Server Component. Chỉ thêm `"use client"` ở lá (leaves).
2.  **Shadcn/UI**: Sử dụng base component từ Shadcn, nhưng **PHẢI** customize theme (Radius, Colors, Animations). Không dùng Default Theme.
3.  **Tailwind CSS**:
    *   Dùng `class-variance-authority` (cva) cho variant components.
    *   Tránh `@apply`. Viết thẳng utility classes.

### B. State Management
*   **URL State** (Ưu tiên số 1): Search params cho Filter, Tab, Pagination.
*   **Server State**: React Query / SWR / RSC.
*   **Single Source of Truth**: Không duplicate state từ props vào state nội bộ.

---

## 3. CHECKLIST TRƯỚC KHI GIAO HÀNG (PRE-DELIVERY)

### UI Quality Check
- [ ] **Icons**: KHÔNG dùng Emoji làm icon. Dùng Lucide/Heroicons (SVG).
- [ ] **Cursor**: Mọi element click được phải có `cursor-pointer`.
- [ ] **Contrast**: Text có đọc được trên nền kính/blur không?
- [ ] **Mobile**: Không bị scroll ngang? Tap target > 44px?

### Code Quality Check
- [ ] Không có `console.log` rác.
- [ ] Không có inline style (`style={{...}}`) trừ khi tính toán động.
- [ ] Component không quá 200 dòng (Tách nhỏ nếu cần).

---

## 4. QUY TRÌNH "PRO MAX" (STEP-BY-STEP)

1.  **Analyze**: Xác định Mood (Brutalism, Minimal, Luxury...).
2.  **Search**: Tìm bảng màu (Palette) và Font pairing phù hợp Mood.
3.  **Structure**: Dựng layout với semantic HTML (`main`, `section`, `article`).
4.  **Style**: Áp dụng Tailwind với tư duy "Mobile First".
5.  **Polish**: Thêm Animation (Framer Motion / CSS Keyframes) và Texture.

---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Đẹp rồi? /code để thêm logic
2️⃣ Thử giao diện? /run
3️⃣ Cần chỉnh sửa? /visualize
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
