"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

import { fetchData } from "@/helpers";
import { API_URL } from "@/config";

interface Data {
  items: Item[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  total: number;
}

interface Item {
  name: string;
  count: number;
}

type Order = "asc" | "desc";
type SortBy = "name" | "count";

const initialData = {
  items: [],
  has_more: true,
  quota_max: 1,
  quota_remaining: 1,
  total: 0,
};

interface THData {
  label: string;
  name: SortBy;
}

const headCells: THData[] = [
  {
    label: "Tag name",
    name: "name",
  },
  {
    label: "Number of posts",
    name: "count",
  },
];

interface THProps {
  orderControl: [Order, (newState: Order) => void];
  sortByControl: [SortBy, (newState: SortBy) => void];
}

function EnhancedTableHead({ orderControl, sortByControl }: THProps) {
  const [order, setOrder] = orderControl;
  const [sortBy, setSortBy] = sortByControl;

  const createSortHandler = (name: SortBy) => {
    return () => {
      setOrder(order === "asc" ? "desc" : "asc");
      setSortBy(name);
    };
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, idx) => (
          <TableCell
            key={headCell.label}
            align={idx ? "right" : "left"}
            padding={"normal"}
            sortDirection={order}
          >
            <TableSortLabel
              active={sortBy === headCell.label}
              direction={order}
              onClick={createSortHandler(headCell.name)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const SortableTable = () => {
  const [page, setPage] = useState(0);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  const [order, setOrder] = useState<Order>("desc");
  const [sortBy, setSortBy] = useState<SortBy>("count");

  const mapSortNaming = (val: SortBy) => (val === "count" ? "popular" : val);

  const queryStr = `?site=stackoverflow&pagesize=${elementsPerPage}&page=${
    page + 1
  }&order=${order}&sort=${mapSortNaming(sortBy)}&filter=!nNPvSNVZJS`;
  const getTags = (fetchData<Data>).bind(null, API_URL.concat("/tags", queryStr));

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["TAGS", elementsPerPage, page, order],
    queryFn: getTags,
    placeholderData: keepPreviousData,
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

  if (isError || !data) return "Error";

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              orderControl={[order, setOrder]}
              sortByControl={[sortBy, setSortBy]}
            />
            <TableBody>
              {data.items.map((row, index) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.name}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    component="th"
                    id={row.name}
                    scope="row"
                    padding={"normal"}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.total}
          rowsPerPage={elementsPerPage}
          page={!data.total || data.total <= 0 ? 0 : page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default SortableTable;
