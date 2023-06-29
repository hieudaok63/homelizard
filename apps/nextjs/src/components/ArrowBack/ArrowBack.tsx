interface ArrowBackProps {
  text?: string;
  content?: string;
  subContent?: string;
  hide?: boolean;
}

export default function ArrowBack({
  text,
  content,
  subContent,
  hide,
}: ArrowBackProps) {
  return (
    <div className="relative left-0 top-0">
      <div className="mb-3">←</div>

      {!hide && (
        <div>
          <h3 className="mb-4 text-lg font-extrabold text-[#262332]">{text}</h3>
          <h4 className="text-sm font-extrabold text-[#262332]">{content}</h4>
          <span className="text-xs font-light text-[#26233299]">
            {subContent}
          </span>
        </div>
      )}
    </div>
  );
}
