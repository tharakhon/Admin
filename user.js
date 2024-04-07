import React, { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Avatar, AvatarGroup, Button, Checkbox, Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputBase, InputLabel, Menu, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip
} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BlockIcon from '@mui/icons-material/Block';
import { green, pink, red } from "@mui/material/colors";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import axios from "axios";
import TextField from '@mui/material/TextField';




const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,

  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

  }),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
}));
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginBottom: theme.spacing(2), // Add margin at the bottom of the table container
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createData(id, username, email, tel, namebank, rank, statused) {
  return {
    id,
    username,
    email,
    tel,
    rank,
    statused,
  };
}
const rows = [];

function createData2(ida, username2, email2, password, statusad) {
  return {
    ida,
    username2,
    email2,
    password,
    statusad,
  };
}
const rowad = [
  createData2(1, 'Addmin1', 'fufu@gmail.com', 'addmin505', 'active'),
  createData2(2, 'Addmin2', 'goofy@gmail.com', 'addmin75', 'active'),
  createData2(3, 'Addmin3', 'snoopy@gmail.com', 'addmin127', 'banned'),
];

const ranklist = ['bronze', 'silver', 'gold', 'platinum'];

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'rank') {
    return ranklist.indexOf(b[orderBy]) - ranklist.indexOf(a[orderBy]);
  } else if (orderBy === 'statused') {
    const statusOrder = { 'Active': 1, 'banned': 2 };
    return statusOrder[b[orderBy]] - statusOrder[a[orderBy]]; // สลับ a และ b เพื่อให้เรียงจากน้อยไปมาก
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: '#e5db9c' }}>
      <TableRow>
        <StyledTableCell align="left" onClick={createSortHandler('username')}>
          ชื่อผู้ใช้</StyledTableCell>
        <StyledTableCell align="left" onClick={createSortHandler('email')}>
          อีเมล</StyledTableCell>
        <StyledTableCell align="left" onClick={createSortHandler('tel')}>
          เบอร์โทร</StyledTableCell>
        <StyledTableCell align="left" onClick={createSortHandler('statused')}>
          สถานะ</StyledTableCell>
        <StyledTableCell align="left"></StyledTableCell>
      </TableRow>
    </TableHead>
  );
}


EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#FEFAE0',
  '&:hover': {
    backgroundColor: '#FEFAE0',
  },
  margin: theme.spacing(2),
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    width: '100',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const handleBlockClick = () => {
  /*console.log('Click');*/
};

