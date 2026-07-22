function UnderlineTabsBar<T extends string>({
  activeTab,
  setActiveTab,
  tabs,
}: {
  activeTab: T;
  setActiveTab: (key: T) => void;
  tabs: Array<{ key: T; label: string }>;
}) {
  return (
    <div className="mb-6 flex gap-2 border-b border-brand-border pb-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`whitespace-nowrap px-4 py-2 text-sm font-bold transition ${
            activeTab === tab.key
              ? 'border-b-2 border-brand-main text-brand-main'
              : 'text-brand-muted hover:text-brand-text'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default UnderlineTabsBar;
