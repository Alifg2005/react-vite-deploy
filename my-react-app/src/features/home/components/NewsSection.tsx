import SharedCard from "../../../shared/components/SharedCard";

interface NewsItem {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
}

interface NewsSectionData {
  title: string;
  subtitle: string;
  items: NewsItem[];
}

interface NewsSectionProps {
  news: NewsSectionData;
}

function NewsSection({ news }: NewsSectionProps) {
  return (
    <SharedCard title={news.title} subtitle={news.subtitle}>
      <div className="grid items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
        {news.items.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-brand-main px-3 py-1 text-xs font-bold text-white">
              {item.tag}
            </span>
            <h4 className="mb-1 text-base font-bold text-brand-text">{item.title}</h4>
            <p className="mb-2 flex-1 text-sm text-brand-muted">{item.excerpt}</p>
            <p className="mt-auto text-xs text-brand-muted">{item.date}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

export default NewsSection;
