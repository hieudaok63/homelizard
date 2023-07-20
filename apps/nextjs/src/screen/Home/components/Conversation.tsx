export default function Conversation() {
  return (
    <div className="h-[200px] w-[250px] cursor-pointer rounded-3xl">
      <div className="flex h-full w-full flex-col items-start justify-end rounded-3xl bg-yellow-300 p-4">
        <h4 className="text-xl font-bold">Objekt 1</h4>
        <div className="flex">
          <div className="h-[40px] w-[40px] rounded-s-full rounded-t-full border-2 border-white"></div>
          <div className="h-[40px] w-[40px] rounded-s-full rounded-t-full border-2 border-white"></div>
          <div className="h-[40px] w-[40px] rounded-s-full rounded-t-full border-2 border-white"></div>
          <div className="h-[40px] w-[40px] rounded-s-full rounded-t-full border-2 border-white"></div>
        </div>
      </div>
    </div>
  );
}
