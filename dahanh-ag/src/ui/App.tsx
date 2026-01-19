import { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "../models/task";
import { api } from "./api/client";
import { SSEProvider, useSSEEvent } from "./contexts/SSEContext";
import { AppSidebar, TaskCreateForm, SearchCommandDialog, NotificationBell } from "./components/organisms";
import { ConnectionStatus, ThemeToggle } from "./components/atoms";
import { HeaderTimeTracker } from "./components/molecules";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Separator } from "./components/ui/separator";
import { Toaster } from "./components/ui/sonner";
import { ConfigProvider, useConfig } from "./contexts/ConfigContext";
import { UserProvider } from "./contexts/UserContext";
import { UIPreferencesProvider } from "./contexts/UIPreferencesContext";
import { TimeTrackerProvider } from "./contexts/TimeTrackerContext";
import ConfigPage from "./pages/ConfigPage";
import DocsPage from "./pages/DocsPage";
import KanbanPage from "./pages/KanbanPage";
import TasksPage from "./pages/TasksPage";
import { AgentsPage } from "./pages/AgentsPage";
import { EncyclopediaPage } from "./pages/EncyclopediaPage";

// Dark mode context
interface ThemeContextType {
	isDark: boolean;
	toggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
	isDark: false,
	toggle: () => {},
});

// Extend Document interface for View Transitions API
declare global {
	interface Document {
		startViewTransition?: (callback: () => void) => {
			ready: Promise<void>;
			finished: Promise<void>;
		};
	}
}

export const useTheme = () => useContext(ThemeContext);

