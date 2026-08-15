const { execSync } = require("child_process");

console.log("🚀 Starting One-Click Live Production Deployment Pipeline...\n");

try {
  // Step 1: Run Next.js Build Verification
  console.log("📦 1. Validating production build...");
  execSync("npm run build", { stdio: "inherit" });
  console.log("✅ Build verification passed cleanly!\n");

  // Step 2: Git Auto-Commit
  console.log("💾 2. Committing code changes...");
  const commitMessage = `Auto-deploy update: ${new Date().toISOString()}`;
  execSync("git add .", { stdio: "inherit" });
  try {
    execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
  } catch {
    console.log("ℹ️ No uncommitted changes found, proceeding to push...");
  }
  console.log("✅ Changes committed!\n");

  // Step 3: Git Push to Main Branch (Triggers Instant Live Deployment)
  console.log("🌐 3. Pushing to GitHub main branch (Triggers Vercel Live Deployment)...");
  execSync("git push origin main", { stdio: "inherit" });
  console.log("\n🎉 LIVE DEPLOYMENT TRIGGERED SUCCESSFULLY!");
  console.log(" Your live website is updating in < 30 seconds!\n");
} catch (err) {
  console.error("\n❌ Deployment halted due to error:", err.message);
  process.exit(1);
}
