const statusCodes = {
    OK: 200,                     // Thành công
    CREATED: 201,               // Đã tạo thành công
    BAD_REQUEST: 400,           // Yêu cầu không hợp lệ
    UNAUTHORIZED: 401,          // Không được xác thực
    FORBIDDEN: 403,             // Bị cấm truy cập
    NOT_FOUND: 404,             // Không tìm thấy tài nguyên
    INTERNAL_SERVER_ERROR: 500, // Lỗi phía máy chủ
    BAD_LOGIC: 422,             // lỗi logic
};

export default statusCodes;