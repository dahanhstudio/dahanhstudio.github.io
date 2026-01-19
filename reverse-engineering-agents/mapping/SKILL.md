---
name: rev-mapping
description: Giai đoạn 1 - Lập chiến lược và bản đồ cấu trúc hệ thống.
---

# Kỹ năng: Lập bản đồ Chiến lược (Phase 1)

Kỹ năng này chịu trách nhiệm lên kế hoạch cấu trúc trước khi bắt đầu code lại (rewrite).

## Khả năng
- Ánh xạ file cũ sang component mới.
- Vẽ sơ đồ hệ thống (IPC, API, Data Flow).
- Thiết lập cấu trúc dự án chuẩn (React/Vite, Extension, hoặc Electron).

## Hướng dẫn cho AI (IDE)
1.  **Component Mapping**: Tạo file `docs/MAPPING.md` để liệt kê: File cũ -> Component mới.
2.  **Sơ đồ hệ thống**: Xác định luồng dữ liệu API và IPC (nếu là Desktop App).
3.  **Cấu trúc chuẩn (Standard Structure)**:
    -   **Web (React/Vite)**: `src/components`, `src/pages`, `src/services`, `src/layouts`.
    -   **Extension**: `manifest.json`, `src/background`, `src/content`, `src/popup`.
    -   **Desktop**: `src-main` (Backend process), `src-ui` (Renderer process).

## Nguyên tắc
- Tách biệt logic API ra khỏi UI (`services/`).
- Không bắt đầu code khi chưa có bản đồ mapping rõ ràng.
