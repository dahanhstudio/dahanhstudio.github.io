import { useEffect, useState } from "react";
import { Bot, FileText, Send, User, ChevronRight } from "lucide-react";
import { api } from "../api/client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Separator } from "@/ui/components/ui/separator";
import { ScrollArea } from "@/ui/components/ui/scroll-area";
import { Badge } from "@/ui/components/ui/badge";

interface Agent {
	id: string;
	name: string;
	file: string;
	path: string;
}

export function AgentsPage() {
	const [agents, setAgents] = useState<Agent[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
	const [agentContent, setAgentContent] = useState<string>("");

	useEffect(() => {
		fetchAgents();
	}, []);

	const fetchAgents = async () => {
		try {
			// Using direct fetch for local agents API since client might not have it yet
			const response = await fetch("/api/agents");
			const data = await response.json();
			setAgents(data);
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch agents:", error);
			setLoading(false);
		}
	};

	const fetchAgentDetail = async (agent: Agent) => {
		try {
			const response = await fetch(`/api/agents/${agent.id}`);
			const data = await response.json();
			setAgentContent(data.content);
			setSelectedAgent(agent);
		} catch (error) {
			console.error("Failed to fetch agent detail:", error);
		}
	};

	return (
		<div className="flex h-full flex-col p-6 space-y-6 animate-in fade-in duration-500">
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
					<Bot className="h-8 w-8 text-indigo-400" />
					Lực lượng Đặc nhiệm (Agents)
				</h1>
				<p className="text-gray-400 mt-2">
					Danh sách các AI Agents độc lập đã được triển khai trong hệ thống.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 overflow-hidden">
				{/* Agent List */}
				<Card className="md:col-span-1 border-white/10 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col">
					<CardHeader className="p-4 border-b border-white/5">
						<CardTitle className="text-sm font-medium text-gray-300">Danh Mục Agents</CardTitle>
					</CardHeader>
					<ScrollArea className="flex-1">
						<div className="p-2 space-y-1">
							{loading ? (
								<div className="flex items-center justify-center p-8">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
								</div>
							) : agents.length === 0 ? (
								<div className="text-center p-8 text-gray-500 text-sm italic">
									Chưa có agent nào.
								</div>
							) : (
								agents.map((agent) => (
									<button
										key={agent.id}
										onClick={() => fetchAgentDetail(agent)}
										className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center justify-between group ${
											selectedAgent?.id === agent.id
												? "bg-indigo-500/20 text-indigo-300"
												: "text-gray-400 hover:bg-white/5 hover:text-white"
										}`}
									>
										<div className="flex items-center gap-2">
											<User className={`h-4 w-4 ${selectedAgent?.id === agent.id ? "text-indigo-400" : "text-gray-500"}`} />
											<span className="truncate">{agent.name}</span>
										</div>
										<ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${selectedAgent?.id === agent.id ? "opacity-100" : ""}`} />
									</button>
								))
							)}
						</div>
					</ScrollArea>
				</Card>

				{/* Agent Detail View */}
				<Card className="md:col-span-3 border-white/10 bg-black/40 backdrop-blur-lg overflow-hidden flex flex-col">
					{selectedAgent ? (
						<>
							<CardHeader className="pb-4 border-b border-white/5 bg-white/5">
								<div className="flex items-center justify-between">
									<div className="space-y-1">
										<CardTitle className="text-2xl text-white flex items-center gap-3">
											<Bot className="h-6 w-6 text-indigo-400" />
											{selectedAgent.name}
										</CardTitle>
										<CardDescription className="text-gray-400 flex items-center gap-2">
											<Badge variant="outline" className="border-indigo-500/50 text-indigo-300 bg-indigo-500/5 font-mono text-[10px]">
												{selectedAgent.id}.md
											</Badge>
											<span>{selectedAgent.path}</span>
										</CardDescription>
									</div>
									<div className="flex gap-2">
										<Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300">
											<FileText className="h-4 w-4 mr-2" />
											Mở File
										</Button>
									</div>
								</div>
							</CardHeader>
							<ScrollArea className="flex-1 p-6">
								<div className="prose prose-invert prose-sm max-w-none">
									<pre className="p-4 rounded-lg bg-black/50 border border-white/5 font-mono text-xs leading-relaxed text-gray-300 whitespace-pre-wrap">
										{agentContent}
									</pre>
								</div>
							</ScrollArea>
						</>
					) : (
						<div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-500 space-y-4">
							<div className="p-6 rounded-full bg-white/5 border border-white/5 animate-pulse">
								<Bot className="h-12 w-12 text-white/20" />
							</div>
							<div className="space-y-2">
								<h3 className="text-lg font-medium text-white/40">Chọn một Agent</h3>
								<p className="text-sm max-w-xs text-white/20">
									Vui lòng chọn một agent từ danh sách bên trái để xem hồ sơ năng lực và định hướng chuyên môn.
								</p>
							</div>
						</div>
					)}
				</Card>
			</div>
		</div>
	);
}
