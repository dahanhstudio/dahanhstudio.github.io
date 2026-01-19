
import { mkdirSync, writeFileSync, appendFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TEMPLATES_DIR = "src/templates/skills";
const INDEX_FILE = join(TEMPLATES_DIR, "index.ts");

const AGENTS = {
    "architect": {
        description: "Quy trình thiết kế Agent: Multi-agent Patterns, Memory Systems, BDI Architecture & Hosted Agents.",
        content: `---
name: dahanh.architect
description: Quy trình thiết kế Agent: Multi-agent Patterns, Memory Systems, BDI Architecture & Hosted Agents.
---

# 🏗️ ARCHITECT AGENT WORKFLOW

1.  **Analyze Requirements**:
    - Identify Agent Scope.
    - Choose Architecture (ReAct, BDI, Swarm).

2.  **Design Memory System**:
    - Short-term (Context Window).
    - Long-term (Vector DB / RAG).
    - Entity Tracking.

3.  **Define Communication**:
    - Supervisor <-> Worker Protocol.
    - Handoff Mechanisms.

4.  **Output**:
    - Architecture Diagram (Mermaid).
    - System Spec.
`
    },
    "backend": {
        description: "Quy trình phát triển Backend: API, Cấu trúc dự án, Security & Coding Standards.",
        content: `---
name: dahanh.backend
description: Quy trình phát triển Backend: API, Cấu trúc dự án, Security & Coding Standards.
---

# 🔙 BACKEND AGENT WORKFLOW

1.  **API Design First**:
    - Define OpenAPI/Swagger Spec.
    - RESTful vs GraphQL decision.

2.  **Security Audit**:
    - Auth (JWT/OAuth).
    - Rate Limiting.
    - Input Validation (Zod).

3.  **Database**:
    - Schema Design (Prisma/TypeORM).
    - Migration Strategy.

4.  **Testing**:
    - Unit Tests (Vitest).
    - Integration Tests.
`
    },
    "frontend": {
        description: "Quy trình thiết kế & phát triển Frontend: UI/UX Premium, React Architecture, Anti-AI Slop.",
        content: `---
name: dahanh.frontend
description: Quy trình thiết kế & phát triển Frontend: UI/UX Premium, React Architecture, Anti-AI Slop.
---

# 🎨 FRONTEND AGENT WORKFLOW

1.  **Visual Design (VIP)**:
    - Glassmorphism / Neomorphism.
    - Animations (Framer Motion).
    - Tailwind CSS Typography.

2.  **React Architecture**:
    - Component Composition.
    - Custom Hooks Logic.
    - Context/Zustand State.

3.  **Performance**:
    - Code Splitting.
    - Image Optimization.
    - Web Vitals Check.
`
    },
    "creative": {
        description: "Quy trình sáng tạo nội dung: Visual Design, Algorithmic Art, Tool Design & Animation.",
        content: `---
name: dahanh.creative
description: Quy trình sáng tạo nội dung: Visual Design, Algorithmic Art, Tool Design & Animation.
---

# ✨ CREATIVE AGENT WORKFLOW

1.  **Brainstorming**:
    - Ideation Phase.
    - Moodboard Generation.

2.  **Asset Generation**:
    - Algorithmic Art (p5.js).
    - SVG / Canvas Graphics.
    - CSS Animations.

3.  **Polish**:
    - Aesthetic Review.
    - "Wow" Factor Verification.
`
    },
    "optimize": {
        description: "Quy trình tối ưu hóa: Context & Token Management.",
        content: `---
name: dahanh.optimize
description: Quy trình tối ưu hóa: Context & Token Management.
---

# ⚡ OPTIMIZE AGENT WORKFLOW

1.  **Context Audit**:
    - Measure Token Usage.
    - Identify Redundant Info.
    - Compress Prompts.

2.  **Performance Tuning**:
    - Reduce API Calls.
    - Cache Expensive Results.
    - Parallelize Requests.
`
    },
    "plan": {
        description: "Thiết kế tính năng và lập kế hoạch thực thi.",
        content: `---
name: dahanh.plan
description: Thiết kế tính năng và lập kế hoạch thực thi.
---

# 📝 PLANNING AGENT WORKFLOW

1.  **Requirement Extraction**:
    - What is the goal?
    - What are the constraints?

2.  **Breakdown**:
    - Phase 1: MVP.
    - Phase 2: Refinement.
    - Phase 3: Polish.

3.  **Implementation Plan**:
    - File-by-file changes.
    - Verification steps.
`
    },
    "verify": {
        description: "App Launch Verification & Quality Assurance.",
        content: `---
name: dahanh.verify
description: App Launch Verification & Quality Assurance.
---

# ✅ VERIFICATION AGENT WORKFLOW

1.  **Build Check**:
    - Does it compile?
    - Are types correct?

2.  **Runtime Check**:
    - Does the app launch?
    - Are there console errors?

3.  **Feature Audit**:
    - Walkthrough main user flows.
    - Verify Acceptance Criteria.
`
    },
    "recap": {
        description: "Tóm tắt dự án và trạng thái hiện tại.",
        content: `---
name: dahanh.recap
description: Tóm tắt dự án và trạng thái hiện tại.
---

# 🧠 RECAP AGENT WORKFLOW

1.  **Scan Context**:
    - Read \`task.md\`.
    - Check Git Status.
    - List recent artifacts.

2.  **Synthesize**:
    - Identify "Where are we?".
    - Identify "What's next?".

3.  **Report**:
    - Generate Executive Summary.
`
    }
};

async function inject() {
    console.log("Injecting Legion of Agents...");
    
    const imports: string[] = [];
    const exports: string[] = [];
    const arrayItems: string[] = [];

    for (const [key, data] of Object.entries(AGENTS)) {
        const folderName = `dahanh.${key}`;
        const dir = join(TEMPLATES_DIR, folderName);
        
        // 1. Create Directory
        mkdirSync(dir, { recursive: true });
        
        // 2. Create SKILL.md
        writeFileSync(join(dir, "SKILL.md"), data.content);
        console.log(`✓ Created ${folderName}/SKILL.md`);
        
        // 3. Prepare Index Updates
        const varName = `dahanh${key.charAt(0).toUpperCase() + key.slice(1)}Md`;
        const exportName = `SKILL_DAHANH_${key.toUpperCase()}`;
        
        imports.push(`import ${varName} from "./${folderName}/SKILL.md";`);
        exports.push(`export const ${exportName} = createSkill(${varName}, "${folderName}");`);
        arrayItems.push(exportName);
    }
    
    // 4. Update index.ts (Quick & Dirty Append - manual cleanup might be needed but this gets code in)
    // Actually, let's just print the code blocks to append, simpler for the agent to use replace_file_content
    
    console.log("\nCopy these imports to index.ts:");
    console.log(imports.join("\n"));
    
    console.log("\nCopy these exports to index.ts:");
    console.log(exports.join("\n"));
    
    console.log("\nAdd these to SKILLS array:");
    console.log(arrayItems.join(",\n"));
}

inject();
