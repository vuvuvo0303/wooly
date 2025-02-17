import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "~/redux/features/accountSlice";

function Profile() {
  const dispatch = useDispatch();
  const { userr, status } = useSelector((state) => state.account);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [status, dispatch]);

  const [user, setUser] = useState({
    avatar: "https://i.pravatar.cc/150?img=3",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123 456 789",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
  });

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState(user.avatar);
  const [editedUser, setEditedUser] = useState(user);

  // Xử lý mở & đóng modal
  const openAvatarModal = () => setIsAvatarModalOpen(true);
  const closeAvatarModal = () => setIsAvatarModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // Xử lý upload ảnh
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewAvatar(imageUrl);
    }
  };

  const saveAvatar = () => {
    setUser((prev) => ({ ...prev, avatar: newAvatar }));
    closeAvatarModal();
  };

  // Xử lý cập nhật thông tin cá nhân
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setUser(editedUser);
    closeEditModal();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-center mb-6">Thông Tin Cá Nhân</h1>

      {/* Hồ sơ */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row gap-6">
        {/* Ảnh đại diện */}
        <div className="flex flex-col items-center">
          <Avatar
            src={user.avatar}
            alt="Avatar"
            sx={{ width: 128, height: 128, cursor: "pointer" }}
            onClick={openAvatarModal} // Mở modal khi click vào avatar
          />
        </div>

        {/* Thông tin cá nhân */}
        <div className="flex-1">
          <p className="text-xl font-semibold mb-2">{user.name}</p>
          <p className="text-gray-700">📧 {user.email}</p>
          <p className="text-gray-700">📞 {user.phone}</p>
          <p className="text-gray-700">📍 {user.address}</p>
          <Button
            variant="contained"
            color="success"
            onClick={openEditModal}
            sx={{ mt: 2 }}
          >
            Chỉnh sửa hồ sơ
          </Button>
        </div>
      </div>

      {/* Modal thay đổi ảnh đại diện */}
      <Dialog open={isAvatarModalOpen} onClose={closeAvatarModal}>
        <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {newAvatar && (
            <Avatar
              src={newAvatar}
              alt="New Avatar"
              sx={{ width: 128, height: 128, mt: 2, mx: "auto" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAvatarModal} color="secondary">
            Hủy
          </Button>
          <Button onClick={saveAvatar} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal chỉnh sửa hồ sơ */}
      <Dialog open={isEditModalOpen} onClose={closeEditModal}>
        <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Họ và tên"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Số điện thoại"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Địa chỉ"
            name="address"
            value={editedUser.address}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal} color="secondary">
            Hủy
          </Button>
          <Button onClick={saveProfile} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
