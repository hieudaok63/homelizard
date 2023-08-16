export default function FinanzenItem({ data }: any) {
  return (
    <div className="w-full bg-white p-3">
      <div className="flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">{data.title}</span>
        <div className="w-full">
          {/* <span className="text-lg text-grey_2">{data.content}</span>
          <div className="mt-3 h-[1px] w-full border-b-2  bg-gray-400"></div> */}
          <input
            type="text"
            className="h-8 w-full border-b-2 outline-none"
            placeholder={data.content}
          />
        </div>
      </div>
    </div>
  );
}
