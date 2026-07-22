function TabsBar<T extends string>({
  activeTab,
  setActiveTab,
  tabs,
}: {
  activeTab: T;
  setActiveTab: (key: T) => void;
  tabs: Array<{ key: T; label: string }>;
}) {
  return (
    <div className="mb-5 flex flex-wrap gap-2 border-b border-brand-border pb-3">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setActiveTab(tab.key)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            activeTab === tab.key ? "bg-brand-main text-white shadow-sm" : "bg-brand-white text-brand-muted"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabsBar;
