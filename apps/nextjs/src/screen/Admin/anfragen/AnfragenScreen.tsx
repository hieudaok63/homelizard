"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { api } from "~/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { tableIcon1, tableIcon2 } from "~/assets";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "immobilie",
    header: () => {
      return (
        <div className="flex items-center">
          <Image src={tableIcon2} alt="" className="ml-[6px] w-4" />
          <span className="ml-1 font-weight_500 text-gray-500">Immobilie</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="ml-2 font-bold text-black">
        {row.getValue("immobilie")}
      </div>
    ),
  },
  {
    accessorKey: "kunde",
    header: () => {
      return (
        <div className="flex items-center">
          <Image src={tableIcon2} alt="" className="ml-[6px] w-4" />
          <span className="ml-1 font-weight_500 text-gray-500">Kunde</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="ml-2 text-blue-800">{row.getValue("kunde")}</div>
    ),
  },
  {
    accessorKey: "partner",
    header: () => {
      return (
        <div className="flex items-center">
          <Image src={tableIcon2} alt="" className="ml-[6px] w-4" />
          <span className="ml-1 font-weight_500 text-gray-500">Partner</span>
        </div>
      );
    },
    cell: ({ row }) => <div className="ml-2">{row.getValue("partner")}</div>,
  },
  {
    accessorKey: "datum",
    header: () => {
      return (
        <div className="flex items-center">
          <Image src={tableIcon1} alt="" className="ml-[6px] w-4" />
          <span className="ml-1 font-weight_500 text-gray-500">Datum</span>
        </div>
      );
    },
    cell: ({ row }) => <div className="ml-2">{row.getValue("datum")}</div>,
  },
  {
    accessorKey: "status",
    header: () => {
      return (
        <div className="flex items-center">
          <Image src={tableIcon2} alt="" className="ml-[6px] w-4" />
          <span className="ml-1 font-weight_500 text-gray-500">Status</span>
        </div>
      );
    },
    cell: ({ row }) => <div className="ml-2">{row.getValue("status")}</div>,
  },
];

interface IDataTableItem {
  id: string;
  immobilie: string;
  kunde: string;
  partner: string;
  datum: string;
  status: string;
}

export default function AnfragenScreen() {
  const { data } = api.request.list.useQuery({ page: 1, limit: 10 });
  const dataType = data?.data;

  const convertData = useCallback((inputData: typeof dataType) => {
    if (!inputData) return [];
    const res: IDataTableItem[] = inputData?.map((item) => {
      return {
        id: item?.id,
        datum: item.id,
        immobilie: item?.id,
        kunde: "Geldsack, Bernd",
        partner: "intern",
        status: item.status,
      };
    });

    return res;
  }, []);

  const dataTable = useMemo(() => {
    return convertData(data?.data);
  }, [convertData, data?.data]);

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();

  return (
    <div className="flex h-full w-full">
      <div className="w-[20%]">
        <Image
          src="https://s3-alpha-sig.figma.com/img/26b6/1c43/a6be6559e078dad9d103b4c9a53d91cb?Expires=1693180800&Signature=mrL0rEtRom8JvjIyKww8xiQcbGCgkP7i6hGdcAz7hIcQ5OK-~-xsfPblWwWN-r7qqHyQdcTghtvXkTnkX2SctXDkX651Yd8-8YspnuSuwsL4P7R1ZofB0ERGEFXCfR-OXHDJTYobJOLE32SITyKFOVe~EAtEspwv1LAt7GhKvOd-orPHCMXNiF~EZgECIKCNz4-ccUcJXiFFxbQd3-wFLm3BOB6QjTp9fbQcgrLCSr2Gwld~~ZZLFkIaKest7xtMKmyvlbH4gngBBQ-dkGvqnIXAYBAGc~gdFwLgLWwi5yOdjGIJPFap5WcBdDYEOHyv8rZ5w4xamVUurfajirOwSw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          width={300}
          height={300}
          alt=""
        />
      </div>
      <div className="w-[80%]">
        <div className="w-full">
          <div className="rounded-md border shadow-lg">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        onClick={() => {
                          router.push(`/admin/anfragen/${row.original.id}`);
                        }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
