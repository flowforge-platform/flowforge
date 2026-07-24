export type Theme = "light" | "dark" | "system";

export interface GeneralSettings {
  theme: Theme;
  timezone: string;
  dateFormat: string;
}

export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface ExecutionSettings {
  autoReconnect: boolean;
  refreshInterval: string;
  logRetention: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionManagementEnabled: boolean;
}

export interface ApiSettings {
  apiKey: string;
  webhookSecret: string;
}

export interface UsageInfo {
  percentage: number;
  description: string;
}

export interface Settings {
  general: GeneralSettings;

  notifications: NotificationSetting[];

  execution: ExecutionSettings;

  security: SecuritySettings;

  api: ApiSettings;

  usage: UsageInfo;
}