import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import ProgramFormPanel from "../../../shared/components/ProgramFormPanel";
import GradientBanner from "../../../shared/components/GradientBanner";
import { useRole } from "../../../shared/context/RoleContext";
import { usePrograms } from "../../../context/ProgramsContext";
import { adminTranslations } from "../../../mock";

function ProgramEdit() {
  const { role, t } = useRole();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { programs, updateProgram } = usePrograms();

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  const program = programs.find((item) => item.id === id);
  if (!program) return <Navigate to="/admin/programs" replace />;

  return (
    <div className="admin-scale flex flex-col gap-5 md:flex-row md:items-start">
      <AdminSidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <GradientBanner
          title={t(adminTranslations.programs.editProgramTitle)}
          subtitle={t(adminTranslations.programs.editProgramSubtitle)}
        />

        <ProgramFormPanel
          mode="edit"
          initialProgram={program}
          onCancel={() => navigate("/admin/programs")}
          onSubmit={(values) => {
            updateProgram(program.id, values);
            navigate("/admin/programs");
          }}
        />
      </section>
    </div>
  );
}

export default ProgramEdit;
