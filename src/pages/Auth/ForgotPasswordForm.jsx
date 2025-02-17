import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Zoom from "@mui/material/Zoom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import { forgotPassword, getOtp } from "~/redux/features/authSlice";

function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // const submitResetPass = (data) => {
  //   const formattedData = {
  //     otp: data.otp,
  //     email: data.email,
  //     newPassword: data.password,
  //   };
  //   console.log("Submit reset password:", formattedData);
  //   dispatch(forgotPassword(formattedData));
  // };
  const submitResetPass = async (data) => {
    const formattedData = {
      otp: data.otp,
      email: data.email,
      newPassword: data.password,
    };

    const response = await dispatch(forgotPassword(formattedData));
    console.log("forgotPassword", response);

    const stt = await response?.meta?.requestStatus;
    console.log("stt", stt);
    navigate("/register");
    // if (stt === "fulfilled") {
    //   navigate("/register");
    // }
  };

  const handleGetOTP = () => {
    const email = watch("email")?.trim();
    if (!email) {
      toast.error("Vui lòng nhập email trước khi lấy OTP!");
      return;
    }
    dispatch(getOtp(email));
  };

  return (
    <form onSubmit={handleSubmit(submitResetPass)}>
      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: "6em" }}>
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <LockIcon />
            </Avatar>
          </Box>

          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                autoFocus
                fullWidth
                label="Nhập Email..."
                type="text"
                variant="outlined"
                error={!!errors.email}
                {...register("email", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE,
                  },
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={"email"} />
            </Box>
            <Box sx={{ marginTop: "1em", display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label="Nhập OTP..."
                type="text"
                variant="outlined"
                error={!!errors.otp}
                {...register("otp", {
                  required: FIELD_REQUIRED_MESSAGE,
                })}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetOTP}
              >
                Get OTP
              </Button>
            </Box>
            <FieldErrorAlert errors={errors} fieldName={"otp"} />
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Nhập Password..."
                type="password"
                variant="outlined"
                error={!!errors.password}
                {...register("password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                  validate: (value) => {
                    if (
                      watch("password_confirmation") &&
                      value !== watch("password_confirmation")
                    ) {
                      return PASSWORD_CONFIRMATION_MESSAGE;
                    }
                    return true;
                  },
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={"password"} />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Nhập Password Confirmation..."
                type="password"
                variant="outlined"
                error={!!errors.password_confirmation}
                {...register("password_confirmation", {
                  required: FIELD_REQUIRED_MESSAGE,
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return PASSWORD_CONFIRMATION_MESSAGE;
                    }
                    return true;
                  },
                })}
              />
              <FieldErrorAlert
                errors={errors}
                fieldName={"password_confirmation"}
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Thay đổi mật khẩu
            </Button>
          </CardActions>
          <Box sx={{ padding: "0 1em 1em 1em", textAlign: "center" }}>
            <Typography>Bạn đã có tài khoản ?</Typography>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography
                sx={{ color: "primary.main", "&:hover": { color: "#ffbb39" } }}
              >
                Đăng nhập
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  );
}

export default ForgotPasswordForm;
