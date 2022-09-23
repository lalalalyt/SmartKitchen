import { Alert, Snackbar } from "@mui/material"
type Props={
  toastLogin: boolean,
  setToastLogin: React.Dispatch<React.SetStateAction<boolean>>
}
const ToastLogin=({toastLogin,setToastLogin}:Props)=>{
    return (<Snackbar
        open={toastLogin}
        autoHideDuration={2000}
        onClose={() => setToastLogin(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastLogin(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          You have successfully logged in!
        </Alert>
      </Snackbar>)
}

export default ToastLogin