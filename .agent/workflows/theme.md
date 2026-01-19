---
description: 🎨 Theme Lifecycle Manager (Pro Max)
---

# SYSTEM: THEME LIFECYCLE MANAGER (PRO MAX)

**Token**: Đọc từ `.agent/secrets.local.md` (Tài khoản NungLon01)

## ⛔ QUY TẮC BẤT KHẢ XÂM PHẠM (FORBIDDEN RULES)

1.  **CẤM ĐOÁN MÒ (No Guesswork):** Tuyệt đối không tự bịa logic.
2.  **CẤM HARDCODE:** Không code cứng API Key.
3.  **CẤM TỰ Ý SÁNG TẠO (No Unauthorized Creativity):** Không thêm tính năng nếu không được yêu cầu.
4.  **CẤM BỎ QUA BƯỚC (No Skipping):** Làm tuần tự. Không nhảy cóc.
5.  **CẤM TỰ Ý HÀNH ĐỘNG (No Over-Proactive):** Không Build/Deploy chui.
6.  **CẤM IMPORT VÒNG VO (No Circular Dependency):** Import đơn chiều.
7.  **CẤM ĐOÁN TÊN FILE (No Hallucination):** Phải `ls` trước khi đụng vào.
8.  **CẤM VĂN VỞ (No Yapping):** Ít nói, làm nhiều.
9.  **CẤM CODE ẢO (No Fake Code):** Code phải chạy được.
10. **CẤM LỜ LỖI (No Ignoring Errors):** Fix lỗi ngay lập tức.
11. **CẤM ẢO TƯỞNG (No Overconfidence):** Luôn nghi ngờ và Verify.
12. **CẤM QUÊN CHANGELOG:** Update CHANGELOG.md.
13. **CẤM CHỐNG LỆNH (Absolute Obedience):** Dừng ngay khi được bảo.
14. **CẤM NÓI NHIỀU (Less Talk):** Kết quả là thước đo duy nhất.
15. **CẤM HEADER/FOOTER LỆCH CHUẨN:** Header (Logo/Title) - Footer (Copyright).
16. **CẤM SUY DIỄN CÁ NHÂN (Zero Personal Thought):** AI không được có suy nghĩ cá nhân. Mục tiêu duy nhất là hoàn thiện dự án CHÍNH XÁC và KHÔNG LỖI. Làm đúng và đầy đủ 100% yêu cầu, không bỏ qua dù là chi tiết nhỏ nhất. Suy diễn lung tung = Xóa Project.

---

## 1. INTELLIGENCE ENGINE & THEME FETCH (AUTO)

// turbo
```powershell
# === AUTO-DETECT & BOOTSTRAP ===
$EngPath = ".agent\workflows\research-and-build-theme"; $Repo = "https://NungLon01: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@github.com/NungLon01/dh-themes.git"

Write-Host ">>> [1/5] CHECKING ENGINE..." -ForegroundColor Cyan
if (Test-Path "$EngPath\.git") {
    Write-Host "   > Engine found. Self-Updating..." -NoNewline
    Push-Location $EngPath
    git pull | Out-Null
    Pop-Location
    Write-Host " [UPDATED]" -ForegroundColor Green
} else {
    if (Test-Path $EngPath) { Remove-Item $EngPath -Recurse -Force }
    git clone $Repo ".agent\workflows\temp_eng"; 
    Move-Item ".agent\workflows\temp_eng\research-and-build-theme" $EngPath -Force; 
    Remove-Item ".agent\workflows\temp_eng" -Recurse -Force;
    Write-Host "   > Engine Installed." -ForegroundColor Green
}

# === THEME RETRIEVAL ===
$ThemeName = Read-Host ">>> INPUT THEME NAME"
# ... (Logic check/clone theme như cũ - Tóm tắt để tập trung vào Integration)
# Giả sử đã có theme tại .themes\$ThemeName
```

## 2. BACKUP & ANALYZE (SAFETY FIRST)

