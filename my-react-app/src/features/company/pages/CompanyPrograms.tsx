import { useEffect, useMemo, useState } from 'react';
import SharedCard from '../../../shared/components/SharedCard';
import Sidebar from '../../../shared/components/DashboardSidebar';
import ProgramCard from '../components/ProgramCard';
import ProgramDetailModal from '../components/ProgramDetailModal';
import UnderlineTabsBar from '../components/UnderlineTabsBar';
import FilterPillBar from '../components/FilterPillBar';
import SkeletonGrid from '../components/SkeletonGrid';
import EmptyState from '../components/EmptyState';
import { programTabs, programTypeFilters, programsSeed, type Program, type ProgramTab, type ProgramType } from '../data';

function CompanyPrograms() {
  const [activeTab, setActiveTab] = useState<ProgramTab>('all');
  const [typeFilter, setTypeFilter] = useState<ProgramType>('all');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return programsSeed.filter((program) => {
      if (activeTab !== 'all' && program.status !== activeTab) return false;
      if (typeFilter !== 'all' && program.type !== typeFilter) return false;
      if (!normalizedQuery) return true;
      return `${program.title} ${program.description}`.toLowerCase().includes(normalizedQuery);
    });
  }, [activeTab, typeFilter, query]);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="rounded-2xl border border-brand-border bg-[linear-gradient(90deg,var(--c-hero-start),var(--c-hero-middle),var(--c-hero-end))] p-8 text-white">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80">إدارة البرامج</p>
          <h2 className="mb-2 text-3xl font-bold text-white">البرامج والدورات</h2>
          <p className="text-lg text-white/85">إدارة جميع برامجك والدورات والمعسكرات المسابقات في مكان واحد.</p>
        </div>

        <SharedCard title="البرامج والدورات" subtitle="قائمة بجميع البرامج التي تقدمها شركتك">
          {/* Search bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="بحث عن برنامج..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-brand-border bg-brand-white px-4 py-3 text-sm text-brand-text placeholder-brand-muted focus:border-brand-main focus:outline-none"
            />
          </div>

          <UnderlineTabsBar<ProgramTab> activeTab={activeTab} setActiveTab={setActiveTab} tabs={programTabs} />
          <FilterPillBar<ProgramType> value={typeFilter} setValue={setTypeFilter} options={programTypeFilters} />

          {/* Programs Grid */}
          {isLoading ? (
            <SkeletonGrid count={6} containerClassName="grid gap-4 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-56" />
          ) : filteredPrograms.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} onViewDetails={setSelectedProgram} />
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد برامج تطابق معايير البحث." />
          )}
        </SharedCard>
      </section>

      {selectedProgram && (
        <ProgramDetailModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}
    </div>
  );
}

export default CompanyPrograms;
