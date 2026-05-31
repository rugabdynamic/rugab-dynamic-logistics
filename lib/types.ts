// Shared result shape returned by form server actions.
export interface ActionResult {
  ok: boolean;
  message: string;
  trackingCode?: string;
  fieldErrors?: Record<string, string[]>;
}