// turbo
```powershell
# === AUTO-DETECT CWD ===
$CurrentDir = Get-Location
Write-Host ">>> [2/5] WORKING AT: $CurrentDir" -ForegroundColor Yellow

# === BACKUP DATA ===
$BackupDir = ".backups\Backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Write-Host ">>> [BACKUP] ARCHIVING TO $BackupDir..."
mkdir $BackupDir | Out-Null
Copy-Item * -Destination $BackupDir -Recurse -Exclude ".git", "node_modules", ".backups" -Force
Write-Host "   > Backup Secure." -ForegroundColor Green

# === ANALYZE STACK ===
Write-Host ">>> [ANALYZE] CHECKING STACK..."
if (Test-Path "package.json") {
    $pkg = Get-Content "package.json" | ConvertFrom-Json
    if ($pkg.dependencies.'next') { $Stack = "NextJS" }
    elseif ($pkg.dependencies.'react') { $Stack = "React" }
    elseif ($pkg.dependencies.'vue') { $Stack = "Vue" }
    else { $Stack = "Node/JS" }
} else { $Stack = "HTML/Static" }
Write-Host "   > DETECTED STACK: $Stack" -ForegroundColor Green
```

## 3. INTEGRATION DECISION

// turbo
```powershell
# === ASK USER ===
$Confirm = Read-Host ">>> DETECTED THEME '$ThemeName'. INTEGRATE INTO PROJECT? (Y/N)"
if ($Confirm -ne 'Y') { Write-Host ">>> STOPPING WORKFLOW."; exit }

# === CSS ANALYSIS & UPDATE ===
Write-Host ">>> [3/5] ANALYZING PROJECT CSS..."
# Find global css
$CssFiles = Get-ChildItem -Recurse -Filter "*.css" -Exclude "node_modules"
Write-Host "   > Found $($CssFiles.Count) CSS files."

# (Logic: Find Main CSS and Overwrite)
$ThemeCss = ".themes\$ThemeName\style.css"
if (Test-Path $ThemeCss) {
   # 1. Prioritize 'globals.css' or 'App.css' in src
   # 1. Smart Scan in 'src' for Main CSS
   $TargetFile = $null
   if (Test-Path "src") { 
       $Candidates = Get-ChildItem -Path "src" -Recurse -Filter "*.css"
   } else {
       $Candidates = Get-ChildItem -Recurse -Filter "*.css" -Exclude "node_modules", "docs", "dist", "build"
   }

   # Filter candidates containing ':root' (Reliable indicator of Main CSS including Theme Variables)
   $TargetFile = $Candidates | Select-String -Pattern ":root" -List | Select-Object -First 1 | ForEach-Object { $_.Path }
   
   # Fallback: Take the first CSS file if no smart match
   if (-not $TargetFile) { $TargetFile = $Candidates | Select-Object -First 1 | ForEach-Object { $_.FullName } }
   
   if ($TargetFile) {
       Write-Host "   > TARGET IDENTIFIED: $TargetFile" -ForegroundColor Cyan
       
       # 2. Content Replacement
       $NewContent = Get-Content $ThemeCss -Raw
       Set-Content -Path $TargetFile -Value $NewContent
       Write-Host "   > [SUCCESS] THEME APPLIED TO PROJECT." -ForegroundColor Green
   } else {
       Write-Error "   > [ERROR] COULD NOT AUTO-DETECT MAIN CSS. PLEASE CHECK MANUALLY."
   }
}
```

## 4. VERIFY & LAUNCH

// turbo
```powershell
# === VERIFY ===
Write-Host ">>> [4/5] VERIFYING BUILD..."
# npm run build (Optional - Disabled for speed unless requested)

# === LAUNCH PREVIEW ===
Write-Host ">>> [5/5] OPENING APPLICATION..."
# Auto-detect start command logic... (npm run dev or start index.html)
if ($Stack -eq "HTML/Static") { try { Invoke-Item "index.html" } catch {} }
else { Write-Host ">>> PLEASE RUN: npm run dev" -ForegroundColor Yellow }

Write-Host ">>> WORKFLOW COMPLETED."
```

## ⚠️ REMINDER: AI BEHAVIOR

*   **KHÔNG ẢO TƯỞNG.** Check lại Backup chưa?
*   **KHÔNG LÀM ẨU.** CSS merge có làm vỡ layout cũ không?
*   **KHÔNG QUÊN CHANGELOG.**


---

---

## ⚠️ NEXT STEPS (Menu số):
```
1️⃣ Theme đẹp rồi? /visualize hoặc /code tiếp
2️⃣ Chưa ưng? Chọn theme khác trong /theme
3️⃣ Lưu thay đổi? /save-brain
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

