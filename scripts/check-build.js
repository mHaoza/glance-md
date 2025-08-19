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

function main() {
  log('🔍 检查构建产物...', 'blue');
  
  const bundleDir = path.join('src-tauri', 'target', 'release', 'bundle');
  
  if (!fs.existsSync(bundleDir)) {
    log('❌ 构建产物目录不存在', 'red');
    log('请先运行: pnpm tauri build', 'yellow');
    return;
  }
  
  log('\n📁 构建产物目录:', 'blue');
  log(bundleDir, 'green');
  
  try {
    const output = execSync(`find "${bundleDir}" -type f -name "*.msi" -o -name "*.exe"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(f => f);
    
    if (files.length === 0) {
      log('❌ 未找到MSI或EXE文件', 'red');
    } else {
      log('✅ 找到以下构建产物:', 'green');
      files.forEach(file => {
        const relativePath = path.relative('.', file);
        const size = fs.statSync(file).size;
        const sizeMB = (size / 1024 / 1024).toFixed(2);
        log(`  📄 ${relativePath} (${sizeMB} MB)`, 'green');
      });
    }
  } catch (error) {
    log('❌ 无法列出构建产物', 'red');
    log(error.message, 'red');
  }
}

main();
