import SharedCard from "../../../shared/components/SharedCard";

interface Partner {
  name: string;
}

interface PartnersSectionData {
  title: string;
  subtitle: string;
  items: Partner[];
}

interface PartnersSectionProps {
  partners: PartnersSectionData;
}

function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <SharedCard title={partners.title} subtitle={partners.subtitle}>
      <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4">
        {partners.items.map((partner) => (
          <article
            key={partner.name}
            className="flex h-full items-center justify-center rounded-xl border border-dashed border-brand-border bg-brand-white p-6 text-center text-sm font-bold text-brand-muted"
          >
            {partner.name}
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

export default PartnersSection;
