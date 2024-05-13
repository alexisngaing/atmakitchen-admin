import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
} from "@refinedev/chakra-ui";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { ColumnFilter, ColumnSorter } from "../../components/table";
import { IProduct } from "../../interfaces";

export const ProductList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IProduct>[]>(
    () => [
      {
        id: "name",
        header: "Nama Produk",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        id: "productCategory.id",
        header: "Kategori",
        enableColumnFilter: false,
        enableSorting: false,
        accessorKey: "productCategory.name",
      },
      {
        id: "price",
        header: "Harga",
        accessorKey: "price",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return `Rp ${getValue()}`;
        },
      },
      {
        id: "quantity",
        header: "Stok",
        accessorKey: "quantity",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        id: "quota",
        header: "Kuota",
        accessorKey: "quota",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Aksi",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <HStack>
              <EditButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
              <DeleteButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
                confirmTitle="Hapus produk ini?"
                confirmOkText="Ya"
                confirmCancelText="Tidak"
              />
            </HStack>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
    refineCoreProps: {
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });

  return (
    <List
      title={"Daftar Produk"}
      headerButtons={() => <CreateButton>Tambah</CreateButton>}
    >
      <TableContainer>
        <Table variant="simple" whiteSpace="pre-line">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      {!header.isPlaceholder && (
                        <HStack spacing="xs">
                          <Box>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Box>
                          <HStack spacing="xs">
                            <ColumnSorter column={header.column} />
                            <ColumnFilter column={header.column} />
                          </HStack>
                        </HStack>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Disabled for now */}
      {/* <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      /> */}
    </List>
  );
};
