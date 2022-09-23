import { Alert, Snackbar } from "@mui/material"
type Props={
  toastSignout: boolean,
  setToastSignout: React.Dispatch<React.SetStateAction<boolean>>
}
const ToastSignout=({toastSignout,setToastSignout}:Props)=>{
    return (<Snackbar
        open={toastSignout}
        autoHideDuration={2000}
        onClose={() => setToastSignout(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastSignout(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          You have successfully signed out!
        </Alert>
      </Snackbar>)
}

export default ToastSignout