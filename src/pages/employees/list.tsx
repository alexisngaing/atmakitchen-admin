import {
  CreateButton,
  DateField,
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
import { IRecipe } from "../../interfaces";

export const EmployeeList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IRecipe>[]>(
    () => [
      {
        id: "fullName",
        header: "Nama Lengkap",
        accessorKey: "fullName",
        enableColumnFilter: false,
        enableSorting: false,
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
        enableSorting: false,
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "dob",
        header: "Tanggal Lahir",
        accessorKey: "dob",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} />;
        },
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
                confirmTitle="Hapus karyawan ini?"
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
      title={"Daftar Karyawan"}
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
      {/* <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      /> */}
    </List>
  );
};