function AppContent() {
	const { config } = useConfig();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showCommandDialog, setShowCommandDialog] = useState(false);
	const [isDark, setIsDark] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("theme");
			if (saved) return saved === "dark";
			return window.matchMedia("(prefers-color-scheme: dark)").matches;
		}
		return false;
	});

	// Get current route from hash
	const getCurrentRoute = () => {
		const hash = window.location.hash.slice(1); // Remove #
		if (hash.startsWith("/tasks")) return "tasks";
		if (hash.startsWith("/docs")) return "docs";
		if (hash.startsWith("/config")) return "config";
		if (hash.startsWith("/kanban")) return "kanban";
		if (hash.startsWith("/agents")) return "agents";
		if (hash.startsWith("/wiki")) return "wiki";
		if (hash === "/" || hash === "") return "kanban";
		return "kanban"; // default
	};

	// Extract task ID from hash (e.g., #/tasks/42, #/kanban/42, or #/tasks?id=42)
	const getTaskIdFromHash = (page?: string): string | null => {
		const hash = window.location.hash.slice(1);

		// Support both /tasks/42, /kanban/42 and /tasks?id=42 formats
		const prefix = page || "(?:kanban|tasks)";
		const match =
			hash.match(new RegExp(`^\/${prefix}\/([^?]+)`)) || hash.match(/[?&]id=([^&]+)/);
		return match ? match[1] : null;
	};

	const [currentPage, setCurrentPage] = useState(getCurrentRoute());
	const [currentHash, setCurrentHash] = useState(window.location.hash);

	// Listen to hash changes for routing
	useEffect(() => {
		const handleHashChange = () => {
			setCurrentPage(getCurrentRoute());
			setCurrentHash(window.location.hash);
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, [getCurrentRoute]);

	// Apply dark mode class to document
	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	// Keyboard shortcut for command dialog (⌘K / Ctrl+K)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setShowCommandDialog((prev) => !prev);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Initial tasks load
	useEffect(() => {
		api
			.getTasks()
			.then((data) => {
				setTasks(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load tasks:", err);
				setLoading(false);
			});
	}, []);

	// Subscribe to SSE events for real-time task updates
	useSSEEvent("tasks:updated", ({ task }) => {
		setTasks((prevTasks) => {
			const existingIndex = prevTasks.findIndex((t) => t.id === task.id);
			if (existingIndex >= 0) {
				// Update existing task
				const newTasks = [...prevTasks];
				newTasks[existingIndex] = task;
				return newTasks;
			}
			// Add new task
			return [...prevTasks, task];
		});
	});

	// Subscribe to tasks:refresh for bulk operations
	useSSEEvent("tasks:refresh", () => {
		api.getTasks().then(setTasks).catch(console.error);
	});

	const handleTaskCreated = () => {
		api.getTasks().then(setTasks).catch(console.error);
	};

	const handleTasksUpdate = (updatedTasks: Task[]) => {
		setTasks(updatedTasks);
	};

	const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
		const newIsDark = !isDark;

		// Check if View Transitions API is supported
		if (
			!document.startViewTransition ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			setIsDark(newIsDark);
			return;
		}

		// Get click position for circular reveal
		const x = event.clientX;
		const y = event.clientY;

		// Calculate the maximum radius needed to cover the entire screen
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);

		// Start the view transition
		const transition = document.startViewTransition(() => {
			setIsDark(newIsDark);
		});

		// Wait for the transition to be ready
		await transition.ready;

		// Animate the NEW view expanding from click position
		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${endRadius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration: 400,
				easing: "ease-out",
				pseudoElement: "::view-transition-new(root)",
			},
		);
	};

	// Handle search task select
	const handleSearchTaskSelect = (task: Task) => {
		// Navigate to kanban view with task detail
		window.location.hash = `/kanban/${task.id}`;
		// State will be updated via hashchange listener
	};

	// Handle search doc select
	const handleSearchDocSelect = (doc?: { path?: string; filename?: string }) => {
		// Update URL hash to /docs/path
		if (doc?.path) {
			window.location.hash = `/docs/${doc.path}`;
		} else if (doc?.filename) {
			window.location.hash = `/docs/${doc.filename}`;
		} else {
			window.location.hash = "/docs";
		}
	};

	// Render current page
	const renderPage = () => {
		switch (currentPage) {
			case "kanban":
				return (
					<KanbanPage
						tasks={tasks}
						loading={loading}
						onTasksUpdate={handleTasksUpdate}
						onNewTask={() => setShowCreateForm(true)}
					/>
				);
			case "tasks": {
				// Get task ID from hash
				const taskId = getTaskIdFromHash();
				const selectedTask = taskId ? tasks.find((t) => t.id === taskId) : null;

				return (
					<TasksPage
						tasks={tasks}
						loading={loading}
						onTasksUpdate={handleTaskCreated}
						selectedTask={selectedTask}
						onTaskClose={() => {
							// Clear task ID from hash, keep on /tasks page
							window.location.hash = "/tasks";
						}}
						onNewTask={() => setShowCreateForm(true)}
					/>
				);
			}
			case "agents":
				return <AgentsPage />;
			case "docs":
				return <DocsPage />;
			case "config":
				return <ConfigPage />;
			case "wiki":
				return <EncyclopediaPage />;
			default:
				return (
					<KanbanPage
						tasks={tasks}
						loading={loading}
						onTasksUpdate={handleTasksUpdate}
						onNewTask={() => setShowCreateForm(true)}
					/>
				);
		}
	};

	// 🌅 DAY/NIGHT CYCLE LOGIC 🌙
	useEffect(() => {
		const updateTimeAwareBackground = () => {
			const hour = new Date().getHours();
			const isNight = hour >= 18 || hour < 6;
			
			const bgDay = "url('https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2832&auto=format&fit=crop')";
			const bgNight = "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2832&auto=format&fit=crop')";
			
			// Apply directly to body to cover full screen
			document.body.style.backgroundImage = isNight ? bgNight : bgDay;
		};

		updateTimeAwareBackground();
		const interval = setInterval(updateTimeAwareBackground, 60000);
		
		// Force dark mode for VIP look
		if (!isDark) {
			setIsDark(true);
		}
		
		// Add bg-forest class to body
		document.body.classList.add("bg-forest", "flex", "items-center", "justify-center", "bg-black", "overflow-hidden");
		
		return () => clearInterval(interval);
	}, []);

	return (
		<ThemeContext.Provider value={{ isDark, toggle: toggleTheme }}>
			
			{/* 🌟 STAR BORDER TRACK 🌟 */}
			<div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
				<div className="relative w-[95%] max-w-[1600px] h-[90vh]">
					<div className="border-track rounded-[1.6rem]">
						<div className="star-spinner"></div>
					</div>
				</div>
			</div>

			<div className="glass-panel w-full max-w-[1600px] h-[90vh] mx-auto z-10 p-0">
			<SidebarProvider className="w-full h-full">
				<AppSidebar
					currentPage={currentPage}
					onSearchClick={() => setShowCommandDialog(true)}
				/>
				<main className="flex flex-1 flex-col bg-transparent overflow-hidden h-full relative">
					{/* Header with Trigger */}
					<header className="flex h-12 shrink-0 items-center gap-2 border-b border-white/5 bg-transparent px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4 opacity-20" />
						<ConnectionStatus />
						<div className="flex flex-1 items-center gap-2 text-sm">
							<span className="font-semibold text-white">
								{config.name || "Da Hanh AG"}
							</span>
						</div>
						<HeaderTimeTracker
							onTaskClick={(taskId) => {
								window.location.hash = `/kanban/${taskId}`;
							}}
						/>
						<ThemeToggle isDark={isDark} onToggle={toggleTheme} size="sm" />
						<NotificationBell />
					</header>

					{/* Page Content */}
					<div className="flex-1 w-full overflow-y-auto overflow-x-hidden bg-white/[0.02]">{renderPage()}</div>
				</main>

				{/* Task Create Form Modal */}
				<TaskCreateForm
					isOpen={showCreateForm}
					allTasks={tasks}
					onClose={() => setShowCreateForm(false)}
					onCreated={handleTaskCreated}
				/>

			{/* Command Dialog (⌘K Search) */}
			<SearchCommandDialog
				open={showCommandDialog}
				onOpenChange={setShowCommandDialog}
				onTaskSelect={handleSearchTaskSelect}
				onDocSelect={handleSearchDocSelect}
			/>
			</SidebarProvider>
			</div>
			<Toaster />
		</ThemeContext.Provider>
	);

}

export default function App() {
	return (
		<ConfigProvider>
			<UserProvider>
				<UIPreferencesProvider>
					<SSEProvider>
						<TimeTrackerProvider>
							<AppContent />
						</TimeTrackerProvider>
					</SSEProvider>
				</UIPreferencesProvider>
			</UserProvider>
		</ConfigProvider>
	);
}
