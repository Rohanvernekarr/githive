
'use client'

import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth';

export default function AuthProvider({ 
  children,
  session 
}: { 
  children: React.ReactNode;
  session?:  Session;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}