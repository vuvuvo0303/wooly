import { Link, NavLink, useNavigate } from "react-router-dom";
import Wooly_Logo from "~/assets/Logo/Wooly_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { persistor } from "~/redux/store";
import { logoutUser } from "~/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
  };

  //   const handleSearch = (e) => {
  //     if (e.key === "Enter" && searchText.trim() !== "") {
  //       navigate(`/collection?search=${encodeURIComponent(searchText)}`);
  //       setShowSearch(false);
  //     }
  //   };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      const queryParams = new URLSearchParams(location.search);
      const currentCategory = queryParams.get("category") || ""; // Lấy category hiện tại từ URL nếu có

      const params = new URLSearchParams({
        search: searchText,
        category: currentCategory,
      }).toString();

      navigate(`/collection?${params}`);
      setShowSearch(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <img src={Wooly_Logo} className="w-28" alt="Wooly Logo" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>TRANG CHỦ</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>SẢN PHẨM</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>GIỚI THIỆU</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>LIÊN HỆ</p>
        </NavLink>
      </ul>

      {/* Thanh tìm kiếm */}
      <div className="flex items-center gap-3">
        <div>
          <IconButton onClick={() => setShowSearch(true)}>
            <SearchIcon className="cursor-pointer" />
          </IconButton>
          {/* Ô tìm kiếm */}
          <div
            className={`flex items-center absolute top-24 left-0 w-[250px] sm:w-[100%] bg-white shadow-lg p-2 rounded-md transition-transform duration-300 ${
              showSearch
                ? "translate-y-2 opacity-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <IconButton
              onClick={() => {
                setShowSearch(false);
                setSearchText("");
              }}
              className="left-1"
            >
              <CloseIcon style={{ color: "#cdcdcd" }} />
            </IconButton>
          </div>
        </div>

        <div className="group-relative">
          <IconButton onClick={handleClick}>
            <PersonOutlineIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{ width: 320, maxWidth: "100%" }}
          >
            {accessToken ? (
              <>
                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem component={Link} to="/orders" onClick={handleClose}>
                  My Orders
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem component={Link} to="/login" onClick={handleClose}>
                Login
              </MenuItem>
            )}
          </Menu>
        </div>

        <Link to="/cart" className="relative">
          <IconButton>
            <Badge badgeContent={4} color="primary">
              <LocalMallIcon color="action" />
            </Badge>
          </IconButton>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
