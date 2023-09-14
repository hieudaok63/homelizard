import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        src="https://s3-alpha-sig.figma.com/img/26b6/1c43/a6be6559e078dad9d103b4c9a53d91cb?Expires=1693180800&Signature=mrL0rEtRom8JvjIyKww8xiQcbGCgkP7i6hGdcAz7hIcQ5OK-~-xsfPblWwWN-r7qqHyQdcTghtvXkTnkX2SctXDkX651Yd8-8YspnuSuwsL4P7R1ZofB0ERGEFXCfR-OXHDJTYobJOLE32SITyKFOVe~EAtEspwv1LAt7GhKvOd-orPHCMXNiF~EZgECIKCNz4-ccUcJXiFFxbQd3-wFLm3BOB6QjTp9fbQcgrLCSr2Gwld~~ZZLFkIaKest7xtMKmyvlbH4gngBBQ-dkGvqnIXAYBAGc~gdFwLgLWwi5yOdjGIJPFap5WcBdDYEOHyv8rZ5w4xamVUurfajirOwSw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        width={300}
        height={300}
        alt=""
        className=""
      />
    </div>
  );
}
