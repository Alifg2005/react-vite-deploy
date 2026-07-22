import MainLayout from "../layouts/MainLayout";
import AppRoutes from "./routes";
import { AuthProvider } from "../shared/context/AuthContext";
import { RoleProvider } from "../shared/context/RoleContext";
import { NotificationsProvider } from "../context/NotificationsContext";
import { ApprovalRequestsProvider } from "../context/ApprovalRequestsContext";
import { TeamProvider } from "../context/TeamContext";
import { NewsEventsProvider } from "../context/NewsEventsContext";
import { ProgramsProvider } from "../context/ProgramsContext";

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <NotificationsProvider>
          <ApprovalRequestsProvider>
            <TeamProvider>
              <NewsEventsProvider>
                <ProgramsProvider>
                  <MainLayout>
                    <AppRoutes />
                  </MainLayout>
                </ProgramsProvider>
              </NewsEventsProvider>
            </TeamProvider>
          </ApprovalRequestsProvider>
        </NotificationsProvider>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
