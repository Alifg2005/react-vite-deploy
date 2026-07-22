import type { NavigateFunction } from "react-router-dom";

export type ComboBoxActionContext = {
  value: string;
  navigate: NavigateFunction;
};

export type ComboBoxAction = (ctx: ComboBoxActionContext) => void;

// Name -> function registry. Options reference an action by its key (a plain
// string), since the option itself can't hold a real function reference.
export const comboBoxActionRegistry: Record<string, ComboBoxAction> = {
  goToSettings: ({ navigate }) => navigate("/account-settings"),
  navigateToProfile: ({ navigate }) => navigate("/profile"),
};
