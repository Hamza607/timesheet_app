import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";

type TimesheetEntry = {
  id: number | string;
  date: string;
  project: string;
  task: string;
  hours: number;
};

type AddEntryModalProps = {
  date: string;
  onClose: () => void;
  onAdd: (entry: TimesheetEntry) => void;
};

export default function AddEntryModal({
  date,
  onClose,
  onAdd,
}: AddEntryModalProps) {
  const [project, setProject] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("Bug fixes");
  const [task, setTask] = useState("");
  const [hours, setHours] = useState(12);

  function handleAddEntry() {
    if (!project || !task.trim()) {
      return;
    }

    const newEntry: TimesheetEntry = {
      id: Date.now(),
      date,
      project,
      task: `${typeOfWork}: ${task}`,
      hours,
    };

    onAdd(newEntry);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-130 rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Entry</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-5 py-4">
          {/* Project */}
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              Select Project <span className="text-gray-400">ⓘ</span>
            </label>

            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Project Name</option>
              <option value="Website Redesign">Website Redesign</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Internal Dashboard">Internal Dashboard</option>
            </select>
          </div>

          {/* Type of Work */}
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
              Type of Work <span className="text-gray-400">ⓘ</span>
            </label>

            <select
              value={typeOfWork}
              onChange={(e) => setTypeOfWork(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Bug fixes">Bug fixes</option>
              <option value="Feature Development">Feature Development</option>
              <option value="Design">Design</option>
              <option value="Testing">Testing</option>
              <option value="Documentation">Documentation</option>
            </select>
          </div>

          {/* Task Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Task description <span className="text-red-500">*</span>
            </label>

            <textarea
              rows={5}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Write text here ..."
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-gray-400">A note for extra info</p>
          </div>

          {/* Hours */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Hours <span className="text-red-500">*</span>
            </label>

            <div className="flex w-fit items-center overflow-hidden rounded-md border border-gray-300">
              <button
                type="button"
                onClick={() => setHours((prev) => Math.max(0, prev - 1))}
                className="flex h-9 w-9 items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                <Minus size={14} />
              </button>

              <div className="flex h-9 w-12 items-center justify-center border-x text-sm font-medium text-gray-700">
                {hours}
              </div>

              <button
                type="button"
                onClick={() => setHours((prev) => prev + 1)}
                className="flex h-9 w-9 items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t px-5 py-4">
          <button
            type="button"
            onClick={handleAddEntry}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Entry
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}