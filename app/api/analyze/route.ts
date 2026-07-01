import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Resolve python script path
    const scriptPath = path.join(process.cwd(), "scripts", "analyzer.py");
    
    // Execute python script
    const command = `python "${scriptPath}" "${url}"`;
    console.log("Esecuzione comando:", command);
    
    try {
        const { stdout, stderr } = await execAsync(command);
        if (stderr && !stdout) {
          console.error("Python script error:", stderr);
          return NextResponse.json({ error: "Failed to analyze URL" }, { status: 500 });
        }
        
        const data = JSON.parse(stdout.trim());
        return NextResponse.json(data);
    } catch (e: any) {
        console.error("Exec err or parse err:", e);
        return NextResponse.json({ error: "Failed to parse python output" }, { status: 500 });
    }
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
