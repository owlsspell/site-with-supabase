'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import Swal from "sweetalert2";

export default function ModalMessage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const status = searchParams.get('status')
    const { pending } = useFormStatus()
    useEffect(() => {
        if (pending) {
            Swal.showLoading();
        }
        if (status === 'success')
            Swal.fire({
                icon: "success",
                title: "Data has been updated!",
                timer: 2000,
            }).then(() => router.push('/organizations/settings'))
        if (status === 'error') {
            Swal.fire({
                icon: "error",
                title: "Try again",
                text: "Data was not updated",
                timer: 2000,
            }).then(() => router.push('/organizations/settings'))
        }
    }, [])
    return (
        <></>
    );
}