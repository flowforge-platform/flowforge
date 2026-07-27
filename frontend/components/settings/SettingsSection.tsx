import { ReactNode } from "react";

interface SettingsSectionProps {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function SettingsSection({
  id,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section
      id={id}
      className="rounded-xl border bg-card p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}