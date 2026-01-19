---
description: 🤖 App Launch Verification
---

# 🤖 UNIVERSAL APP LAUNCH VERIFICATION PROTOCOL

**Version:** 2.0 (Generic - English Standard)
**Objective:** Eliminate fake "DONE" reports. The Agent can only consider the task complete when the application is **ALIVE AND RESPONSIVE**.

---

## 📋 EXECUTION STEPS

### 1. TARGET IDENTIFICATION
Before running, the Agent must clearly identify the success criteria:
*   **Web App:** Which Port is expected to open? Which URL? (e.g., `localhost:3000`, `localhost:8080`).
*   **Desktop App:** What is the exact Window Title? (e.g., "My App v1.0", "Dashboard").
*   **Console App:** What is the specific final log line? (e.g., "Server ready", "Listening on...").

### 2. ACTIVATION
Use the project's standard automation script.
// turbo
```powershell
./scripts/run.bat
```

### 3. DEEP MONITORING
The Agent must use `command_status` to "watch" the terminal continuously for the first 30 seconds.
*   **BLOCKING RULE:** If any of the following keywords are found -> **STOP IMMEDIATELY**:
    *   `Error`, `Exception`, `Traceback`, `Failed`, `Crash`, `Aborted`.
    *   `EADDRINUSE` (Port occupied).
    *   `ModuleNotFoundError`.

### 4. LIVENESS PROBE (MANDATORY)

#### 🅰️ FOR DESKTOP APP (WINDOW CHECK)
Use `tasklist` to scan for the application window. Replace `[APP_TITLE]` with the actual title from `src-ui` config or `package.json`.
```powershell
tasklist /V /FI "WINDOWTITLE eq [YOUR_TARGET_APP_TITLE]*"
```
*   *Tip:* Use `*` at the end for relative matching if the Title changes dynamically.

#### 🅱️ FOR WEB APP (PORT CHECK)
Use `netstat` or `curl` to check the port.
```powershell
netstat -an | findstr ":[PORT]"
# OR
curl -I http://localhost:[PORT]
```

### 5. FINAL VERDICT
*   **✅ PASS:** Window/Port exists AND No Error Logs. -> Report to USER: "Application launched successfully at [URL/PID]".
*   **❌ FAIL:** If > 30 seconds pass without Window/Port OR Red Errors appear. -> Report to USER: "Launch Failed. Proceeding with Debugging...".

---

## 🚨 ZERO TOLERANCE RULES

1.  **NO BLIND "DONE":** Never report success without running the verification command (`tasklist`/`curl`).
2.  **NO IGNORING ERRORS:** Even a small `traceback` is a failure. Console logs must be clean.
3.  **NO SIMULATION:** Do not fake output ("App is running..."). The script must actually run on the User's machine.


---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Live rồi? /save-brain
2️⃣ Chết app? /debug
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

