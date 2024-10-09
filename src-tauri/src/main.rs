// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;
use std::env;

fn main() {
    dotenv().ok();

    let firebase_api_key = env::var("NEXT_PUBLIC_FIREBASE_API_KEY").expect("Firebase API Key not found");
    let firebase_auth_domain = env::var("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN").expect("Firebase Auth Domain not found");
    let firebase_database_url = env::var("NEXT_PUBLIC_FIREBASE_DATABASE_URL").expect("Firebase Database URL not found");
    let firebase_project_id = env::var("NEXT_PUBLIC_FIREBASE_PROJECT_ID").expect("Firebase Project ID not found");
    let firebase_storage_bucket = env::var("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET").expect("Firebase Storage Bucket not found");
    let firebase_messaging_sender_id = env::var("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID").expect("Firebase Messaging Sender ID not found");
    let firebase_app_id = env::var("NEXT_PUBLIC_FIREBASE_APP_ID").expect("Firebase App ID not found");
    let firebase_measurement_id = env::var("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID").expect("Firebase Measurement ID not found");

    println!("Firebase API Key: {}", firebase_api_key);
    println!("Firebase Auth Domain: {}", firebase_auth_domain);
    println!("Firebase Database URL: {}", firebase_database_url);
    println!("Firebase Project ID: {}", firebase_project_id);
    println!("Firebase Storage Bucket: {}", firebase_storage_bucket);
    println!("Firebase Messaging Sender ID: {}", firebase_messaging_sender_id);
    println!("Firebase App ID: {}", firebase_app_id);
    println!("Firebase Measurement ID: {}", firebase_measurement_id);

    // Initialize your Tauri app here
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}