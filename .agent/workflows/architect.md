---
description: "Quy trình thiết kế Agent: Multi-agent Patterns, Memory Systems, BDI Architecture & Hosted Agents."
---

# 🧠 ARCHITECT WORKFLOW

> **Phạm vi**: System Design, Agent Orchestration, Cognitive Modeling.
> **Nguồn**: `multi-agent-patterns`, `memory-systems`, `bdi-mental-states`, `hosted-agents`.

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1.  **Context Isolation (Cách ly ngữ cảnh)**: Mục đích chính của Multi-agent là chia nhỏ Context, tránh "Lost in the middle".
2.  **State Persistence (Lưu trữ trạng thái)**: Sử dụng Spectrum: Context (Ngắn hạn) -> Short-term (Session) -> Long-term (Vector/Graph).
3.  **Cognitive Modeling**: Agent hành động dựa trên BDI (Belief - Ngữ cảnh, Desire - Mục tiêu, Intention - Kế hoạch).

---

## 2. KIẾN TRÚC ĐA AGENT (MULTI-AGENT PATTERNS)

### A. Supervisor (Mô hình Giám sát)
*   **Cấu trúc**: 1 Supervisor -> N Specialists.
*   **Khi dùng**: Task có quy trình rõ ràng, cần kiểm soát chặt chẽ.
*   **Lưu ý**: Tránh "Telephone Game" (Supervisor truyền đạt sai). Cho phép Sub-agent trả lời trực tiếp User nếu cần.

### B. Swarm / Peer-to-Peer
*   **Cấu trúc**: Agent A chuyển giao (Handoff) sang Agent B trực tiếp.
*   **Khi dùng**: Task cần khám phá linh hoạt, không có quy trình cứng.
*   **Yêu cầu**: Protocol chuyển giao rõ ràng (Handoff Protocol).

### C. Subagent-Driven Development (SDD) & Strict Audit
*   **Quy trình chuẩn**:
    1.  **Implementer**: Code feature dựa trên Spec.
    2.  **Spec Reviewer**: Kiểm tra xem có đúng Spec không?
    3.  **Code Quality Reviewer**: Kiểm tra chất lượng code.
*   **Vị Giám Sát Khắt Khe (AUDITOR_AGENT)**:
    - **Nhiệm vụ**: Đứng ở cuối quy trình, kiểm tra kết quả của 3 Agent trên.
    - **Tiêu chuẩn**: Zero-Tolerance. Chỉ cần 1 lỗi nhỏ (vỡ layout, thiếu validation, hardcode) là REJECT ngay lập tức.
    - **Checklist khắt khe**:
        - [ ] Architecture có bị Monolith không? (> 900 dòng là loại).
        - [ ] UI có Slop không? (Dùng emoji làm icon là loại).
        - [ ] Security có hổng không? (Hardcode mật khẩu/token là loại).
    - **Kết quả**: Chỉ có `REJECT` (kèm danh sách lỗi) hoặc `CERTIFIED` (Phê duyệt danh giá).

*   **Nguyên tắc**: Fresh Context per Task. Không tái sử dụng context đã bị "ô nhiễm".

---

## 3. HỆ THỐNG BỘ NHỚ (MEMORY SYSTEMS)

### A. Memory Spectrum
1.  **Working Memory**: Context Window hiện tại (Mất khi hết session).
2.  **Short-term Memory**: Session storage, File-system scratchpad (Tồn tại trong session).
3.  **Entity Memory**: Knowledge Graph về Entity (Người, Vật, Khái niệm).
4.  **Temporal Knowledge Graph**: Entity + Thời gian (Sự thật này đúng vào lúc nào?).

### B. Triples-to-Beliefs-to-Triples (T2B2T)
Input RDF -> Belief Update -> Reasoning -> Intention Formation -> New RDF Output.

---

## 4. HẠ TẦNG HOSTED AGENT

*   **Sandboxed Environment**: Agent chạy trong môi trường cô lập, có thể reset bất cứ lúc nào.
*   **Server-First**: Agent framework phải là Server, Client chỉ là giao diện (TUI, Web).
*   **Multiplayer**: Hỗ trợ nhiều người cùng tương tác với 1 Session. State phải đồng bộ.

---

## checklist KIẾM TRA (ARCHITECT CHECKLIST)

- [ ] Đã xác định mô hình (Supervisor hay Swarm) chưa?
- [ ] Có chiến lược cách ly Context (Context Isolation) chưa?
- [ ] Hệ thống nhớ (Memory) là Vector hay Graph? Có cần Temporal không?
- [ ] Protocol chuyển giao (Handoff) giữa các Agent đã rõ ràng chưa?

---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Thiết kế xong? /plan cho tính năng đầu tiên
2️⃣ Muốn code luôn? /code
3️⃣ Cần xem Database? /data
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