function EnhancedTableToolbar(props) {
  const { numSelected, onRequestSort } = props;


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
          <IconButton>
            <BlockIcon sx={{ color: red[800] }} />
          </IconButton>
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Banned">
          <IconButton onClick={handleBlockClick}>
            <BlockIcon sx={{ color: red[800] }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Addminuser() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentView, setCurrentView] = useState('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [originalData, setOriginalData] = useState('');
  const [anchorEl, setAnchorEl] = React.useState('');
  const [age, setAge] = React.useState('');
  const [rank, setrank] = useState('');
  const [statused, setStatused] = useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialog1, setOpenDialog1] = React.useState(false);
  const opened = Boolean(anchorEl);
  const [profile, setProfile] = useState([]);
  const [profileadmin, setProfileadmin] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [nameranks, setNameranks] = useState([]);
  const [imagerank, setImageranks] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorE2, setAnchorE2] = React.useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/user`)
      .then((response) => {
        setProfile(response.data)
      })
  }, [profile])

  useEffect(() => {
    axios.get(`http://localhost:5000/rank`)
      .then((response) => {
        setRanks(response.data)
      })
  }, [ranks])

  /*console.log(filteredProducts)*/

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // ตรวจสอบว่า query เป็นค่าว่างหรือไม่
    if (query.trim() === "") {
      // หากเป็นค่าว่าง ให้ใช้ข้อมูลเดิมเพื่อรีเซ็ตค่า
      setFilteredProducts(originalData);
    } else {
      // หากไม่ใช่ค่าว่าง ให้กรองข้อมูลตาม query
      filterProducts(query);
    }
  };

  useEffect(() => {
    // ตรวจสอบว่า query เป็นค่าว่างหรือไม่
    if (searchQuery.trim() === "") {
      // หากเป็นค่าว่าง ให้ใช้ข้อมูลเดิมเพื่อรีเซ็ตค่า
      setFilteredProducts(originalData);
    } else {
      // หากไม่ใช่ค่าว่าง ให้กรองข้อมูลตาม query
      filterProducts(searchQuery);
    }
  }, [searchQuery, originalData]);

  useEffect(() => {
    const rows = []; setFilteredProducts(rows);
    setOriginalData(rows);
  }, []);

  const filterProducts = (query) => {
    const filtered = originalData.filter((product) =>
      product.username.toLowerCase().includes(query.toLowerCase()) ||
      product.email.toLowerCase().includes(query.toLowerCase()) ||
      product.tel.toLowerCase().includes(query.toLowerCase()) ||
      product.statused.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const filterData = (query) => {
    const filtered = originalData.filter((rowData) =>
      rowData.username2 && rowData.username2.toLowerCase().includes(query.toLowerCase()) ||
      rowData.email2 && rowData.email2.toLowerCase().includes(query.toLowerCase()) ||
      rowData.password && rowData.password.toLowerCase().includes(query.toLowerCase()) ||
      rowData.statusad && rowData.statusad.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const handleSearchChange2 = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredRows(originalData);
    } else {
      filterData(query);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRows(originalData);
    } else {
      filterData(searchQuery);
    }
  }, [searchQuery, originalData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const handleChange2 = (event) => {
    setImageranks(event.target.value);
  };


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.currentTarget);
  };

  const handlechoose = (event) => {
    setAnchorEl(event)
    /*console.log('text', event)*/
  };

  const handlechoose1 = (event) => {
    setAnchorE2(event)
    /*console.log('text', event)*/
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClose1 = () => {
    setOpenDialog1(false);
  };

  const handleChange = (event) => {
    setStatused(event.target.value);
  };

  const handleOk = () => {
    /*console.log('Selected Status:', statused);*/
    axios.put(`http://localhost:5000/updateStatususer/${anchorEl}`, {
      statused: statused,
    })
    setOpenDialog(false);
  };
  
  const handleOk1 = () => {
    // ทำสิ่งที่คุณต้องการกับค่าที่เลือก เช่น บันทึกลงในฐานข้อมูล
    if (selectedRow) {
    console.log('New Rank Name:', nameranks);
    
    axios.put(`http://localhost:5000/updaterank/${selectedRow.rank_id}`, {
      nameranks: nameranks,
    })}
    setOpenDialog1(false);
  };

  const handleClick1 = (email) => {
    // ทำอะไรกับ email ที่ได้รับ เช่น เก็บไว้ในตัวแปร state หรือทำการประมวลผลเพิ่มเติม
    console.log(email);
  };

  <EnhancedTableToolbar
    onRequestSort={handleRequestSort}
  />

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredProducts, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [filteredProducts, order, orderBy, page, rowsPerPage],
  );

  const switchToMainView = () => {
    setCurrentView('main');
  };


  const handleEdit1 = (row) => {
    setSelectedRow(row); // เมื่อคลิกที่ปุ่ม "แก้ไข" ในแถวแรงค์ที่เลือก ให้เซ็ตแรงค์ที่ถูกเลือกไว้
    setNameranks(row.rank_name); // กำหนดค่าเริ่มต้นให้ช่องข้อมูลแรงค์ใน Dialog เป็นค่าปัจจุบันของแรงค์ที่เลือก
    setOpenDialog1(true); // เปิด Dialog
  };

  const switchToAddView = () => {
    setCurrentView('addmin');
  };

  const switchToRankView = () => {
    setCurrentView('rank');
  };
  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      // Select all rows
      const selectedIds = visibleRows.map((rows) => rows.id);
      setSelected(selectedIds);
    } else {
      // Deselect all rows
      setSelected([]);
    }
  };

  return (
    <div>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: 'limegreen' }}
        >
          <Toolbar>
            <Typography variant="h5" noWrap component="div">
              ADMIN
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"

        >
          <Toolbar />

          <List>
            {['จัดการผู้ใช้ระบบ'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={switchToMainView} >
                  <ListItemIcon>
                    {index % 2 === 0 ? <AccountCircleIcon /> : <ShoppingCartIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['จัดการแรงค์'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={switchToRankView}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box sx={{ flexGrow: 1, margin: 6 }}>
          {currentView === 'main' && (
            <>
              <h1>USERS AVB ACCOUNTS</h1>
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, backgroundColor: '#FEFAE0' }}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={handleSearchChange}
                      value={searchQuery}
                    />
                  </Search>

                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? 'small' : 'medium'}
                    >
                      <EnhancedTableHead
                        onSelectAllClick={handleSelectAllClick}
                        order={order}
                        orderBy={orderBy}
                        numSelected={selected.length}
                        rowCount={filteredRows.length}
                        onRequestSort={handleRequestSort} // ตรวจสอบว่า onRequestSort ถูกส่งเข้ามาใน EnhancedTableHead อย่างถูกต้อง
                      />
                      <TableBody>
                        {profile.map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={row.id}
                              onClick={() => handleClick1(row.email)}
                            >
                              <TableCell align="left">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <AvatarGroup max={0}>
                                    {/* มีรูปภาพ */}
                                    {/*<Avatar alt={row.username} src={`/avatars/${row.id}.jpg`} />*/}
                                    {/* ไม่มีรูปภาพ */}
                                    <Avatar alt={row.image} src={row.image} />
                                  </AvatarGroup>
                                  <Box sx={{ ml: 1 }}>{row.username}</Box>
                                </Box>
                              </TableCell>
                              <TableCell align="left">{row.email}</TableCell>
                              <TableCell align="left">{row.tel}</TableCell>
                              <TableCell align="left">
                                <Chip
                                  label={row.statused}
                                  color={row.statused === 'Active' ? 'success' : 'error'}
                                />
                              </TableCell>
                              <TableCell align="left">
                                <React.Fragment>
                                  <IconButton
                                    aria-controls={opened ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={opened ? 'true' : undefined}
                                    onClick={(event) => {
                                      handlechoose(row.email);
                                      event.stopPropagation();
                                      setOpenDialog(true);
                                    }}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>

                                </React.Fragment>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            </>
          )}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>EDIT</DialogTitle>
            <DialogContent>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  native
                  value={statused}
                  onChange={handleChange}
                  input={<OutlinedInput label="statuse" />}
                >
                  <option aria-label="None" value="" />
                  <option value={('Active')}>Active</option>
                  <option value={('Banned')}>Banned</option>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handleOk(statused)} >Ok</Button>
            </DialogActions>
          </Dialog>
          {currentView === 'addmin' && (
            <>
              <h1>ADMIN ACCOUNTS</h1>
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, backgroundColor: '#FEFAE0' }}>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? 'small' : 'medium'}
                    >
                      <TableHead
                        sx={{ backgroundColor: '#e5db9c' }}
                      >
                        <TableRow>
                          <TableCell align="center">แอดมิน</TableCell>
                          <TableCell align="center">เมล์</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((rowad) => (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={rowad.ida}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AvatarGroup max={0}>
                                  {/* มีรูปภาพ */}
                                  {/*<Avatar alt={row.username} src={`/avatars/${row.id}.jpg`} />*/}
                                  {/* ไม่มีรูปภาพ */}
                                  <Avatar alt={rowad.username2} src={<AccountCircleIcon />} />
                                </AvatarGroup>
                                <Box sx={{ ml: 1 }}>{rowad.username2}</Box>
                              </Box>
                            </TableCell>
                            <TableCell align="right">{rowad.email2}</TableCell>
                            <TableCell align="right">{rowad.password}</TableCell>
                            <TableCell align="right">
                              <Chip
                                label={rowad.statusad}
                                color={rowad.statusad === 'Active' ? 'success' : 'error'}
                              />
                            </TableCell>
                            <TableCell align="left">
                              <React.Fragment>
                                <IconButton
                                  aria-controls={opened ? 'basic-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={opened ? 'true' : undefined}
                                  onClick={(event) => {
                                    handlechoose(event, rowad.id);
                                    event.stopPropagation();
                                    setOpenDialog(true);
                                  }}
                                >
                                  <MoreVertIcon />
                                </IconButton>

                              </React.Fragment>
                            </TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </>
          )}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>EDIT</DialogTitle>
            <DialogContent>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  native
                  value={statused}
                  onChange={handleChange}
                  input={<OutlinedInput label="statused" />}
                >
                  <option aria-label="None" value="" />
                  <option value={('Active')}>Active</option>
                  <option value={('Banned')}>Banned</option>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
          </Dialog>
          {currentView === 'rank' && (
            <>
              <h1>Rank Tier</h1>
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, backgroundColor: '#FEFAE0' }}>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size="medium"
                    >
                      <TableHead sx={{ backgroundColor: '#e5db9c' }}>
                        <TableRow>
                          <TableCell align="center">อันดับ</TableCell>
                          <TableCell align="center">ชื่อแรงค์</TableCell>
                          <TableCell align="center">แรงค์</TableCell>
                          <TableCell align="center">แก้ไข</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ranks.map((rowad) => (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={rowad.ida}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center">{rowad.rank_id}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={rowad.rank_name}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <img src={`http://localhost:5000/image/${rowad.rank_image}`} style={{ width: '50px', height: '50px' }} />
                            </TableCell>
                            <TableCell align="center">
                              <IconButton onClick={() => handleEdit1(rowad)}>
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </>
          )}
          <Dialog open={openDialog1} onClose={handleClose1}>
            <DialogTitle>แก้ไขข้อมูล</DialogTitle>
            <DialogContent>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField
                  value={nameranks}
                  onChange={(e) => setNameranks(e.target.value)}
                  label="ชื่อแรงค์"
                  variant="outlined"
                  InputProps={{ inputProps: { autoFocus: true } }}
                />
              </FormControl>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1}>Cancel</Button>
              <Button onClick={() => handleOk1(nameranks)}> Ok </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Box>
    </div>
  )
}
