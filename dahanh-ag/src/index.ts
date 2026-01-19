#!/usr/bin/env bun
/**
 * Knowns.dev CLI
 * "What your AI should have knowns."
 *
 * Open-source CLI for dev teams
 * Tasks - Time - Sync
 */

import {
	agentsCommand,
	agCommand,
	boardCommand,
	browserCommand,
	configCommand,
	docCommand,
	initCommand,
	mcpCommand,
	searchCommand,
	syncCommand,
	taskCommand,
	timeCommand,
	workflowCommand,
} from "@commands/index";
import { notifyCliUpdate } from "@utils/update-notifier";
import chalk from "chalk";
import { Command } from "commander";
import packageJson from "../package.json";

// ASCII art banner for DA HANH AG
const BANNER = `
██████╗  █████╗     ██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗     █████╗  ██████╗ 
██╔══██╗██╔══██╗    ██║  ██║██╔══██╗████╗  ██║██║  ██║    ██╔══██╗██╔════╝ 
██║  ██║███████║    ███████║███████║██╔██╗ ██║███████║    ███████║██║  ███╗
██║  ██║██╔══██║    ██╔══██║██╔══██║██║╚██╗██║██╔══██║    ██╔══██║██║   ██║
██████╔╝██║  ██║    ██║  ██║██║  ██║██║ ╚████║██║  ██║    ██║  ██║╚██████╔╝
╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝ 
`;

function showBanner(): void {
	console.log(chalk.cyan(BANNER));
	console.log(chalk.bold("  DẠ HÀNH AG") + chalk.gray(` v${packageJson.version}`));
	console.log(chalk.gray('  "Bộ não thứ hai cho AI Agent của bạn."'));
	console.log();
	console.log(chalk.gray("  Trung Tâm Chỉ Huy Tối Thượng"));
	console.log(chalk.gray("  Tasks • Context • Agent • Wiki"));
	console.log();
	console.log(chalk.yellow("  Bắt đầu nhanh:"));
	console.log(chalk.gray("    dahanh setup          Khởi tạo dự án"));
	console.log(chalk.gray("    dahanh task list      Xem danh sách việc"));
	console.log(chalk.gray("    dahanh ag next        Tự động làm việc tiếp theo"));
	console.log(chalk.gray("    dahanh browser        Mở Bảng điều khiển Web"));
	console.log();
	console.log(chalk.gray("  Studio:    ") + chalk.cyan("Dạ Hành Studio"));
	console.log(chalk.gray("  Wiki:      ") + chalk.cyan("dahanh wiki (Sắp ra mắt)"));
	console.log();
}

const program = new Command();

program
	.name("dahanh")
	.description("Da Hanh AG - The Ultimate Agent Control Center")
	.version(packageJson.version)
	.enablePositionalOptions();

// Add commands
program.addCommand(initCommand);
program.addCommand(taskCommand);
program.addCommand(boardCommand);
program.addCommand(browserCommand);
program.addCommand(searchCommand);
program.addCommand(timeCommand);
program.addCommand(docCommand);
program.addCommand(configCommand);
program.addCommand(syncCommand);
program.addCommand(agentsCommand);
program.addCommand(agCommand);
program.addCommand(workflowCommand);
program.addCommand(mcpCommand);

// Show banner if no arguments provided
const args = process.argv.slice(2);

if (args.length === 0) {
	showBanner();
	await notifyCliUpdate({ currentVersion: packageJson.version, args });
} else {
	program.hook("postAction", async () => {
		await notifyCliUpdate({ currentVersion: packageJson.version, args });
	});
	await program.parseAsync();
}
