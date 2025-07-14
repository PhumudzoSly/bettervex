"use client";

import { createContext, useContext, ReactNode } from "react";

/**
 * The shape of the session context, containing user and organization information.
 */
interface SessionContextType {
  userId: string;
  org: string;
  email: string;
  name: string;
  image: string | null | undefined;
  role: string;
  orgName: string;
  memberId: string;
  token: string;
}

/**
 * React context for session data, providing user and organization details throughout the app.
 */
const SessionContext = createContext<SessionContextType | undefined>(undefined);

/**
 * Provides the session context to its children.
 * @param {Object} props - The props for the provider.
 * @param {ReactNode} props.children - The child components.
 * @param {SessionContextType} props.sessionData - The session data to provide.
 * @returns {JSX.Element} The provider component wrapping its children.
 */
export function SessionProvider({
  children,
  sessionData,
}: {
  children: ReactNode;
  sessionData: SessionContextType;
}) {
  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  );
}

/**
 * Custom hook to access the session context.
 * @throws Will throw an error if used outside of a SessionProvider.
 * @returns {SessionContextType} The current session context value.
 */
export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
