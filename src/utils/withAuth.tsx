import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { auth } from "./firebase";

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const unsub = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/sign-in");
        }
      });

      return () => unsub();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
