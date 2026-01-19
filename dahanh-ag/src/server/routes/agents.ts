import { Router } from "express";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";

const AGENTS_DIR = join(homedir(), ".agent");

export function createAgentRoutes(): Router {
	const router = Router();

	router.get("/", async (req, res) => {
		try {
            // Scan base dir and agents subdir
            const dirs = [AGENTS_DIR, join(AGENTS_DIR, "agents")];
            const allAgents: any[] = [];

            for (const dir of dirs) {
                if (!existsSync(dir)) continue;
                
                const files = await readdir(dir);
                const agentFiles = files.filter(f => f.endsWith(".md"));

                const agents = await Promise.all(agentFiles.map(async f => {
                    const content = await readFile(join(dir, f), "utf-8");
                    const match = content.match(/^# (.*)/);
                    const title = match ? match[1] : f.replace(".md", "");
                    
                    return {
                        id: f.replace(".md", ""),
                        name: title,
                        file: f,
                        path: join(dir, f)
                    };
                }));
                allAgents.push(...agents);
            }

            // De-duplicate by ID
            const uniqueAgents = Array.from(new Map(allAgents.map(a => [a.id, a])).values());
			res.json(uniqueAgents);
		} catch (error) {
			res.status(500).json({ error: "Failed to list agents" });
		}
	});

	router.get("/:id", async (req, res) => {
		try {
			const { id } = req.params;
			let filePath = join(AGENTS_DIR, `${id}.md`);
            
            if (!existsSync(filePath)) {
                filePath = join(AGENTS_DIR, "agents", `${id}.md`);
            }

            if (!existsSync(filePath)) {
                return res.status(404).json({ error: "Agent not found" });
            }

			const content = await readFile(filePath, "utf-8");
			res.json({ id, content });
		} catch (error) {
			res.status(404).json({ error: "Agent not found" });
		}
	});

	return router;
}
