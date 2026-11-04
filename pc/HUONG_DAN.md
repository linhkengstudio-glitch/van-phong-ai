# Văn phòng AI 3D v10.1 — lõi thực thi web cục bộ

## Cài trên Windows 11

1. Giải nén toàn bộ ZIP vào một thư mục riêng. Giữ nguyên cấu trúc file.
2. Bấm CAI_DAT.cmd một lần. Nếu chưa có Node.js, trình cài mở nodejs.org: cài Node.js LTS 22 trở lên, sau đó chạy lại CAI_DAT.cmd. Lần cài đầu cần mạng để tải Playwright và Chromium.
3. Bấm MO_VAN_PHONG.cmd. Trang kết nối PC mở trong trình duyệt. Bấm “Mở văn phòng trên web cũ” để mở https://linhkengstudio-glitch.github.io/van-phong-ai/ và ghép nối. Nếu Chrome/Edge hỏi quyền truy cập mạng cục bộ, chọn Cho phép. Giữ cửa sổ máy chủ chạy; không cần gõ lệnh. Nếu trình duyệt chặn kết nối, chọn mở giao diện cục bộ tại trang kết nối PC.
4. Mở Kết nối Gemini, nhập khóa mới nếu khóa cũ từng dùng ở bản 9.5. Khóa chỉ giữ trong RAM và gửi đến Google để gọi API; không lưu xuống đĩa, localStorage hay đồng bộ bên ngoài. Cần nhập lại khi khởi động máy chủ.
5. Chọn model cho Khôi, Đức và Minh từ danh sách tài khoản. Kiểm tra model, giá và quota ở tài khoản Google; phần mềm không cam kết miễn phí. Có thể dùng cùng model cho ba lượt gọi riêng biệt.
6. Bấm Điền yêu cầu mẫu, rồi Giao việc thật. Theo dõi kế hoạch, nhật ký, ảnh và báo cáo kiểm thử. Tải HTML để dùng thử; chỉ bấm nghiệm thu sau khi bạn kiểm tra.

## Phạm vi thực hiện

Bản này giữ cảnh văn phòng 3D của bản cũ và thay lõi mô phỏng. Luồng hoạt động: Khôi phân tích giới hạn và yêu cầu → Đức tạo mã nguồn HTML/CSS/JavaScript thực tế → Minh dùng lượt gọi riêng thiết kế kiểm thử → Playwright/Chromium chạy các thao tác và khẳng định → Đức nhận lỗi và sửa tối đa 3 vòng, bài thử được giữ nguyên → chờ bạn nghiệm thu.

Sản phẩm hỗ trợ: ứng dụng web một file, giao diện, biểu mẫu, logic JavaScript và lưu localStorage. Kết quả lưu trong data/[mã dự án]/round-N. Mỗi vòng có HTML, bộ kiểm thử, báo cáo, ảnh. Có mã băm mã nguồn và bộ thử để chống nghiệm thu nhầm phiên bản.

Không hỗ trợ trong bản này: backend tùy ý, chạy lệnh do AI sinh, cài ứng dụng Windows, điều khiển tài khoản/trình duyệt thật của bạn, upload YouTube, tạo video, triển khai website, plugin bên ngoài. Những yêu cầu đó phải bị chặn và giải thích. Các bàn Vy/Tùng/Vũ/Mai/Bách/Đạt còn là nhân sự dự bị, chưa có bộ thực thi chuyên môn. Không tuyên bố cả 10 nhân sự đã thành chuyên gia.

Bản YouTube mô phỏng cũ không được đưa vào gói chạy mới. Đây không phải bản sửa hoàn thiện uploader YouTube.

## Ý nghĩa trạng thái và giới hạn

- READY_REVIEW: các bài thử được tạo đã chạy đạt trên bản mã được ghi nhận. Không đồng nghĩa bao phủ mọi yêu cầu có thể có hoặc không còn lỗi. Bộ thử do AI soạn vẫn có thể thiếu ca hoặc hiểu sai.
- APPROVED: bạn đã dùng thử và nghiệm thu. Không phải chứng nhận chất lượng tuyệt đối.
- BLOCKED/FAILED: thiếu khả năng, lỗi API, thiếu Chromium, kiểm thử không đạt hoặc QA tìm thấy phần thiếu. Không tự chuyển thành thành công.
- PAUSED: tạm dừng tại ranh giới bước. API đang gọi / bài kiểm thử đang chạy có thể cần hoàn tất trước. Hủy ngắt lời gọi API; trình duyệt thử đang chạy có thể cần tối đa 180 giây để kết thúc.
- INTERRUPTED: máy chủ đã dừng khi tác vụ chưa xong. Tạo lượt mới từ yêu cầu cũ; không tự tính bù tiến độ.

