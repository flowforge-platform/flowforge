import { Approval } from "@/types/approval";

interface RequestContextProps {
  approval: Approval;
}

export default function RequestContext({
  approval,
}: RequestContextProps) {
  return (
    <section className="border-t px-6 py-6">
      <h3 className="mb-5 text-lg font-semibold">
        Request Context
      </h3>

      <div className="space-y-5">
        <ContextRow
          label="Requester"
          value={approval.requestedBy.name}
        />

        <ContextRow
          label="Cost Center"
          value={approval.context.costCenter}
        />

        <ContextRow
          label="Vendor"
          value={approval.context.vendor}
        />

        <ContextRow
          label="Description"
          value={approval.context.description}
          multiline
        />
      </div>
    </section>
  );
}

interface ContextRowProps {
  label: string;
  value: string;
  multiline?: boolean;
}

function ContextRow({
  label,
  value,
  multiline = false,
}: ContextRowProps) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-6">
      <p className="text-sm font-medium text-muted-foreground">
        {label}
      </p>

      <p
        className={
          multiline
            ? "text-sm leading-6"
            : "text-sm font-medium"
        }
      >
        {value}
      </p>
    </div>
  );
}