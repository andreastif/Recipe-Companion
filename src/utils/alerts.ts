import Swal from "sweetalert2";

export function sweetAlertSuccess(title: string, text: string) {
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        background: "#2b3035"
    });
}

export function sweetAlertError(title: string, text: string) {
    Swal.fire({
        title: title,
        text: text,
        icon: "error",
        background: "#2b3035"
    });
}