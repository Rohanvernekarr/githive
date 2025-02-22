'use client';

import { Suspense } from "react";
import SignInComponent from "./SignInComponent"; 

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInComponent />
    </Suspense>
  );
}
