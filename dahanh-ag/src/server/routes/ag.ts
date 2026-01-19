import { Router } from "express";
import { spawn } from "node:child_process";
import { join } from "node:path";
import { FileStore } from "../../storage/file-store";

export function createAgRoutes(ctx: { store: FileStore }): Router {
	const router = Router();
	const { store } = ctx;

	// POST /api/ag/dispatch - Execute an ag request command directly in the terminal
	router.post("/dispatch", async (req, res) => {
		try {
			const { taskId, workflow } = req.body;

			if (!taskId) {
				return res.status(400).json({ error: "Missing taskId" });
			}

			// In a real production app, we would use more robust path discovery
			// For this specialized integration, we run the ag request command
			console.log(`[Server] Dispatching task ${taskId} with workflow ${workflow || 'default'}...`);

			const args = ['tsx', 'src/index.ts', 'ag', 'request', taskId];
			if (workflow) {
				args.push('--workflow', workflow);
			}

			// Spawn as a detached process but with stdio inherit to show on the server's terminal
			// Use npx to ensure tsx is available
			const child = spawn('npx', args, {
				cwd: process.cwd(),
				stdio: 'inherit',
				shell: true,
				env: { ...process.env, CHALK_LEVEL: '3' } // Force colors
			});

			res.json({ 
				success: true, 
				message: `Dispatch command sent to terminal for task ${taskId}` 
			});

		} catch (error) {
			console.error("[Server] Dispatch error:", error);
			res.status(500).json({ error: String(error) });
		}
	});

	return router;
}
