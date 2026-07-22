import SharedCard from "../../../shared/components/SharedCard";
import male from "../../../images/male.png";
import female from "../../../images/female.png";

interface TeamMember {
  name: string;
  role: string;
  gender: "male" | "female";
  image?: string;
}

interface TeamData {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

interface TeamSectionProps {
  team: TeamData;
}

function TeamSection({ team }: TeamSectionProps) {
  const getAvatar = (member: TeamMember): string => {
    if (member.image) return member.image;
    return member.gender === "female" ? female : male;
  };

  return (
    <SharedCard
      title="فريق العمل"
      headerGap="gap-2"
      headerBottom="mb-4"
      className="h-full"
    >
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.members.map((member, index) => (
          <article
            key={`${member.name}-${index}`}
            className="flex h-full flex-col items-center rounded-xl border border-brand-border bg-brand-white p-4 text-center"
          >
            <img
              src={getAvatar(member)}
              alt={member.name}
              className="mx-auto mb-3 h-14 w-14 rounded-full border border-dashed border-brand-border bg-brand-light object-cover"
            />

            <h4 className="text-base font-bold text-brand-text">
              {member.name}
            </h4>

            <p className="text-sm text-brand-muted">
              {member.role}
            </p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

export default TeamSection;
