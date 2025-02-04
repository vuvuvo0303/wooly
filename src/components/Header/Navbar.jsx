import { Link, NavLink } from "react-router-dom";
import Wooly_Logo from "~/assets/Logo/Wooly_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <img src={Wooly_Logo} className="w-28" alt="" />
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>TRANG CHỦ</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink
                    to="/collection"
                    className="flex flex-col items-center gap-1"
                >
                    <p>SẢN PHẨM</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink
                    to="/about"
                    className="flex flex-col items-center gap-1"
                >
                    <p>GIỚI THIỆU</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink
                    to="/contact"
                    className="flex flex-col items-center gap-1"
                >
                    <p>LIÊN HỆ</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
            </ul>

            <div className="flex items-center gap-3">
                <IconButton>
                    <SearchIcon className="cursor-pointer" />
                </IconButton>

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
                        <MenuItem
                            component={Link}
                            to="/profile"
                            onClick={handleClose}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/orders"
                            onClick={handleClose}
                        >
                            My Orders
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/login"
                            onClick={handleClose}
                        >
                            Logout
                        </MenuItem>
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
