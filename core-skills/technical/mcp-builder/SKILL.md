---
name: mcp-builder
description: Hướng dẫn tạo các máy chủ (server) Model Context Protocol (MCP) chất lượng cao.
---

# Kỹ năng: Xây dựng MCP (MCP Builder)

Kỹ năng này hỗ trợ việc tạo ra các MCP server.

## Khả năng
- Tạo mã nguồn mẫu (boilerplate) cho MCP server (Typescript/Python).
- Định nghĩa các công cụ (tools) và tài nguyên (resources) theo chuẩn MCP.
- Kiểm tra tính hợp lệ của việc triển khai MCP server.

## Hướng dẫn cho AI (IDE)
Khi người dùng muốn tích hợp API mới, cơ sở dữ liệu, hoặc công cụ vào hệ sinh thái Agent:
1.  **Chuẩn**: Tuân thủ nghiêm ngặt đặc tả Model Context Protocol.
2.  **Ngôn ngữ**: Hỏi người dùng muốn dùng Python hay TypeScript/Node.js.
3.  **Bảo mật**: Luôn nhắc nhở về việc không hardcode API key trong mã nguồn.
4.  **Cấu trúc**: Tạo file `index.js` (hoặc `.py`) và `package.json` (hoặc `requirements.txt`) đầy đủ.
