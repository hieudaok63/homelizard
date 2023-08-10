export type TSearchWizardStyle = {
  id: number;
  title: string;
  content: string;
  image: string;
  is_check?: boolean;
};

export type TCardStyle = {
  data?: TSearchWizardStyle;
  className?: string;
  chooseStyle?: () => void;
};
