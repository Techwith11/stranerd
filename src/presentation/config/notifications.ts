import SweetAlert from "sweetalert2"

const Toast = SweetAlert.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
});

type Args = {
    title: string,
    icon?: 'warning' | 'success' | 'error' | 'info'
}

export const notify = (args: Args) => {
    return Toast.fire({
        title: args.title,
        icon: args.icon ?? 'info',
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
    })
}
