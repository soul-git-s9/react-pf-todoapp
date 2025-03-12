import { useState, useEffect } from "react";
import { Trash2, CheckCircle } from "lucide-react";

interface Task {
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (): void => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (index: number): void => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (index: number): void => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">📝 일정 관리</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="할 일을 입력하세요..."
          className="border p-2 w-full"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          추가
        </button>
      </div>
      <div>
        {tasks.map((t, index) => (
          <div key={index} className="flex justify-between items-center p-2 mb-2 border rounded">
            <span className={t.completed ? "line-through text-gray-500" : ""}>{t.text}</span>
            <div className="flex gap-2">
              <CheckCircle
                className="cursor-pointer text-green-500"
                onClick={() => toggleTask(index)}
              />
              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => deleteTask(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}