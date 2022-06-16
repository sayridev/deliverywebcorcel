import { TYPEALERT } from "../context/snackBar/SnackBarReducer";

export const GetColor = (typeAlert: TYPEALERT) => {
    if (typeAlert === TYPEALERT.ERROR) {
        return '#bb2124';
    }
    if (typeAlert === TYPEALERT.DANGER) {
        return '#bb2124';
    }
    if (typeAlert === TYPEALERT.INFO) {
        return '#5bc0de';
    }
    if (typeAlert === TYPEALERT.SUCCESS) {
        return '#22bb33';
    }
    if (typeAlert === TYPEALERT.WARNING) {
        return '#f0ad4e';
    }
}