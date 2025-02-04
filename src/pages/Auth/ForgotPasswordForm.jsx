import { Link } from "react-router-dom";
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
} from "~/utils/validators";
function ForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitLogIn = (data) => {
        console.log("Submit login:", data);
    };
    return (
        <form onSubmit={handleSubmit(submitLogIn)}>
            <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                <MuiCard
                    sx={{ minWidth: 380, maxWidth: 380, marginTop: "6em" }}
                >
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
                            <FieldErrorAlert
                                errors={errors}
                                fieldName={"email"}
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
                            Xác Thực
                        </Button>
                    </CardActions>
                    <Box sx={{ padding: "0 1em 1em 1em", textAlign: "center" }}>
                        <Typography>Bạn đã có tài khoản ?</Typography>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            <Typography
                                sx={{
                                    color: "primary.main",
                                    "&:hover": { color: "#ffbb39" },
                                }}
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
