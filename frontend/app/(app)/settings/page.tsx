import SettingsView from "@/components/settings/SettingsView";
import { getSettings } from "@/lib/api/settings";

export default async function SettingsPage() {
  const settings = await getSettings();

  return <SettingsView settings={settings} />;
}