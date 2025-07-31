// import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams | Dashboard",
};

export default async function TeamsPage() {
  // const user = await currentUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Teams</h1>
      {/* <p className="text-gray-600">Welcome, {user?.firstName || "Guest"}!</p> */}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Example team cards */}
        <div className="p-4 border rounded shadow">
          <h2 className="font-medium text-lg">Frontend Team</h2>
          <p className="text-sm text-gray-500">4 Members • Active</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-medium text-lg">Backend Team</h2>
          <p className="text-sm text-gray-500">6 Members • Active</p>
        </div>
      </div>
    </div>
  );
}
