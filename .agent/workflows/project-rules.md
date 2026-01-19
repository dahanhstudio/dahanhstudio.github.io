---
description: 
---

```markdown
# STRICT OPERATIONAL RULES

1. **NO AUTONOMOUS EXECUTION:** Tuyệt đối không được tự ý sửa đổi file hoặc chạy lệnh Terminal mà chưa nhận được sự xác nhận "OK" từ người dùng cho từng bước.
2. **PLANNING FIRST:** Trước khi thực hiện bất kỳ thay đổi nào, phải tạo một `implementation_plan.md` mô tả:
   - Những file nào sẽ bị ảnh hưởng.
   - Tại sao lại thay đổi như vậy.
   - Các rủi ro có thể xảy ra.
3. **PRESERVE EXISTING CODE:** Không được xóa, cấu trúc lại (refactor) hoặc thay đổi logic của các phần code không liên quan đến yêu cầu hiện tại. Nếu thấy cần sửa, phải xin phép riêng.
4. **STRICT TECH STACK:** Chỉ sử dụng các thư viện và phiên bản đã có sẵn trong dự án. Cấm tự ý cài đặt `npm install` các package mới trừ khi tôi yêu cầu.
5. **ZERO HALUCINATION:** Nếu không chắc chắn về một hàm hoặc thư viện, phải tra cứu tài liệu (Documentation) hoặc hỏi lại người dùng, không được tự "chế" code.
6. **VERIFICATION:** Sau khi viết code, phải tự kiểm tra lỗi cú pháp và chạy thử (nếu có môi trường) trước khi thông báo hoàn thành.
```

---

### 2. Prompt bắt đầu mọi Task (Mẫu "Lệnh cưỡng chế")

Mỗi khi bắt đầu một yêu cầu mới, hãy dùng cấu trúc này để AI không "ngựa quen đường cũ":

> **Prompt:** "Tôi muốn làm [Tính năng X]. 
> **Yêu cầu nghiêm ngặt:** 
> 1. Đọc kỹ file `rules.md` trước khi bắt đầu. 
> 2. Phân tích code hiện tại và liệt kê những gì bạn ĐỊNH làm ra chat. 
> 3. **DỪNG LẠI** và chờ tôi xác nhận kế hoạch đó. 
> 4. Tuyệt đối không được sửa bất kỳ dòng code nào cho đến khi tôi nói 'Tiến hành'. 
> 5. Giữ nguyên phong cách viết code (coding style) hiện tại của dự án."

---

### 3. Cách xử lý khi Agent bắt đầu làm sai (Prompt "Chấn chỉnh")

Nếu bạn thấy nó bắt đầu sửa file mà không hỏi, hoặc sửa sai ý, hãy dùng lệnh "ngắt mạch" ngay lập tức:

> **Prompt:** "DỪNG LẠI NGAY. Bạn đang vi phạm quy tắc [Số mấy] trong file quy tắc. 
> - Bạn đã tự ý [Hành động sai] mà chưa có sự đồng ý của tôi. 
> - Hãy hoàn tác (revert) các thay đổi vừa rồi. 
> - Giải thích tại sao bạn lại làm sai yêu cầu và trình bày lại phương án sửa đổi ĐÚNG theo ý tôi đã nêu ở trên."

---
