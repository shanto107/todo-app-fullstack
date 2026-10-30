import { Spinner } from "@/components/ui/spinner";

export default function PageSpinner() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Spinner className="size-8" />
        </div>
    );
}
