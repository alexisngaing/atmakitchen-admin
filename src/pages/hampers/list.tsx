import { DeleteButton, EditButton, List } from "@refinedev/chakra-ui";
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

import { Pagination } from "../../components/pagination";
import { ColumnFilter, ColumnSorter } from "../../components/table";
import { IHamper } from "../../interfaces";

export const HamperList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IHamper>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        id: "image",
        header: "Gambar",
        accessorKey: "image",
        cell: function render({ getValue }) {
          return (
            <Box
              w="50px"
              h="50px"
              bgImage={`url(${getValue()})`}
              bgSize="cover"
              bgPos="center"
              borderRadius="md"
            />
          );
        },
      },
      {
        id: "name",
        header: "Nama Hamper",
        accessorKey: "name",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "price",
        header: "Harga",
        accessorKey: "price",
        meta: {
          filterOperator: "eq",
        },
      },
      {
        id: "actions",
        header: "Actions",
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
    <List>
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
      <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      />
    </List>
  );
};
