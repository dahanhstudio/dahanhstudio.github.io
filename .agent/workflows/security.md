---
description: "Quy trình DevOps & Bảo mật: CI/CD, Container, & Compliance."
---

# 🛡️ DEVOPS & SECURITY WORKFLOW (QUY TRÌNH BẢO MẬT & VẬN HÀNH)

> **Phạm vi**: CI/CD Pipelines, Containerization, Infrastructure Security.
> **Nguồn**: `deploy_cicd`, `docker_optimization`, `secops_core` skills.

---

## 1. CI/CD PIPELINES (GITHUB ACTIONS)

### A. Chiến Lược Workflow
1.  **Triggers**:
    *   `push`: Cho nhánh `main`, `develop`.
    *   `pull_request`: Cho mọi feature branch.
2.  **Jobs Structure**:
    *   `Lint & Test` (Parallel) -> `Build` -> `Security Scan` -> `Deploy`.
3.  **Caching**:
    *   Luôn cache dependencies (`npm`, `pip`, `maven`).
    *   Dùng `actions/cache` để tăng tốc build time.

### B. Quy Tắc YAML
*   **Reusable Workflows**: Tách các step lặp lại (setup node, deploy) thành file riêng trong `.github/workflows/reusable-*.yml`.
*   **Secrets**: Không bao giờ hardcode. Dùng `${{ secrets.KEY }}`.
*   **Permissions**: Set `permissions: read-all` ở top-level, chỉ grant `write` khi cần thiết.

---

## 2. CONTAINERIZATION (DOCKER)

### A. Tối Ưu Image (Optimization)
1.  **Multi-Stage Build**:
    *   *Builder Stage*: Cài GCC, Make, devDependencies.
    *   *Runtime Stage*: Chỉ copy artifact/dist và dependencies production.
    *   *Kết quả*: Giảm size từ 1GB -> <100MB.
2.  **Layer Caching**:
    *   Copy `package.json`/`requirements.txt` trước.
    *   Run install.
    *   Copy source code sau cùng (`COPY . .`).

### B. Bảo Mật Container
*   **Non-Root User**: Luôn tạo user (`RUN useradd appuser`) và switch (`USER appuser`) cuối Dockerfile.
*   **Scan**: Chạy `trivy image` hoặc `docker scout` trước khi push registry.

---

## 3. BẢO MẬT VẬN HÀNH (SECOPS)

### A. Chiến Lược "Shift Left"
Bảo mật từ giai đoạn Code, không phải đợi Deploy.
1.  **SCA (Software Composition Analysis)**: Scan thư viện 3rd-party (npm audit, snyk).
2.  **SAST (Static Analysis)**: Scan mã nguồn tìm lỗ hổng logic (SonarQube, CodeQL).
3.  **Secret Scanning**: Chặn commit chứa API Key (TruffleHog, Gitleaks).

### B. Quản Lý Vulnerability
*   **Critical**: Fix trong 24h. Block release.
*   **High**: Fix trong sprint này.
*   **Medium/Low**: Backlog, fix khi có thể.

---

## 🛑 CHECKLIST DEVOPS

- [ ] (CI) Pipeline có chạy test tự động trên mỗi PR không?
- [ ] (Docker) Image có chạy dưới user root không? (Nếu có -> Fail).
- [ ] (Secrets) Có file `.env` nào bị commit nhầm vào git không?

---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Bảo mật OK? /deploy
2️⃣ Có lỗ hổng? /debug
3️⃣ Kiểm tra lại? /audit
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
