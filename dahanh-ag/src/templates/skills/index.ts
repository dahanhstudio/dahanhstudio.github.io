/**
 * Knowns Skills Module
 *
 * Built-in skills for Claude Code integration.
 * Skills are workflow templates that can be invoked via /knowns.<skill> commands.
 *
 * Structure follows superpowers pattern:
 * - Each skill is in a subfolder with SKILL.md
 * - Frontmatter contains name and description
 * - Content is the skill instructions
 */

import dahanhCommitMd from "./dahanh.commit/SKILL.md";
import dahanhDocMd from "./dahanh.doc/SKILL.md";
import dahanhInitMd from "./dahanh.init/SKILL.md";
import dahanhResearchMd from "./dahanh.research/SKILL.md";
import dahanhTaskBrainstormMd from "./dahanh.task.brainstorm/SKILL.md";
import dahanhTaskExtractMd from "./dahanh.task.extract/SKILL.md";
import dahanhTaskMd from "./dahanh.task/SKILL.md";
import dahanhTaskReopenMd from "./dahanh.task.reopen/SKILL.md";
// Dahanh Agents
import dahanhArchitectMd from "./dahanh.architect/SKILL.md";
import dahanhBackendMd from "./dahanh.backend/SKILL.md";
import dahanhFrontendMd from "./dahanh.frontend/SKILL.md";
import dahanhCreativeMd from "./dahanh.creative/SKILL.md";
import dahanhOptimizeMd from "./dahanh.optimize/SKILL.md";
import dahanhPlanMd from "./dahanh.plan/SKILL.md";
import dahanhVerifyMd from "./dahanh.verify/SKILL.md";
import dahanhRecapMd from "./dahanh.recap/SKILL.md";
/**
 * Skill definition
 */
export interface Skill {
	/** Skill name (e.g., "dahanh.task") */
	name: string;
	/** Folder name for .dahanh/skills/ */
	folderName: string;
	/** Skill description */
	description: string;
	/** Full skill content (markdown with frontmatter) */
	content: string;
}

/**
 * Parse skill frontmatter to extract name and description
 */
function parseSkillFrontmatter(content: string): { name: string; description: string } {
	const lines = content.trim().split("\n");
	let name = "";
	let description = "";

	if (lines[0] === "---") {
		for (let i = 1; i < lines.length; i++) {
			if (lines[i] === "---") break;

			const nameMatch = lines[i].match(/^name:\s*(.+)$/);
			if (nameMatch) name = nameMatch[1].trim();

			const descMatch = lines[i].match(/^description:\s*(.+)$/);
			if (descMatch) description = descMatch[1].trim();
		}
	}

	return { name, description };
}

/**
 * Create skill object from markdown content
 */
function createSkill(content: string, folderName: string): Skill {
	const { name, description } = parseSkillFrontmatter(content);
	return {
		name: name || folderName,
		folderName,
		description,
		content: content.trim(),
	};
}
// Export Dahanh Agents
export const SKILL_DAHANH_ARCHITECT = createSkill(dahanhArchitectMd, "dahanh.architect");
export const SKILL_DAHANH_BACKEND = createSkill(dahanhBackendMd, "dahanh.backend");
export const SKILL_DAHANH_FRONTEND = createSkill(dahanhFrontendMd, "dahanh.frontend");
export const SKILL_DAHANH_CREATIVE = createSkill(dahanhCreativeMd, "dahanh.creative");
export const SKILL_DAHANH_OPTIMIZE = createSkill(dahanhOptimizeMd, "dahanh.optimize");
export const SKILL_DAHANH_PLAN = createSkill(dahanhPlanMd, "dahanh.plan");
export const SKILL_DAHANH_VERIFY = createSkill(dahanhVerifyMd, "dahanh.verify");
export const SKILL_DAHANH_RECAP = createSkill(dahanhRecapMd, "dahanh.recap");

export const SKILL_TASK = createSkill(dahanhTaskMd, "dahanh.task");
export const SKILL_TASK_BRAINSTORM = createSkill(dahanhTaskBrainstormMd, "dahanh.task.brainstorm");
export const SKILL_TASK_REOPEN = createSkill(dahanhTaskReopenMd, "dahanh.task.reopen");
export const SKILL_TASK_EXTRACT = createSkill(dahanhTaskExtractMd, "dahanh.task.extract");
export const SKILL_DOC = createSkill(dahanhDocMd, "dahanh.doc");
export const SKILL_COMMIT = createSkill(dahanhCommitMd, "dahanh.commit");
export const SKILL_INIT = createSkill(dahanhInitMd, "dahanh.init");
export const SKILL_RESEARCH = createSkill(dahanhResearchMd, "dahanh.research");

/**
 * All built-in skills
 */
export const SKILLS: Skill[] = [
    // Dahanh Agents (The Legion)
    SKILL_DAHANH_ARCHITECT,
    SKILL_DAHANH_BACKEND,
    SKILL_DAHANH_FRONTEND,
    SKILL_DAHANH_CREATIVE,
    SKILL_DAHANH_OPTIMIZE,
    SKILL_DAHANH_PLAN,
    SKILL_DAHANH_VERIFY,
    SKILL_DAHANH_RECAP,
    
	// Task skills
	SKILL_TASK,
	SKILL_TASK_BRAINSTORM,
	SKILL_TASK_REOPEN,
	SKILL_TASK_EXTRACT,
	// Doc skills
	SKILL_DOC,
	// Git skills
	SKILL_COMMIT,
	// Session skills
	SKILL_INIT,
	SKILL_RESEARCH,
];

/**
 * Get skill by name
 */
export function getSkill(name: string): Skill | undefined {
	return SKILLS.find((s) => s.name === name);
}

/**
 * Get skill by folder name
 */
export function getSkillByFolder(folderName: string): Skill | undefined {
	return SKILLS.find((s) => s.folderName === folderName);
}

/**
 * Get all skill names
 */
export function getSkillNames(): string[] {
	return SKILLS.map((s) => s.name);
}

export default SKILLS;
