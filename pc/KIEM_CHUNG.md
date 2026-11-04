# Kết quả kiểm chứng v10.0

Ngày kiểm chứng: 02/11/2026.

Đã chạy 5 nhóm kiểm thử tự động, đạt 5/5:

1. Từ chối tiêu chí trống/trùng, bộ thử không bao phủ tiêu chí, hành động không được hỗ trợ và bài không có khẳng định kết quả.
2. Chromium phát hiện lỗi mất dữ liệu khi tải lại. Bản sửa lưu localStorage chạy đạt. Mã băm nguồn và bộ thử chặn dùng báo cáo cũ cho bản mã mới.
3. Lỗi JavaScript runtime ngăn chuyển sang chờ nghiệm thu, ngay cả khi kiểm tra hiển thị đơn giản đạt.
4. Khởi động lại đánh dấu tác vụ dở dang là INTERRUPTED. Tạm dừng đợi ranh giới bước. Hủy không chuyển thành thành công.
5. Luồng backend đầy đủ: nhận yêu cầu → bản đầu lỗi → Chromium trả lỗi → bản sửa đạt → chặn nghiệm thu khi file bị thay → cho nghiệm thu đúng phiên bản. Kiểm tra thêm bảo vệ phiên/Origin, khóa không xuất hiện trong job.json, chặn đường dẫn ảnh ngoài báo cáo và chặn yêu cầu ngoài phạm vi.

Lệnh chạy: OFFICE_CHROMIUM_PATH=/tmp/office-chromium node --test tests/*.test.cjs
Kết quả: tests 5, pass 5, fail 0. Thời gian lượt cuối khoảng 10,2 giây.

Các bài backend dùng phản hồi Gemini mẫu, không gọi Google và không tính phí. Chromium thực sự mở HTML, thao tác, tải lại, kiểm tra kết quả và chụp ảnh. Trình duyệt thử trong môi trường Linux là Chromium 153 từ gói @sparticuz/chromium, điều khiển bằng Playwright 1.58.2. Do tải Chromium mặc định bị lỗi trong môi trường đóng gói, dùng đường dẫn trình duyệt riêng qua OFFICE_CHROMIUM_PATH cho lần kiểm thử này; không đóng gói binary Linux vào bản Windows.

Đã mở giao diện trong trình duyệt ở 1440×960, kiểm tra 3D, đóng/mở bảng, điền yêu cầu mẫu và khóa nút giao việc khi chưa kết nối Gemini. Không có pageerror. Đã xem ảnh và điều chỉnh góc nhìn để không cắt mất màn hình văn phòng.

CHƯA KIỂM CHỨNG:
- Gọi Gemini bằng khóa thật, quota, chất lượng model của tài khoản người dùng.
- Chạy CAI_DAT.cmd / MO_VAN_PHONG.cmd trên máy Windows 11 thực tế.
- Khả năng xử lý mọi yêu cầu bất kỳ; bộ thử do AI tạo vẫn có thể thiếu ca.
- Upload YouTube, điều khiển desktop, backend tùy ý và sáu vai trò dự bị: chưa triển khai trong bản này.

Báo cáo này kiểm chứng phần lõi và luồng mẫu nêu trên. Không phải tuyên bố sản phẩm không có lỗi hoặc đáp ứng 100% mọi yêu cầu.

## Bổ sung v10.1 — 04/11/2026

Đã chạy lại bridge.test.cjs và lifecycle.test.cjs: 3 nhóm đạt, 0 lỗi. Kiểm tra ticket một lần/hết hạn, phiên hết hạn/thu hồi, Origin chính xác, CORS, cookie cục bộ không thay thế bearer web, và trạng thái khi hủy/khởi động lại. Không gọi Gemini thật.

Giao diện web đã mở qua trình duyệt: hiển thị hướng dẫn kết nối PC, nút tải bộ cài và khóa giao việc khi chưa kết nối. Trình duyệt kiểm tra hiện không tạo được WebGL context; bảng điều khiển vẫn hoạt động, có thông báo thay vì treo trang. Chưa kiểm chứng ghép nối HTTPS–loopback và quyền mạng cục bộ trên Windows thực tế. Chưa chạy lại toàn bộ bài Chromium của v10.0 trong lượt này.
