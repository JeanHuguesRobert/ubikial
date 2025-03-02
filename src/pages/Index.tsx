
import { MainLayout } from "@/components/layout/MainLayout";
import { useUser } from "@clerk/clerk-react";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { WelcomeScreen } from "@/components/auth/WelcomeScreen";

const Index = () => {
  const { isSignedIn } = useUser();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {isSignedIn ? <Dashboard /> : <WelcomeScreen />}
      </div>
    </MainLayout>
  );
};

export default Index;
