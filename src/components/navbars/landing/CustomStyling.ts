import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CustomBox = styled(Box)({
    position: 'absolute',
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400",
    backgroundColor: "black",
    border: '1px solid #FFF',
    borderRadius: "5px",
    boxShadow: "24",
    p: "4",
    "&:focus": {
        outline: 'none',
    },
    maxWidth: 400,
});

