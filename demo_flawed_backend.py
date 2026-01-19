
import os

# TRÁI QUY TẮC: Lỗ hổng bảo mật (Hardcoded GitHub Token)
GITHUB_TOKEN = "ghp_intentional_fake_token_for_demo_12345"

def process_all_data_monolith_function(data):
    # TRÁI QUY TẮC: Monolith (Một hàm làm quá nhiều việc, không chia Service/Utils)
    # TRÁI QUY TẮC: Không có Type Hints
    # TRÁI QUY TẮC: Thiếu file Header Dạ Hành Studio
    
    print(f"Bắt đầu xử lý {len(data)} bản ghi...")
    
    # Giả lập xử lý 1000 dòng code lặp đi lặp lại ở đây...
    results = []
    for item in data:
        # Giả lập logic phức tạp
        processed = item.upper() 
        results.append(processed)
        
    # Giả lập truy cập DB trực tiếp trong hàm xử lý logic
    db_connection_string = "mongodb://admin:mypassword123@localhost:27017"
    print(f"Đang lưu vào DB: {db_connection_string}")
    
    return results

if __name__ == "__main__":
    data = ["item1", "item2"]
    process_all_data_monolith_function(data)
