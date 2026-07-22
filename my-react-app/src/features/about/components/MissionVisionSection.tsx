import SharedCard from "../../../shared/components/SharedCard";

interface MissionVisionItem {
  title: string;
  text: string;
}

interface MissionVisionSectionProps {
  items: MissionVisionItem[];
}

function MissionVisionSection({ items }: MissionVisionSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <SharedCard
          key={item.title}
          badge={item.title}
          description={item.text}
          boxed
          headerGap="gap-2"
          headerBottom="mb-0"
          className="h-full"
        />
      ))}
    </div>
  );
}

export default MissionVisionSection;
