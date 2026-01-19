
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DOCS_DIR = join(process.cwd(), "docs");
const INTERNAL_DOCS_DIR = join(process.cwd(), ".dahanh", "docs");

const DICTIONARY = [
    // Branding
    { from: /Knowns/g, to: "Dạ Hành AG" },
    { from: /knowns/g, to: "dahanh" }, // Commands mostly
    { from: /\.knowns/g, to: ".dahanh" },

    // Common Headers
    { from: /^# Overview/gm, to: "# Tổng quan" },
    { from: /^# Installation/gm, to: "# Cài đặt" },
    { from: /^# Usage/gm, to: "# Hướng dẫn sử dụng" },
    { from: /^# Introduction/gm, to: "# Giới thiệu" },
    { from: /^# Features/gm, to: "# Tính năng" },
    { from: /^# Configuration/gm, to: "# Cấu hình" },
    { from: /^# Commands/gm, to: "# Các lệnh" },
    { from: /^## Task Management/gm, to: "## Quản lý Task" },
    { from: /^## Time Tracking/gm, to: "## Theo dõi thời gian" },
    
    // Common Descriptions
    { from: /Initialize a new project/g, to: "Khởi tạo dự án mới" },
    { from: /List all tasks/g, to: "Xem danh sách việc" },
    { from: /Create a new task/g, to: "Tạo việc mới" },
    { from: /Edit task properties/g, to: "Sửa thông tin việc" },
    { from: /View task details/g, to: "Xem chi tiết việc" },
    { from: /Git tracking mode/g, to: "Chế độ theo dõi Git" },
    
    // Statuses
    { from: /"todo"/g, to: "\"cần làm\"" },
    { from: /"in-progress"/g, to: "\"đang làm\"" },
    { from: /"done"/g, to: "\"hoàn thành\"" },
    
    // Clean up
    { from: /Start the interactive wizard/g, to: "Chạy trình cài đặt tương tác" },
];

function translateFile(filePath: string) {
    if (!filePath.endsWith(".md")) return;
    
    let content = readFileSync(filePath, "utf-8");
    const original = content;

    for (const entry of DICTIONARY) {
        content = content.replace(entry.from, entry.to);
    }

    if (content !== original) {
        writeFileSync(filePath, content, "utf-8");
        console.log(`Translated: ${filePath}`);
    }
}

function walkDir(dir: string) {
    try {
        const files = readdirSync(dir);
        for (const file of files) {
            const fullPath = join(dir, file);
            if (statSync(fullPath).isDirectory()) {
                walkDir(fullPath);
            } else {
                translateFile(fullPath);
            }
        }
    } catch (e) {
        console.log(`Skipping dir: ${dir} (not found)`);
    }
}

console.log("Translating docs to Vietnamese...");
walkDir(DOCS_DIR);
walkDir(INTERNAL_DOCS_DIR);
console.log("Done.");
