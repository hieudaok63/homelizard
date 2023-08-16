export type TPersonalDataItem = {
  id: number;
  title: string;
  content: string;
  percent: number;
  image?: string | null;
  show_percent?: boolean;
};
export type TPersonalData = TPersonalDataItem & {
  is_active: boolean;
  subPersonData: TPersonalDataItem[];
};
