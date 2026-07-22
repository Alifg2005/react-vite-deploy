import { featureCardData } from "../fakedata_by_component/fakedata";

function contentCard() {
  return (

    <article className="flex h-full flex-col rounded-xl border border-brand-border bg-brand-white p-4">
      <h4 className="mb-1 text-lg font-bold text-brand-text">
        {featureCardData.title}
      </h4>

      <p className="text-sm text-brand-muted">
        {featureCardData.description}
      </p>
    </article>
  );
}

export default contentCard;
