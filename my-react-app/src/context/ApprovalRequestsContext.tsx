import { createContext, useContext, useState, type ReactNode } from "react";
import {
  PROGRAM_APPROVAL_REQUESTS, USER_APPROVAL_REQUESTS,
  type ProgramApprovalRequest, type UserApprovalRequest,
} from "../mock";

interface ApprovalRequestsContextValue {
  programRequests: ProgramApprovalRequest[];
  userRequests: UserApprovalRequest[];
  approveProgramRequest: (id: string) => void;
  rejectProgramRequest: (id: string) => void;
  approveUserRequest: (id: string) => void;
  rejectUserRequest: (id: string) => void;
}

const ApprovalRequestsContext = createContext<ApprovalRequestsContextValue | null>(null);

// Lives above the /admin/approval-requests list and the dedicated
// /admin/approval-requests/:kind/:id detail page so Accept/Reject — which now
// happens on the detail page — is reflected back on the list once the admin
// navigates back, instead of resetting on remount like a page-local useState would.
export function ApprovalRequestsProvider({ children }: { children: ReactNode }) {
  const [programRequests, setProgramRequests] = useState<ProgramApprovalRequest[]>(PROGRAM_APPROVAL_REQUESTS);
  const [userRequests, setUserRequests] = useState<UserApprovalRequest[]>(USER_APPROVAL_REQUESTS);

  function approveProgramRequest(id: string) {
    setProgramRequests((current) => current.filter((item) => item.id !== id));
  }
  function rejectProgramRequest(id: string) {
    setProgramRequests((current) => current.filter((item) => item.id !== id));
  }
  function approveUserRequest(id: string) {
    setUserRequests((current) => current.filter((item) => item.id !== id));
  }
  function rejectUserRequest(id: string) {
    setUserRequests((current) => current.filter((item) => item.id !== id));
  }

  return (
    <ApprovalRequestsContext.Provider
      value={{ programRequests, userRequests, approveProgramRequest, rejectProgramRequest, approveUserRequest, rejectUserRequest }}
    >
      {children}
    </ApprovalRequestsContext.Provider>
  );
}

export function useApprovalRequests(): ApprovalRequestsContextValue {
  const context = useContext(ApprovalRequestsContext);

  if (!context) {
    throw new Error("useApprovalRequests must be used within an ApprovalRequestsProvider");
  }

  return context;
}
