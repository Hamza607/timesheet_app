import { useEffect, useMemo, useState } from "react";
import { getWeeklyTimesheets } from "../../api/timesheetApi";
import { useNavigate } from "react-router-dom";

export default function TimesheetList() {
  const [timesheets, setTimesheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    async function fetchTimesheets() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getWeeklyTimesheets(user.id);
        setTimesheets(data);
      } finally {
        setLoading(false);
      }
    }

    fetchTimesheets();
  }, [user?.id]);

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    const startMonth = startDate.toLocaleString("en-US", { month: "long" });
    const endMonth = endDate.toLocaleString("en-US", { month: "long" });

    const year = endDate.getFullYear();

    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${endMonth}, ${year}`;
    }

    return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${year}`;
  };

  const getDateRangeKey = (sheet: any) => {
    return `${sheet.weekStart}_${sheet.weekEnd}`;
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "incomplete":
        return "bg-yellow-100 text-yellow-700";
      case "missing":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getActionText = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "View";
      case "incomplete":
        return "Update";
      case "missing":
        return "Create";
      default:
        return "View";
    }
  };

  const handleSelectTimesheet = (sheet: any) => {
    navigate(`/timesheets/${sheet.id}`);
  };

  const statusOptions = useMemo(() => {
    return Array.from(new Set(timesheets.map((sheet) => sheet.status)));
  }, [timesheets]);

  const dateRangeOptions = useMemo(() => {
    return timesheets.map((sheet) => ({
      key: getDateRangeKey(sheet),
      label: formatDateRange(sheet.weekStart, sheet.weekEnd),
    }));
  }, [timesheets]);

  const filteredTimesheets = useMemo(() => {
    return timesheets.filter((sheet) => {
      const matchesDateRange =
        !selectedDateRange || getDateRangeKey(sheet) === selectedDateRange;

      const matchesStatus =
        !selectedStatus ||
        sheet.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesDateRange && matchesStatus;
    });
  }, [timesheets, selectedDateRange, selectedStatus]);

  const totalPages = Math.ceil(filteredTimesheets.length / itemsPerPage);

  const paginatedTimesheets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTimesheets.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTimesheets, currentPage, itemsPerPage]);

  const handleDateRangeChange = (value: string) => {
    setSelectedDateRange(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  if (loading) {
    return <p className="text-gray-600">Loading timesheets...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-4">
      <main className="max-w-7xl mx-auto mt-4 sm:mt-5">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 sm:p-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
            Your Timesheets
          </h2>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <select
              value={selectedDateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className="w-full sm:w-44 h-9 border border-gray-300 rounded-md px-3 text-sm text-gray-500 bg-white"
            >
              <option value="">All Dates</option>

              {dateRangeOptions.map((range) => (
                <option key={range.key} value={range.key}>
                  {range.label}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full sm:w-36 h-9 border border-gray-300 rounded-md px-3 text-sm text-gray-500 bg-white"
            >
              <option value="">All Statuses</option>

              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-160 text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold w-24">
                      Week # <span className="ml-3">↓</span>
                    </th>
                    <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold">
                      Date <span className="ml-2">↓</span>
                    </th>
                    <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold">
                      Status <span className="ml-2">↓</span>
                    </th>
                    <th className="text-right px-3 sm:px-4 py-3 sm:py-4 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedTimesheets.length > 0 ? (
                    paginatedTimesheets.map((sheet: any, index: number) => (
                      <tr
                        key={sheet.id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-700 bg-gray-50">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-500 whitespace-nowrap">
                          {formatDateRange(sheet.weekStart, sheet.weekEnd)}
                        </td>

                        <td className="px-3 sm:px-4 py-3 sm:py-4">
                          <span
                            className={`inline-flex rounded-md px-2 py-1 text-[11px] font-bold uppercase whitespace-nowrap ${getStatusStyles(
                              sheet.status,
                            )}`}
                          >
                            {sheet.status}
                          </span>
                        </td>

                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-right">
                          <button
                            onClick={() => handleSelectTimesheet(sheet)}
                            className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                          >
                            {getActionText(sheet.status)}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No timesheets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="w-full sm:w-auto h-9 border border-gray-300 rounded-md px-3 text-sm text-gray-600 bg-white"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1 sm:gap-0 text-sm">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-2 border border-gray-300 rounded-md sm:rounded-none sm:rounded-l-md text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 border border-gray-300 sm:border-l-0 hover:bg-gray-50 rounded-md sm:rounded-none ${
                      page === currentPage
                        ? "text-blue-600 font-semibold bg-blue-50"
                        : "text-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-2 border border-gray-300 rounded-md sm:rounded-none sm:rounded-r-md sm:border-l-0 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <footer className="bg-white rounded-md shadow-sm border border-gray-200 text-center text-xs sm:text-sm text-gray-400 py-6 sm:py-8 mt-4">
          © 2024 tentwenty. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