Đóng tab không dừng máy chủ. Tắt máy, sleep hoặc đóng cửa sổ máy chủ sẽ làm gián đoạn công việc. Không có máy chủ cloud tự chạy khi PC tắt. Một tác vụ chạy tại một thời điểm. Lịch sử nằm trên máy, không đồng bộ giữa máy.

Khóa không tự lấy từ bản cũ. Bản cũ có đường gửi khóa trong gói đồng bộ ntfy.sh; hãy thu hồi các khóa đã dùng ở đó nếu có nguy cơ đã gửi. Gói mới không chứa cơ chế này.

Có giới hạn 9 lời gọi, tối đa 3 vòng tạo/sửa; dừng trước lời gọi tiếp theo khi tổng token đã vượt 80.000 (một phản hồi có thể làm tổng vượt ngưỡng). Đây không phải trần chi phí tiền tệ. Token chỉ lấy từ usage của API, chi phí chưa có dữ liệu hóa đơn.

## Kiểm thử kỹ thuật

Chạy KIEM_TRA.cmd để chạy bộ kiểm tra đi kèm. Các bài kiểm tra backend dùng phản hồi Gemini giả lập có ghi rõ trong mã, còn thao tác Chromium và phát hiện lỗi thực sự chạy. Không dùng kết quả đó để tuyên bố đã thử khóa/model Google thực tế. Báo cáo KIEM_CHUNG.md ghi những gì đã chạy khi đóng gói.

Máy chủ chỉ lắng nghe 127.0.0.1, có kiểm tra phiên, Host và Origin. AI không được thực thi shell. Ứng dụng được kiểm thử trong trình duyệt mới, chặn mạng ngoài và không dùng profile tài khoản của bạn. Đây không phải hệ thống sandbox bảo đảm chống mọi mã độc; chưa hỗ trợ chạy mã server tùy ý. Mã HTML tải về là mã AI sinh: chỉ sử dụng sau khi kiểm tra phù hợp.

Các bài thử không tự đo chất lượng SEO, độ chính xác nội dung, khả năng dùng của người cao tuổi hay chất lượng giao diện nghệ thuật. Cần thêm tiêu chí phù hợp cho những lĩnh vực đó.

## Mã nguồn

server.cjs: kết nối Gemini phía máy chủ, điều phối, lưu dự án, API cục bộ.
core.cjs: kiểm tra hợp đồng kiểm thử, xác thực mã băm, chạy trình kiểm thử.
runner.cjs: thao tác Chromium có giới hạn, ảnh và kết quả thực tế.
public/: giao diện và cảnh 3D, thư viện Three.js đi kèm để không cần CDN khi sử dụng.
tests/: kiểm thử lõi và luồng sửa lỗi.

Không cần giữ bản cũ đang mở. Không đưa thư mục data lên website công khai vì có thể chứa nội dung dự án.

## Dùng tiếp địa chỉ web cũ

Trang GitHub Pages là bảng điều khiển. Máy tính của bạn chạy Gemini và Chromium qua bộ kết nối PC v10.1; chỉ mở web mà chưa chạy bộ kết nối thì chưa giao việc được. Sau lần cài đầu, mỗi lần sử dụng chỉ mở MO_VAN_PHONG.cmd và bấm mở web. Không cần chuyển website sang địa chỉ mới.

Link ghép nối dùng một lần, hết hạn sau 2 phút. Phiên tab hết hạn sau 12 giờ hoặc khi máy chủ khởi động lại. Mở lại trang kết nối PC để ghép nối mới. Nút “Thu hồi” ở trang PC ngắt mọi phiên web. Không chia sẻ link ghép nối. Khóa Gemini chỉ ở RAM của máy chủ PC; token ghép nối chỉ lưu trong sessionStorage của tab web. Web chỉ được kết nối từ đúng origin GitHub của tài khoản này.

Bản v10.0 cần thay bằng bộ PC v10.1 trước khi ghép nối. Giữ thư mục data cũ nếu muốn giữ lịch sử, không chạy đồng thời hai bộ. Nếu cổng 8765 đang bận, máy chủ tự chọn cổng và mở đúng trang kết nối; sử dụng link từ trang đó.
