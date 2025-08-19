// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::Serialize;
use std::fs;
use tauri::Manager;
use tauri_plugin_desktop_underlay::DesktopUnderlayExt;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Serialize)]
struct FilesPayload {
    markdown: String,
    style: String,
    base_dir: String,
    created_md: bool,
    created_css: bool,
}

// 默认内容：使用仓库内示例作为内置模板
const DEFAULT_MD: &str = include_str!("../data.md");
const DEFAULT_CSS: &str = include_str!("../../src/style.css");

#[tauri::command]
fn read_or_init_files() -> Result<FilesPayload, String> {
    let exe_dir = std::env::current_exe()
        .expect("Failed to get executable path")
        .parent()
        .expect("Failed to get executable directory")
        .to_path_buf();

    let md_path = exe_dir.join("data.md");
    let css_path = exe_dir.join("style.css");

    let mut created_md = false;
    let mut created_css = false;

    if !md_path.exists() {
        fs::write(&md_path, DEFAULT_MD).map_err(|e| format!("write data.md failed: {}", e))?;
        created_md = true;
    }
    if !css_path.exists() {
        fs::write(&css_path, DEFAULT_CSS).map_err(|e| format!("write style.css failed: {}", e))?;
        created_css = true;
    }

    let markdown =
        fs::read_to_string(&md_path).map_err(|e| format!("read data.md failed: {}", e))?;
    let style =
        fs::read_to_string(&css_path).map_err(|e| format!("read style.css failed: {}", e))?;

    Ok(FilesPayload {
        markdown,
        style,
        base_dir: exe_dir.to_string_lossy().to_string(),
        created_md,
        created_css,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_desktop_underlay::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, read_or_init_files])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            // 直接设置桌面底层显示
            window.set_desktop_underlay(true).unwrap();
            window.maximize().unwrap();

            // 延迟显示窗口以避免白屏
            let window_clone = window.clone();
            std::thread::spawn(move || {
                std::thread::sleep(std::time::Duration::from_millis(500));
                window_clone.show().unwrap();
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
