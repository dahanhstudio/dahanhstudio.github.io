---
description: "Quy trình kỹ sư AI: Prompting, RAG, & Evaluation."
---

# 🧠 AI ENGINEERING WORKFLOW (QUY TRÌNH KỸ SƯ AI)

> **Phạm vi**: Prompt Engineering, RAG Architecture, Evaluation.
> **Nguồn**: `prompt_engineering`, `rag_architecture`, `llm_evaluation`.

---

## 1. CHIẾN LƯỢC PROMPT (PROMPTING STRATEGY)

### A. Chọn Kỹ Thuật (Technique Selection)
| Loại Tác Vụ | Kỹ Thuật Khuyên Dùng | Ví Dụ |
| :--- | :--- | :--- |
| **Đơn giản** | Zero-Shot | "Dịch câu sau sang tiếng Việt." |
| **Logic/Suy luận** | Chain-of-Thought (CoT) | "Hãy suy nghĩ từng bước trước khi trả lời..." |
| **Format Chuẩn** | Few-Shot / Structured | Đưa 3 ví dụ mẫu + Schema JSON. |
| **Phức tạp** | Prompt Chaining | Chia nhỏ thành nhiều prompt nối tiếp nhau. |

### B. Cấu Trúc Prompt Chuẩn (Anatomy)
1.  **Persona**: "Bạn là chuyên gia về X..."
2.  **Context**: Thông tin nền tảng, dữ liệu đầu vào.
3.  **Instruction**: Chỉ thị rõ ràng, dùng động từ mạnh (Action verbs).
4.  **Constraints**: "Không giải thích dông dài", "Chỉ xuất JSON".
5.  **Output Format**: XML, JSON, Markdown.

---

## 2. KIẾN TRÚC RAG (RETRIEVAL-AUGMENTED GENERATION)

### A. Chiến Lược Tìm Kiếm (Retrieval)
1.  **Hybrid Search**: Kết hợp **Keyword (BM25)** (chính xác từ khoá) + **Vector (Cosine)** (ngữ nghĩa).
2.  **Semantic Chunking**: Đừng cắt text theo ký tự cố định. Chia theo ý nghĩa đoạn văn.
3.  **Reranking**: Dùng Cross-Encoder để sắp xếp lại kết quả tìm kiếm trước khi đưa vào LLM.

### B. Chống Ảo Giác (Hallucination Guardrails)
*   **System Prompt**: "Chỉ trả lời dựa trên Context được cung cấp. Nếu không có thông tin, hãy nói 'Tôi không biết'."
*   **Citations**: Yêu cầu model trích dẫn nguồn (`[Doc ID]`) cho mỗi khẳng định.

---

## 3. ĐÁNH GIÁ CHẤT LƯỢNG (EVALUATION)

Không tin tưởng output mù quáng. Kiểm tra theo **RAG Triad**:

1.  **Context Relevance**: Tài liệu tìm được có liên quan câu hỏi không?
2.  **Groundedness**: Câu trả lời có dựa hoàn toàn vào Context không?
3.  **Answer Relevance**: Câu trả lời có giải quyết đúng câu hỏi người dùng không?

---

## 🛑 CHECKLIST AI ENGINEERING

- [ ] (Safety) Prompt có chặn được Injection attack không?
- [ ] (Cost) Đã ước tính số token đầu vào/ra chưa?
- [ ] (Quality) Đã kiểm tra CoT (Chain-of-Thought) của model khi nó trả lời sai chưa?

---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Prompt chuẩn? /code để triển khai 
2️⃣ Cần xây dựng RAG? /architect
3️⃣ Muốn kiểm thử? /test
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
