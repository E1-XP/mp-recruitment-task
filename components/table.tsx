"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { fetchData } from "@/helpers";
import { API_URL } from "@/config";
import Loader from "./Loader";
import { Data } from "@/modules/tags-explorer/interfaces";

type Order = "asc" | "desc";
type SortBy = "name" | "count";

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
  pageControl: [number, (newState: number) => void];
}

const EnhancedTableHead = ({
  orderControl,
  sortByControl,
  pageControl,
}: THProps) => {
  const [order, setOrder] = orderControl;
  const [sortBy, setSortBy] = sortByControl;

  const createSortHandler = (name: SortBy) => {
    return () => {
      setOrder(order === "asc" ? "desc" : "asc");
      setSortBy(name);
      pageControl[1](0);
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
};

const SortableTable = ({ initialData }: { initialData: Data }) => {
  const [page, setPage] = useState(0);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  const [order, setOrder] = useState<Order>("desc");
  const [sortBy, setSortBy] = useState<SortBy>("count");

  const content = { rowSelectorText: "Select number of rows per page:" };

  const mapSortNaming = (val: SortBy) => (val === "count" ? "popular" : val);

  const queryStr = `?site=stackoverflow&pagesize=${elementsPerPage}&page=${
    page + 1
  }&order=${order}&sort=${mapSortNaming(sortBy)}&filter=!nNPvSNVZJS&key=${
    process.env.NEXT_PUBLIC_STACKEXCHANGE_API_KEY
  }`;

  const getTags = (fetchData<Data>).bind(null, API_URL.concat("/tags", queryStr));

  const { data, isLoading, isFetching, isError, isPlaceholderData } = useQuery({
    queryKey: ["TAGS", elementsPerPage, page, order],
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

  if (isLoading) return <Loader isLoading={true} />;

  if (isError) {
    return <Loader isLoading={false} isError={true} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer className="relative">
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead
              orderControl={[order, setOrder]}
              sortByControl={[sortBy, setSortBy]}
              pageControl={[page, setPage]}
            />
            <TableBody>
              <TableRow tabIndex={-1} key={"numberOfRowsSelector"}>
                <TableCell align="right">{content.rowSelectorText}</TableCell>
                <TableCell component="th" scope="row" padding={"normal"}>
                  <TextField
                    type="number"
                    value={elementsPerPage}
                    size="small"
                    onChange={(ev) =>
                      setElementsPerPage(parseInt(ev.target.value))
                    }
                  />
                </TableCell>
              </TableRow>
              {data.items.map((row, index) => (
                <TableRow hover tabIndex={-1} key={row.name}>
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
          <Loader isLoading={isFetching || isPlaceholderData} isError={isError} />
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[0]}
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
