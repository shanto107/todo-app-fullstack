import PageSpinner from "@/components/common/loading/page-spinner";
import ProfileForm from "../components/profile/profile-form";
import { useProfile } from "../hooks/profile/use-profile";
import { ProfileErrorCard } from "../components/profile/profile-error-card";

export default function ProfilePage() {
    const { data: profile, isLoading, isError, error, refetch } = useProfile();

    if (isLoading) {
        return <PageSpinner />;
    }

    if (isError || !profile) {
        return (
            <div className="py-10">
                <ProfileErrorCard
                    message={error instanceof Error ? error.message : undefined}
                    onRetry={() => void refetch()}
                />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <ProfileForm profile={profile} />
        </div>
    );
}
