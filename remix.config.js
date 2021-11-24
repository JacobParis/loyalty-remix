/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
}
