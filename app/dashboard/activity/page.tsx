// import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity | Dashboard",
};

export default async function ActivityPage() {
  // const user = await currentUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Recent Activity</h1>
      <p className="text-gray-600">
        {/* Activity logs for {user?.firstName || "User"} */}
      </p>

      <ul className="mt-6 space-y-4">
        <li className="p-4 bg-gray-100 rounded shadow-sm">
          ✅ You joined the "Frontend Team" - 2 days ago
        </li>
        <li className="p-4 bg-gray-100 rounded shadow-sm">
          📝 Updated profile information - 5 days ago
        </li>
        <li className="p-4 bg-gray-100 rounded shadow-sm">
          🚀 Logged in from a new device - 1 week ago
        </li>
      </ul>
    </div>
  );
}
