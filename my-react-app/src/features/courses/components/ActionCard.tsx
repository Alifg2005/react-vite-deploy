import { PROGRAM_DETAILS_DATA, STATUS_LABELS } from "../../../mock";
import StatusBadge from "./StatusBadge";
import type { Product, UserRole } from "../../../mock";

const { actionCard: ACTION_DATA } = PROGRAM_DETAILS_DATA;
const { actions: A } = ACTION_DATA;

interface ActionConfig {
  label: string;
  enabled: boolean;
  dark?: boolean;
  opensForm?: boolean;
  needsAuth?: boolean;
}

interface GetActionConfigParams {
  product: Product;
  role: UserRole;
  isEnrolled: boolean;
}

function getActionConfig({ product, role, isEnrolled }: GetActionConfigParams): ActionConfig {
  if (product.type === "trainer") {
    if (role === "company") return { label: A.trainerCompany, enabled: true };
    if (role === "admin") return { label: A.trainerAdmin, enabled: true, dark: true };
    if (role === "guest") return { label: A.trainerGuest, enabled: true, needsAuth: true };
    return { label: A.trainerDisabled, enabled: false };
  }
  if (product.type === "project") {
    if (role === "company") return { label: A.projectCompany, enabled: true };
    if (role === "trainer") return { label: A.projectTrainer, enabled: true };
    if (role === "admin") return { label: A.projectAdmin, enabled: true, dark: true };
    if (role === "guest") return { label: A.projectGuest, enabled: true, needsAuth: true };
    return { label: A.projectDisabled, enabled: false };
  }
  if (product.status === "full") return { label: A.statusFull, enabled: false };
  if (product.status === "closed") return { label: A.statusClosed, enabled: false };
  if (role === "admin") return { label: A.adminManage, enabled: true, dark: true };
  if (role === "guest") return { label: A.guestLogin, enabled: true, needsAuth: true };
  if (isEnrolled) return { label: A.alreadyEnrolled, enabled: false };
  if (product.hasCapabilityForm) return { label: A.applyForm, enabled: true, opensForm: true };
  return { label: A.registerNow, enabled: true };
}

interface ActionCardProps {
  product: Product;
  viewerRole: UserRole;
  isEnrolled: boolean;
  isWishlisted: boolean;
  onEnroll: () => void;
  onOpenForm: () => void;
  onToggleWishlist: () => void;
  onNavigateToPayment: () => void;
}

function ActionCard({ product, viewerRole, isEnrolled, isWishlisted, onEnroll, onOpenForm, onToggleWishlist, onNavigateToPayment }: ActionCardProps) {
  const action = getActionConfig({ product, role: viewerRole, isEnrolled });

  const priceLabel = product.pricing.isFree
    ? "مجاني"
    : `${product.pricing.price.toLocaleString("en-US")} ${product.pricing.currency}`;

  const showSeats = ["course", "camp", "competition"].includes(product.type);
  const showWishlist = viewerRole === "student" && product.type !== "project" && product.type !== "trainer";

  function handleClick() {
    if (!action.enabled) return;
    if (action.opensForm) return onOpenForm();
    if (!product.pricing.isFree) return onNavigateToPayment();
    return onEnroll();
  }

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-white p-6 lg:sticky lg:top-24">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-2xl font-bold text-brand-text">{priceLabel}</span>
        <StatusBadge status={product.status} />
      </div>

      <div className="mb-4 flex flex-col gap-2">
        {product.facts.map((fact) => (
          <div key={fact.label} className="flex items-center justify-between text-sm">
            <span className="text-brand-muted">{fact.label}</span>
            <span className="font-bold text-brand-text">{fact.value}</span>
          </div>
        ))}
      </div>

      {showSeats && product.seats.total > 0 ? (
        <div className="mb-4 rounded-xl bg-brand-white p-3 text-center text-sm font-bold text-brand-text">
          {ACTION_DATA.seatsLabel}: {product.seats.remaining} {ACTION_DATA.seatsOf} {product.seats.total}
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleClick}
        disabled={!action.enabled}
        className={`w-full rounded-lg px-4 py-3 text-sm font-bold transition ${
          !action.enabled
            ? "cursor-not-allowed bg-brand-white text-brand-muted"
            : action.dark
            ? "bg-brand-dark text-white hover:opacity-90"
            : "bg-brand-main text-white hover:opacity-90"
        }`}
      >
        {action.label}
      </button>

      {showWishlist ? (
        <button
          type="button"
          onClick={onToggleWishlist}
          className={`mt-3 w-full rounded-lg border px-4 py-3 text-sm font-bold transition ${
            isWishlisted
              ? "border-brand-main bg-brand-white text-brand-main"
              : "border-brand-border text-brand-text hover:bg-brand-white"
          }`}
        >
          {isWishlisted ? ACTION_DATA.wishlistRemove : ACTION_DATA.wishlistAdd}
        </button>
      ) : null}
    </div>
  );
}

export default ActionCard;
