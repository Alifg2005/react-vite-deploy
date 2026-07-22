import SharedCard from "../../../shared/components/SharedCard";

interface OverviewImage {
  src: string;
  alt: string;
}

interface OverviewData {
  title: string;
  paragraphs: string[];
  image?: OverviewImage;
}

interface OverviewSectionProps {
  overview: OverviewData;
}

function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <SharedCard
      title={overview.title}
      boxed
      padding="p-6"
      headerBottom="mb-6"
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-3">
            {overview.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm text-brand-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {overview.image ? (
          <SharedCard
            img={overview.image.src}
            imgAlt={overview.image.alt}
            imgPosition="top"
            imgHeight="h-40 md:h-48"
            imgFit="object-cover"
            boxed
            padding="p-0"
            className="overflow-hidden"
          />
        ) : null}
      </div>
    </SharedCard>
  );
}

export default OverviewSection;
