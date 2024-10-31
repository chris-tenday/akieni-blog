import {useNuxtApp} from "#app";

/**
 * Composable used to manage the display of notification message across the app.
 */
export default function(){
    const {$swal}=useNuxtApp();

    const display=(message:string,type:string="success")=>{
        $swal.fire({
            toast: true,
            position: 'top-right',
            title: message,
            timer: 5000,
            icon:type,
            timerProgressBar: true,
            showConfirmButton: false
        });
    };

    return {
        display
    }
}