đọc hướng dẫn .claude\starter-kit

tạo PR để thực hiện update

1. cấu hình lại không warnings cho file md
2. cấp full quyền trong .claude\settings.local.json để tránh hỏi quyền

tôi không muốn IDE warnings file md như này

check lại có cần:
1. refactor lại nội dung skills, docs, scripts sẵn có theo rule của kit không?
2. có cần refactor lại cấu trúc của .claude và folder khác tốt hơn không
3. cập nhật các plan chưa được implement theo chuẩn của kit
4. tạo PR riêng để cập nhật đúng theo rule PR mới

2. có cần refactor lại cấu trúc của .claude và folder khác tốt hơn không
ý tôi là các file đang khá phân tán và không có cấu trúc khoa học, ví dụ docs có nhiều vị trí: .claude\archive, .claude\docs, .claude\scripts, docs

ngoài ra các file nằm ở root quá nhiều, không được chia rõ ràng vào sub folder, khó nhận biết status và action tiếp theo

merge và tạo PR riêng, chưa thực hiện luôn

đọc .claude\starter-kit\CHANGELOG.md, thực hiện thu thập dữ liệu và update plan theo kit mới