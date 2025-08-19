#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 颜色输出
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    log(`命令执行失败: ${command}`, 'red');
    process.exit(1);
  }
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

function updateVersion(newVersion) {
  // 更新 package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');

  // 更新 Cargo.toml
  const cargoTomlPath = 'src-tauri/Cargo.toml';
  let cargoToml = fs.readFileSync(cargoTomlPath, 'utf8');
  cargoToml = cargoToml.replace(/^version = "([^"]+)"/m, `version = "${newVersion}"`);
  fs.writeFileSync(cargoTomlPath, cargoToml);

  log(`版本已更新为: ${newVersion}`, 'green');
}

function createTag(version) {
  const tag = `v${version}`;
  
  log(`创建标签: ${tag}`, 'blue');
  exec(`git add .`);
  exec(`git commit -m "chore: bump version to ${version}"`);
  exec(`git tag ${tag}`);
  exec(`git push origin main`);
  exec(`git push origin ${tag}`);
  
  log(`标签 ${tag} 已创建并推送到远程仓库`, 'green');
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('使用方法: node scripts/release.js <version>', 'yellow');
    log('示例: node scripts/release.js 1.0.0', 'yellow');
    log('当前版本: ' + getCurrentVersion(), 'blue');
    process.exit(1);
  }

  const newVersion = args[0];
  const currentVersion = getCurrentVersion();

  log(`准备发布新版本: ${currentVersion} -> ${newVersion}`, 'blue');

  // 检查工作目录是否干净
  try {
    exec('git diff-index --quiet HEAD --', { stdio: 'pipe' });
  } catch (error) {
    log('工作目录不干净，请先提交或暂存更改', 'red');
    process.exit(1);
  }

  // 更新版本
  updateVersion(newVersion);

  // 创建标签
  createTag(newVersion);

  log('🎉 发布流程完成！', 'green');
  log('GitHub Actions 将自动构建并发布新版本', 'blue');
}

// ES 模块不需要 require.main 检查，直接调用
main();
