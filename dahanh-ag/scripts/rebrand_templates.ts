
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEMPLATES_DIR = join(process.cwd(), "src/templates");

function replaceInFile(filePath: string) {
    let content = readFileSync(filePath, "utf-8");
    const originalContent = content;

    // Replace commands
    content = content.replace(/knowns task/g, "dahanh task");
    content = content.replace(/knowns doc/g, "dahanh doc");
    content = content.replace(/knowns search/g, "dahanh search");
    content = content.replace(/knowns time/g, "dahanh time");
    content = content.replace(/knowns mcp/g, "dahanh mcp");
    content = content.replace(/knowns init/g, "dahanh setup"); // special case
    content = content.replace(/knowns setup/g, "dahanh setup");

    // Replace namespaced skills
    content = content.replace(/knowns\./g, "dahanh.");

    // Replace other knowns references
    content = content.replace(/knowns:/g, "dahanh:");
    content = content.replace(/name: knowns/g, "name: dahanh");
    
    // Replace CLI example
    content = content.replace(/knowns <command>/g, "dahanh <command>");

    if (content !== originalContent) {
        writeFileSync(filePath, content, "utf-8");
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir: string) {
    const files = readdirSync(dir);
    for (const file of files) {
        const fullPath = join(dir, file);
        if (statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith(".md")) {
            replaceInFile(fullPath);
        }
    }
}

console.log("Starting template rebranding...");
walkDir(TEMPLATES_DIR);
console.log("Done.");
