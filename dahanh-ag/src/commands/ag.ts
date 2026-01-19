/**
 * Antigravity Bridge Command
 * "The Hook" for Agent interactions.
 */

import { FileStore } from "@storage/file-store";
import { findProjectRoot } from "@utils/find-project-root";
import { resolveDocReferences } from "@utils/doc-links";
import chalk from "chalk";
import { Command } from "commander";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

function getFileStore(): FileStore {
	const projectRoot = findProjectRoot();
	if (!projectRoot) {
		console.error(chalk.red("✗ Not a knowns project"));
		process.exit(1);
	}
	return new FileStore(projectRoot);
}

export const agCommand = new Command("ag")
	.description("Antigravity Bridge operations")
    .alias("antigravity");

agCommand
	.command("request")
	.command("request")
	.description("Tạo Hồ sơ Nhiệm vụ (Mission Brief) cho Agent")
	.argument("<taskId>", "ID nhiệm vụ cần xử lý")
	.option("-w, --workflow <name>", "Áp dụng khuôn mẫu quy trình (ví dụ: architect, brainstorm)")
	.action(async (taskId: string, options: { workflow?: string }) => {
		try {
			const fileStore = getFileStore();
			const task = await fileStore.getTask(taskId);
            
			if (!task) {
				console.error(chalk.red(`✗ Task ${taskId} not found`));
				process.exit(1);
			}

            const agentName = options.workflow || "Agent";

            // 1. Header
            console.log(chalk.cyan(`>>> BẮT ĐẦU NHIỆM VỤ: TASK-${task.id} <<<`));
            console.log(`\n# NHIỆM VỤ ${task.id}: ${task.title}`);
            console.log(`PHÂN LOẠI: ${task.labels.join(", ") || "Chung"}`);
            
            // 2. Core Context
            console.log(`\n## MÔ TẢ CHI TIẾT\n${task.description || "(Chưa có mô tả)"}`);
            
            if (task.acceptanceCriteria.length > 0) {
                console.log(`\n## TIÊU CHÍ CHẤP NHẬN (AC)`);
                task.acceptanceCriteria.forEach((ac, i) => {
                    const status = ac.completed ? "[x]" : "[ ]";
                    console.log(`${status} ${ac.text}`);
                });
            }

            // 3. Resolve Docs (The Context Engine Lite)
            const projectRoot = findProjectRoot();
            if (projectRoot) {
                 const allContent = [task.description, task.implementationPlan].join("\n");
                 const docRefs = resolveDocReferences(allContent, projectRoot);
                 
                 // Also auto-include RULES.md if it exists
                 // This is a simplified "Context Engine" logic
                 const rulesPath = join(projectRoot, ".knowns", "docs", "RULES.md");
                 // In a real implementation, we'd check if file exists and append it.
             }
            
            if (options.workflow) {
                console.log(chalk.magenta(`\n## GIAO THỨC AGENT: ${options.workflow.toUpperCase()}`));
                console.log(`Hãy thực hiện nhiệm vụ theo quy trình chuyên biệt dành cho ${options.workflow}.`);
                console.log(`(Tham khảo: dahanh workflow show ${options.workflow})`);
            }
            
            console.log(chalk.cyan(`\n>>> KẾT THÚC HỒ SƠ <<<`));
            console.log(chalk.gray("\n(Copy khối nội dung trên và gửi cho Agent)"));

		} catch (error) {
			console.error(chalk.red("✗ Failed to generate brief"));
            if (error instanceof Error) console.error(chalk.gray(error.message));
			process.exit(1);
		}
	});

agCommand
    .command("next")
    .description("Tìm nhiệm vụ ưu tiên tiếp theo và tạo hồ sơ")
    .action(async () => {
        try {
            const fileStore = getFileStore();
            const tasks = await fileStore.getAllTasks();
            
            // Filter: status=todo, sort by priority
            const todo = tasks.filter(t => t.status === 'todo');
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            
            todo.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            
            if (todo.length === 0) {
                console.log(chalk.yellow("Tuyệt vời! Không còn task nào đang chờ."));
                return;
            }
            
            const nextTask = todo[0];
            console.log(chalk.green(`✓ Đã tìm thấy task ưu tiên: #${nextTask.id} (${nextTask.priority})`));
            
            // Trigger the request logic (simplified call)
            // In real code, we'd refactor 'generateBrief' to a shared function
            // For now, let's just output the command recommendation
            console.log(chalk.bold(`\nChạy lệnh sau để lấy hồ sơ:\n`));
            console.log(chalk.cyan(`dahanh ag request ${nextTask.id}`));
            
        } catch (error) {
            console.error(chalk.red("✗ Failed to find next task"));
        }
    });

