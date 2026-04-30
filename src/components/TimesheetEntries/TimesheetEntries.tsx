import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Plus } from "lucide-react";

import AddEntryModal from "../Modals/AddEntryModal";
import type { Timesheet, TimesheetEntry } from "../../types/timesheet";
import { useTimesheetEntries } from "./hooks/useTimesheetEntries";
import { useTimesheetWeekDays } from "./hooks/useTimesheetWeekDays";
import { useTimesheetProgress } from "./hooks/useTimesheetProgress";

type TimesheetEntriesProps = {
  timesheetId?: string;
  timesheet?: Timesheet;
};

export default function TimesheetEntries({
  timesheetId,
  timesheet,
}: TimesheetEntriesProps) {
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState<number | string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const activeTimesheetId = timesheet?.id || timesheetId;

  const { entries, groupedEntries, loading, error, addEntry } =
    useTimesheetEntries(activeTimesheetId);

  const weekDays = useTimesheetWeekDays(timesheet, entries);

  const { totalHours, maxHours, progress } = useTimesheetProgress(entries);

  function handleOpenAddModal(date: string) {
    setSelectedDate(date);
    setIsAddModalOpen(true);
  }

  function handleAddEntry(entry: TimesheetEntry) {
    addEntry(entry);
    setIsAddModalOpen(false);
    setSelectedDate(null);
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-600">Loading entries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => navigate("/timesheets")}
          className="mt-4 font-medium text-blue-600 hover:text-blue-800"
        >
          Back to timesheets
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-3 max-w-7xl rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:mx-4 sm:p-6 lg:mx-auto">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/timesheets")}
              className="mb-3 text-sm text-blue-600 hover:text-blue-800"
            >
              ← Back to timesheets
            </button>

            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
              This week’s timesheet
            </h2>

            {timesheet?.weekStart && timesheet?.weekEnd ? (
              <p className="mt-2 text-sm text-gray-500">
                {formatDate(timesheet.weekStart)} -{" "}
                {formatDate(timesheet.weekEnd)}
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                Timesheet #{activeTimesheetId}
              </p>
            )}
          </div>

          <div className="w-full sm:w-36">
            <div className="mb-2 flex justify-between text-xs text-gray-700">
              <span>
                {totalHours}/{maxHours} hrs
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-orange-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {weekDays.length === 0 ? (
            <p className="text-gray-500">No entries found.</p>
          ) : (
            weekDays.map((day) => {
              const dayEntries = groupedEntries[day.raw] || [];

              return (
                <div
                  key={day.raw}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-[80px_1fr] sm:gap-4"
                >
                  <div className="text-sm font-semibold text-gray-800 sm:pt-2">
                    {day.label}
                  </div>

                  <div className="space-y-2">
                    {dayEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="relative flex flex-col gap-3 rounded-md border border-gray-200 px-3 py-3 transition hover:border-blue-300 sm:flex-row sm:items-center sm:justify-between sm:py-2"
                      >
                        <div className="wrap-break-word text-sm font-medium text-gray-900">
                          {entry.task}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="whitespace-nowrap text-xs text-gray-400">
                            {entry.hours} hrs
                          </span>

                          <span className="max-w-full truncate rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                            {entry.project}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === entry.id ? null : entry.id,
                              )
                            }
                            className="ml-auto text-gray-400 hover:text-gray-700 sm:ml-0"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </div>

                        {openMenuId === entry.id && (
                          <div className="absolute right-3 top-10 z-10 w-24 rounded-md border border-gray-200 bg-white py-1 shadow-md sm:top-9">
                            <button className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                              Edit
                            </button>

                            <button className="block w-full px-3 py-1.5 text-left text-sm text-red-500 hover:bg-red-50">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleOpenAddModal(day.raw)}
                      className="flex w-full items-center justify-center gap-1 rounded-md border border-dashed border-gray-200 py-2 text-sm text-gray-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Plus size={14} />
                      Add new task
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {isAddModalOpen && selectedDate && (
        <AddEntryModal
          date={selectedDate}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedDate(null);
          }}
          onAdd={handleAddEntry}
        />
      )}
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
