import { useLocation, useParams } from "react-router-dom";
import TimesheetEntries from "../components/TimesheetEntries/TimesheetEntries";

export default function TimesheetDetailsPage() {
  const { timesheetId } = useParams();
  const location = useLocation();

  const timesheet = location.state?.timesheet;

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <TimesheetEntries timesheetId={timesheetId} timesheet={timesheet} />
      </div>
    </div>
  );
}
