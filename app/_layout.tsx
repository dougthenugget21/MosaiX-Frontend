import { AuthProvider } from "./(context)/Authcontext";
import MainLayout from "./(context)/MainLayout";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
