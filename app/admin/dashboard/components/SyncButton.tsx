"use client";

import { useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSync = async () => {
    setIsSyncing(true);
    setStatus("idle");
    setMessage("Syncing...");

    let hasMore = true;
    let totalSynced = 0;

    try {
      while (hasMore) {
        const res = await fetch("/api/admin/sync", {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to sync");
        }

        totalSynced += data.count;
        hasMore = data.hasMore;

        if (hasMore) {
          setMessage(`Synced ${totalSynced}... Continuing...`);
        } else {
          setMessage(totalSynced > 0 ? `Successfully synced ${totalSynced} records!` : "All records are already synced!");
          setStatus("success");
        }
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "An error occurred during sync");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
      >
        <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
        {isSyncing ? "Syncing..." : "Sync to Google Sheets"}
      </button>
      
      {status === "success" && (
        <p className="text-sm text-green-700 flex items-center gap-1 font-medium">
          <CheckCircle className="w-4 h-4" /> {message}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 flex items-center gap-1 font-medium">
          <AlertCircle className="w-4 h-4" /> {message}
        </p>
      )}
      {isSyncing && (
        <p className="text-sm text-gray-600">
          {message}
        </p>
      )}
    </div>
  );
}
