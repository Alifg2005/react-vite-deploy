import SharedCard from "../../../shared/components/SharedCard";

interface Feature {
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <SharedCard
      title="أبرز المزايا"
      headerGap="gap-2"
      headerBottom="mb-4"
      className="h-full"
    >
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <h4 className="mb-1 text-lg font-bold text-brand-text">
              {feature.title}
            </h4>

            <p className="text-sm text-brand-muted">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

export default FeaturesSection;
