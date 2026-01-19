---
name: rev-deconstruction
description: Giai đoạn 2 - Chia để trị (Divide & Conquer), cắt nhỏ và xử lý từng phần.
---

# Kỹ năng: Phân rã và Xử lý (Phase 2)

Kỹ năng này xử lý các khối code nguyên khối (Monolith) bằng cách cắt nhỏ và viết lại từng phần.

## Khả năng
- Sao chép và bảo tồn mã nguồn gốc (Mirroring).
- Cắt nhỏ file lớn thành các chunk nhỏ (Chunking).
- Kiểm tra tính toàn vẹn (Jules Protocol).
- Dịch code sang ngôn ngữ/công nghệ mới (Translation).

## Hướng dẫn cho AI (IDE)
1.  **Mirroring**: Copy toàn bộ file gốc vào `Original_Sources/`. Dùng `ls` để kiểm tra.
2.  **Chunking**:
    -   Tạo thư mục `temp/`.
    -   Cắt file gốc thành các file nhỏ `chunk_...` (giữ nguyên code gốc, không sửa).
3.  **Danh sách cam kết (Process Queue)**:
    -   Tạo `PROCESS_LIST.md` liệt kê các chunk.
    -   Xử lý từng chunk một (`[x]`), không làm song song.
4.  **Audit (Jules Protocol)**:
    -   Nhờ Gemini kiểm tra xem có file nào bị sót không.
    -   Chỉ tiếp tục khi Audit Report sạch.
5.  **Dịch (Translation)**: Viết lại code của từng chunk sang ES6+/React/Node.

## Nguyên tắc
- "Quy tắc toàn vẹn": Không bỏ qua file nào dù trông có vẻ đơn giản (trừ thư viện `xlsx.js`).
- Cắt trước, sửa sau.
