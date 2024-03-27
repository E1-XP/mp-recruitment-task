"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { fetchData } from "@/helpers";
import { API_URL } from "@/config";

interface Data {
  items: Item[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

interface Item {
  name: string;
  count: number;
}

type Order = "asc" | "desc";
type SortBy = "popular" | "name";

const initialData = {
  items: [],
  has_more: true,
  quota_max: 1,
  quota_remaining: 1,
};

const SortableTable = () => {
  const [page, setPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  const queryStr = `?site=stackoverflow&pagesize=${elementsPerPage}&page=${page}&order=${"desc"}&sort=${"popular"}`;
  const getTags = (fetchData<Data>).bind(null, API_URL.concat("/tags", queryStr));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["TAGS", elementsPerPage, page],
    queryFn: getTags,
    initialData,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setElementsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  console.log(data);

  if (isLoading) return "Loading...";

  if (isError) return "Error";

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            {/* <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            /> */}
            <TableBody>
              {data.items.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.name}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                );
              })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={10}
          rowsPerPage={elementsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default SortableTable;
