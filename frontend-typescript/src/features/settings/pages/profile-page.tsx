import ProfileForm from "../components/profile/profile-form";
import { useProfile } from "../hooks/profile/use-profile";

export default function ProfilePage() {
    const { data: profile, isLoading, isError, error, refetch } = useProfile();

    if (isLoading) {
        return (
            <div className="text-muted-foreground py-10 text-center text-sm">
                Loading profile...
            </div>
        );
    }

    if (isError || !profile) {
        return (
            <div className="space-y-3 py-10 text-center">
                <p className="text-destructive text-sm">
                    {error instanceof Error
                        ? error.message
                        : "Unable to load your profile."}
                </p>
                <button
                    type="button"
                    onClick={() => void refetch()}
                    className="text-sm underline underline-offset-4"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <ProfileForm profile={profile} />
        </div>
    );
}
