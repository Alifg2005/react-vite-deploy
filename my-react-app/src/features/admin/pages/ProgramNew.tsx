import { Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import ProgramFormPanel from "../../../shared/components/ProgramFormPanel";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { usePrograms } from "../../../context/ProgramsContext";
import { adminTranslations } from "../../../mock";

function ProgramNew() {
  const { role, t } = useRole();
  const navigate = useNavigate();
  const { addProgram } = usePrograms();

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.programs.addNewProgram)}
          subtitle={t(adminTranslations.programs.addProgramSubtitle)}
        />

        <ProgramFormPanel
          mode="add"
          initialProgram={null}
          onCancel={() => navigate("/admin/programs")}
          onSubmit={(values) => {
            addProgram(values);
            navigate("/admin/programs");
          }}
        />
      </section>
    </div>
  );
}

export default ProgramNew;
