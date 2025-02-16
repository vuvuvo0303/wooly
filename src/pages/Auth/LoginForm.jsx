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
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";

import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import { loginUserAPI } from "~/apis";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "~/redux/features/authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const submitLogIn = (data) => {
    console.log("Submit login:", data);
    const { email, password } = data;
    toast
      // .promise(loginUserAPI({ email, password }), {
      .promise(dispatch(loginUser({ email, password })), {
        pending: "Login is in progress...",
      })
      .then(() => {
        navigate(`/`);
      });
  };

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
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

          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "0 1em",
            }}
          ></Box>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                autoFocus
                fullWidth
                label="Nhập Email..."
                type="text"
                variant="outlined"
                error={!!errors["email"]}
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
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Nhập Password..."
                type="password"
                variant="outlined"
                error={!!errors["password"]}
                {...register("password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={"password"} />
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
              Đăng nhập
            </Button>
          </CardActions>
          <Box sx={{ padding: "0 1em 1em 1em", textAlign: "center" }}>
            <Typography>Bạn cần một tài khoản Wooly ?</Typography>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "primary.main",
                  "&:hover": { color: "#ffbb39" },
                }}
              >
                Đăng Ký
              </Typography>
            </Link>
          </Box>
          <Box sx={{ padding: "0 1em 1em 1em", textAlign: "center" }}>
            <Link to="/forgotPW" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "primary.main",
                  "&:hover": { color: "#ffbb39" },
                }}
              >
                Quên mật khẩu
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  );
}

export default LoginForm;
