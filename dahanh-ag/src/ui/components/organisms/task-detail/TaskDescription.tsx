import { useState, useEffect } from "react";
import { AlignLeft } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { BlockNoteEditor, MDRender } from "../../editor";
import type { Task } from "../../../models/task";

interface TaskDescriptionProps {
	task: Task;
	onSave: (updates: Partial<Task>) => Promise<void>;
	saving: boolean;
}

export function TaskDescription({ task, onSave, saving }: TaskDescriptionProps) {
	const [editing, setEditing] = useState(false);
	const [description, setDescription] = useState(task.description || "");

	useEffect(() => {
		setDescription(task.description || "");
	}, [task.description]);

	const handleSave = () => {
		if (description !== task.description) {
			onSave({ description: description || undefined });
		}
		setEditing(false);
	};

	const handleCancel = () => {
		setDescription(task.description || "");
		setEditing(false);
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-base">
					<AlignLeft className="w-4 h-4" />
					Mô tả
				</CardTitle>
			</CardHeader>
			<CardContent>
				{editing ? (
					<div className="space-y-3">
						<BlockNoteEditor
							markdown={description}
							onChange={setDescription}
							placeholder="Thêm mô tả chi tiết..."
							readOnly={saving}
						/>
						<div className="flex gap-2">
							<Button size="sm" onClick={handleSave} disabled={saving}>
								Lưu
							</Button>
							<Button size="sm" variant="ghost" onClick={handleCancel}>
								Hủy
							</Button>
						</div>
					</div>
				) : (
					<div
						className="min-h-[60px] p-3 rounded-md border border-dashed cursor-pointer hover:border-primary hover:bg-accent/50 transition-colors"
						onClick={() => setEditing(true)}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => e.key === "Enter" && setEditing(true)}
					>
						{task.description ? (
							<MDRender markdown={task.description} className="text-sm prose prose-sm dark:prose-invert max-w-none" />
						) : (
							<span className="text-muted-foreground text-sm italic">
								Nhấn để thêm mô tả...
							</span>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
