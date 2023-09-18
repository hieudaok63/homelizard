import { TitleSeparate } from "~/hommeyComponents";

export type CitySummaryProps = {
  title: string;
  summary: string;
};

export default function CitySummary({ title, summary }: CitySummaryProps) {
  return (
    <div>
      <TitleSeparate titleSecond={title} className="mb-6 mt-[80px]" />
      <p className="mb-12 text-sm text-[#737D8C]">{summary}</p>
    </div>
  );
}
