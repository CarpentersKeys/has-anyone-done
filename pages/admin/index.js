import { useRouter } from "next/router";

export default function Admin() {
    const router = useRouter();
    if (typeof window !== 'undefined' &&
        window.document && window.document.createElement) {

        router.push('admin/submit-entry')

    }
}