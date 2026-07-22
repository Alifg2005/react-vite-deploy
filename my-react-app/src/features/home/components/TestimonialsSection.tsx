import SharedCard from "../../../shared/components/SharedCard";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialsSectionData {
  title: string;
  subtitle: string;
  items: Testimonial[];
}

interface TestimonialsSectionProps {
  testimonials: TestimonialsSectionData;
}

function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <SharedCard title={testimonials.title} subtitle={testimonials.subtitle}>
      <div className="grid items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map((testimonial) => (
          <article
            key={testimonial.name}
            className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4"
          >
            <p className="mb-4 flex-1 text-sm text-brand-muted">"{testimonial.quote}"</p>
            <h4 className="text-sm font-bold text-brand-text">{testimonial.name}</h4>
            <p className="text-xs text-brand-muted">{testimonial.role}</p>
          </article>
        ))}
      </div>
    </SharedCard>
  );
}

export default TestimonialsSection;
