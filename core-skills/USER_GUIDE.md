# Hướng dẫn Sử dụng Kho Kỹ Năng (Agent Skills)

Bộ kỹ năng này được thiết kế để "dạy" cho AI Agent cách thực hiện các tác vụ cụ thể theo quy chuẩn mong muốn.

## 1. Cơ chế Hoạt động

Mỗi thư mục kỹ năng chứa một file `SKILL.md`. File này đóng vai trò là "bản hướng dẫn vận hành" (Standard Operating Procedure - SOP) cho AI.

Quy trình sử dụng như sau:
1.  **Kích hoạt**: Bạn đưa ra yêu cầu (ví dụ: *"Hãy thiết kế cho tôi giao diện trang chủ"*).
2.  **Tra cứu**: Bạn (hoặc Agent tự động) xác định kỹ năng liên quan. Ở ví dụ này là `creative/frontend-design`.
3.  **Đọc hướng dẫn**: Agent đọc nội dung file `SKILL.md` tương ứng.
4.  **Thực thi**: Agent thực hiện yêu cầu **chính xác** theo các bước trong mục "Hướng dẫn cho AI (IDE)" của file đó.

## 2. Cách sử dụng cụ thể

### Ví dụ 1: Tạo Slide PowerPoint
1.  **Bạn nói**: *"Tạo cho tôi dàn ý và nội dung slide về Chiến lược Marketing."*
2.  **Bạn (hoặc Agent) làm**: Mở file `documents/pptx/SKILL.md` để Agent đọc.
3.  **Kết quả**: Agent sẽ tạo slide tuân thủ cấu trúc (Title -> Agenda...) và phong cách ngắn gọn như đã định nghĩa trong kỹ năng.

### Ví dụ 2: Viết báo cáo nội bộ
1.  **Bạn nói**: *"Viết email thông báo tiến độ dự án tuần này."*
2.  **Agent áp dụng**: Kỹ năng `enterprise/internal-comms`.
3.  **Kết quả**: Một email ngắn gọn, rõ ràng, có gạch đầu dòng, giọng văn chuyên nghiệp (không sến súa).

## 3. Cách thêm Kỹ năng mới

Để dạy Agent một kỹ năng mới (ví dụ: Viết code Python chuẩn PEP8):

1.  Vào thư mục `g:/agent-skill`.
2.  Copy thư mục `template` và đổi tên thành `python-coding`.
3.  Sửa file `SKILL.md`:
    -   `name`: `python-coding`
    -   `description`: Hướng dẫn viết code Python chuẩn.
    -   **Hướng dẫn cho AI**: Ghi rõ các quy tắc (ví dụ: "Luôn dùng Type Hints", "Phải có Docstring").

## 4. Lợi ích
- **Nhất quán**: Agent luôn làm việc theo một chuẩn, dù là ngày hôm nay hay ngày mai.
- **Có thể mở rộng**: Bạn chỉ cần thêm file hướng dẫn, Agent sẽ tự "học" được kỹ năng mới mà không cần code lại core hệ thống.
