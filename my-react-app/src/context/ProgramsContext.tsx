import { createContext, useContext, useState, type ReactNode } from "react";
import { ADMIN_PROGRAMS, type AdminProgram, type AdminProgramModule } from "../mock";

export interface ProgramFormValues {
  title: string;
  type: string;
  provider: string;
  price: string | number;
  seats: string | number;
  description: string;
  about: string;
  outcomes: string[];
  curriculum: AdminProgramModule[];
  startDate: string;
  endDate: string;
  introVideoUrl: string;
}

interface ProgramsContextValue {
  programs: AdminProgram[];
  addProgram: (values: ProgramFormValues & { image: string | null }) => void;
  updateProgram: (id: string, values: ProgramFormValues & { image: string | null }) => void;
  removeProgram: (id: string) => void;
}

const ProgramsContext = createContext<ProgramsContextValue | null>(null);

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Lives above the /admin/programs list and the dedicated /admin/programs/:id/edit
// page so edits made on the edit page are still there when you navigate back
// to the list — a plain useState inside the list page would reset on remount.
export function ProgramsProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<AdminProgram[]>(() => {
    // Programs whose end date has already passed are dropped automatically —
    // no admin action needed to clean up expired listings.
    const today = todayISO();
    return ADMIN_PROGRAMS.filter((item) => !item.endDate || item.endDate >= today);
  });

  function addProgram(values: ProgramFormValues & { image: string | null }) {
    setPrograms((current) => [
      {
        id: `draft-${Date.now()}`,
        title: values.title.trim(),
        type: values.type,
        submittedBy: values.provider.trim() || "—",
        dateAdded: todayISO(),
        registeredCount: 0,
        status: "pendingApproval",
        price: values.price,
        seats: values.seats,
        description: values.description,
        image: values.image,
        startDate: values.startDate,
        endDate: values.endDate,
        about: values.about,
        outcomes: values.outcomes,
        curriculum: values.curriculum,
        introVideoUrl: values.introVideoUrl,
      },
      ...current,
    ]);
  }

  function updateProgram(id: string, values: ProgramFormValues & { image: string | null }) {
    setPrograms((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              title: values.title.trim(),
              type: values.type,
              submittedBy: values.provider.trim() || "—",
              price: values.price,
              seats: values.seats,
              description: values.description,
              image: values.image,
              startDate: values.startDate,
              endDate: values.endDate,
              about: values.about,
              outcomes: values.outcomes,
              curriculum: values.curriculum,
              introVideoUrl: values.introVideoUrl,
            }
          : item
      )
    );
  }

  function removeProgram(id: string) {
    setPrograms((current) => current.filter((item) => item.id !== id));
  }

  return (
    <ProgramsContext.Provider value={{ programs, addProgram, updateProgram, removeProgram }}>
      {children}
    </ProgramsContext.Provider>
  );
}

export function usePrograms(): ProgramsContextValue {
  const context = useContext(ProgramsContext);

  if (!context) {
    throw new Error("usePrograms must be used within a ProgramsProvider");
  }

  return context;
}
