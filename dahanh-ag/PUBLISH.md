# 📦 Hướng dẫn Xuất bản & Cài đặt Da Hanh AG (Chuyên nghiệp)

Để cài đặt và sử dụng `npx dahanh` như một thư viện chuẩn (giống `create-react-app` hay `eslint`), anh cần làm theo các bước sau.

## 1. Local Development (Dùng thử trên máy tính cá nhân)
Đây là cách nhanh nhất để dùng ngay lập tức mà không cần publish lên mạng.

```bash
# Tại thư mục gốc của dự án (g:\agent-skill\dahanh-ag)
npm link
```

**Sau khi link xong:**
Anh có thể mở bất kỳ terminal nào và gõ:
```bash
dahanh --help
dahanh setup
dh ag next
```

---

## 2. Publish lên NPM (Chuyên nghiệp)
Đây là cách "chuẩn chỉ" để bất kỳ ai (hoặc các máy khác của anh) có thể dùng `npx dahanh` mà không cần setup.

### Bước 2.1: Chuẩn bị tài khoản
1.  Đăng ký tài khoản tại [npmjs.com](https://www.npmjs.com/).
2.  Login trong terminal:
    ```bash
    npm login
    ```

### Bước 2.2: Publish
1.  Đảm bảo tên `dahanh-ag` trong `package.json` chưa bị ai lấy trên NPM (nếu bị trùng, phải đổi tên khác, ví dụ `@dahanh/cli`).
2.  Chạy lệnh:
    ```bash
    npm publish --access public
    ```

### Bước 2.3: Sử dụng (trên bất kỳ máy nào)
Sau khi publish thành công, anh không cần cài đặt gì cả, chỉ cần gõ:

```bash
npx dahanh-ag setup
# Hoặc cài đặt global để dùng lệnh tắt `dh`
npm install -g dahanh-ag
dh ag next
```

## 3. Bản Private (Nâng cao)
Nếu anh muốn giữ source kín nhưng vẫn dùng `npx`:
- Dùng **Verdaccio** (Private NPM Registry) local.
- Hoặc dùng **GitHub Packages**.

---

### 🛡️ Lưu ý quan trọng
- Hiện tại, em đã cấu hình `dahanh` command trỏ vào `./dist/index.js`.
- Khi anh chạy `npm run build`, file binary sẽ được cập nhật.
- Dữ liệu của anh sẽ nằm trong thư mục `.dahanh` của từng dự án anh init. An toàn tuyệt đối.
