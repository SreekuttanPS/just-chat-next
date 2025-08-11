import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();
    return Response.json({ status: "✅ Connected to MongoDB" });
  } catch (error) {
    console.error("DB connection error:", error);
    return Response.json({ status: "❌ Failed to connect" }, { status: 500 });
  }
}
