import { defineConfig } from 'astro/config';
import { execSync } from 'node:child_process';

function commitHashPlugin() {
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  const commitDate = execSync('git log -1 --format=%cd').toString().trim();
  const message = execSync('git log -1 --format=%s').toString().trim();

  return {
    name: 'inject-commit-info',
    transformIndexHtml(html) {
      return `<!-- Build: ${commitDate} | ${message} | ${commitHash} -->\n` + html;
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [commitHashPlugin()],
  },
  site: 'https://www.silapadin.com',
  output: 'static',
  build: {
    format: 'file',
  },
});
