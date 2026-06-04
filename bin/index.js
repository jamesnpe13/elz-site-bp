#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import open from "open";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2];

const templateDir = path.join(__dirname, "..", "template");
const targetDir = path.join(process.cwd(), projectName);

fs.mkdirSync(targetDir, { recursive: true });

// STEP 1: copy files
for (const file of fs.readdirSync(templateDir)) {
  fs.copyFileSync(
    path.join(templateDir, file),
    path.join(targetDir, file)
  );
}

console.log(`Created ${projectName}`);

// STEP 2: INSTALL DEPENDENCY (PUT YOUR CODE HERE)
console.log(`Installing dependencies...`);

execSync("npm install elz-ui", {
  cwd: targetDir,
  stdio: "inherit"
});

console.log(`Dependencies installed`);

// STEP 3: open browser
const htmlPath = path.join(targetDir, "index.html");
await open(htmlPath);