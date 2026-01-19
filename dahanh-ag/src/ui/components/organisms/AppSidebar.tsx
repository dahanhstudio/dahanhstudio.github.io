import {
	LayoutDashboard,
	ListTodo,
	FileText,
	Settings,
	Search,
	Bot,
} from "lucide-react";

import logoImage from "../../public/logo.png";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarFooter,
	useSidebar,
} from "@/ui/components/ui/sidebar";
import { useIsMobile } from "@/ui/hooks/use-mobile";

interface AppSidebarProps {
	currentPage: string;
	onSearchClick: () => void;
}

const menuItems = [
	{
		id: "kanban",
		label: "Bảng việc",
		icon: LayoutDashboard,
		href: "#/",
	},
	{
		id: "tasks",
		label: "Danh sách",
		icon: ListTodo,
		href: "#/tasks",
	},
	{
		id: "agents",
		label: "Agents",
		icon: Bot,
		href: "#/agents",
	},
	{
		id: "docs",
		label: "Tài liệu",
		icon: FileText,
		href: "#/docs",
	},
];

export function AppSidebar({
	currentPage,
	onSearchClick,
}: AppSidebarProps) {
	const { state } = useSidebar();
	const isMobile = useIsMobile();
	const isExpanded = state === "expanded";

	return (
		<Sidebar collapsible="icon" variant={isMobile ? "floating" : "sidebar"} className="sidebar-glass border-r-0">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild className="hover:bg-white/10 text-white">
							<a href="#/">
								<img
									src={logoImage}
									alt="Da Hanh"
									className="size-8 rounded-lg object-contain"
								/>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-bold tracking-wide">DẠ HÀNH AG</span>
									<span className="truncate text-xs opacity-70">Trung Tâm Chỉ Huy</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>

				{/* Search Button */}
				{isExpanded && (
					<div className="px-2 pb-2">
						<button
							type="button"
							onClick={onSearchClick}
							className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
						>
							<Search className="h-4 w-4" />
							<span>Tìm kiếm...</span>
							<kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-black/20 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
								<span className="text-xs">⌘</span>K
							</kbd>
						</button>
					</div>
				)}
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-gray-400">Điều hướng</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => {
								const isActive = currentPage === item.id;
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton asChild isActive={isActive} tooltip={item.label} className={isActive ? "bg-indigo-500/20 text-indigo-300 font-medium" : "text-gray-300 hover:bg-white/5 hover:text-white"}>
											<a href={item.href}>
												<item.icon />
												<span>{item.label}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
                            {/* Wiki Shortcut */}
                            <SidebarMenuItem key="wiki">
                                <SidebarMenuButton asChild isActive={currentPage === "wiki"} tooltip="Bách khoa toàn thư" className="text-amber-300 hover:bg-amber-500/10 hover:text-amber-200">
                                    <a href="#/wiki">
                                        <FileText className="text-amber-400" />
                                        <span>Bách khoa thư (Wiki)</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={currentPage === "config"}
							tooltip="Settings"
                            className="text-gray-400 hover:text-white hover:bg-white/5"
						>
							<a href="#/config">
								<Settings />
								<span>Cấu hình</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>

				{/* Version */}
				{isExpanded && (
					<div className="px-3 py-2 text-xs text-gray-500">
						<div className="flex items-center justify-between">
							<span className="font-mono opacity-50">{import.meta.env.APP_VERSION}</span>
                            <span className="text-[10px] uppercase tracking-wider opacity-30">Studio Core</span>
						</div>
					</div>
				)}
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
