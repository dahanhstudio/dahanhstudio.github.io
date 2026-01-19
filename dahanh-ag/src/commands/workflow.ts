import chalk from "chalk";
import { Command } from "commander";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";

const GLOBAL_WORKFLOWS_DIR = join(homedir(), ".gemini", "antigravity", "global_workflows");

export const workflowCommand = new Command("workflow")
	.description("Quản lý và xem các quy trình làm việc (Global Workflows)")
	.alias("wf");

workflowCommand
	.command("list")
	.description("Liệt kê tất cả các workflows có sẵn")
	.action(async () => {
		try {
			const files = await readdir(GLOBAL_WORKFLOWS_DIR);
			const workflows = files
				.filter(f => f.endsWith(".md"))
				.map(f => f.replace(".md", ""));

			if (workflows.length === 0) {
				console.log(chalk.yellow("Chưa có workflow nào được cài đặt."));
				return;
			}

			console.log(chalk.cyan("\n--- DANH SÁCH WORKFLOWS ---"));
			workflows.forEach(wf => {
				console.log(`${chalk.green("•")} ${chalk.bold(wf)}`);
			});
			console.log(chalk.gray("\n(Dùng 'dahanh workflow show <name>' để xem chi tiết)"));
		} catch (error) {
			console.error(chalk.red("✗ Không thể đọc danh mục workflows"));
			process.exit(1);
		}
	});

workflowCommand
	.command("show")
	.description("Hiển thị nội dung chi tiết của một workflow")
	.argument("<name>", "Tên workflow (ví dụ: orchestrate, brainstorm)")
	.action(async (name: string) => {
		try {
			const filePath = join(GLOBAL_WORKFLOWS_DIR, `${name}.md`);
			const content = await readFile(filePath, "utf-8");

			console.log(chalk.cyan(`\n--- NỘI DUNG WORKFLOW: ${name.toUpperCase()} ---`));
			console.log(content);
			console.log(chalk.cyan("--- KẾT THÚC ---"));
		} catch (error) {
			console.error(chalk.red(`✗ Không tìm thấy workflow '${name}'`));
			process.exit(1);
		}
	});
