"use client";

// import { useAuth, SignOutButton } from "@clerk/nextjs";

// export default function SignOutForCurrentSession() {
//   const { sessionId }: any = useAuth();

//   return (
//     <SignOutButton signOutOptions={{ sessionId }} redirectUrl="/sign-in">
//       <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
//         Sign Out of This Session
//       </button>
//     </SignOutButton>
//   );
// }

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            card: "glass-effect",
          },
        }}
      />
    </div>
  );
}
