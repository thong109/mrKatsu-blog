/**
* Các giá trị cần thiết cho một thông báo
* @typedef {Object} SystemMessage
* @property {string} content Nội dung thông báo
* @property {string} title Tiêu đề thông báo
* @property {number} type Loại thông báo
*/

/**
* Các thông báo của hệ thống
* @type {...Object<string,SystemMessage>}
*/
var _msg={
	'C001':{
		'content': 'Bạn có thực sự muốn lưu dữ liệu này không?',
		'title': 'Confirm',
		'type': 1
	},
	'C002':{
		'content': 'Bạn có thực sự muốn xóa dữ liệu này không?',
		'title': 'Confirm',
		'type': 1
	},
	'C003':{
		'content': 'Đã lưu dữ liệu thành công, bạn có muốn trở về trang danh sách không?',
		'title': 'Confirm',
		'type': 1
	},
	'C004':{
		'content': 'Đã xóa dữ liệu thành công, bạn có muốn trở về trang danh sách không?',
		'title': 'Confirm',
		'type': 1
	},
	'C005':{
		'content': 'Bạn có thật sự muốn reset mật khẩu cho tài khoản này không?',
		'title': 'Confirm',
		'type': 1
	},
	'C006':{
		'content': 'Bạn có chắc chắn muốn thay đổi mật khẩu không?',
		'title': 'Confirm',
		'type': 1
	},
	'C007':{
		'content': 'Bạn có chắc chắn muốn mở khóa tài khoản đã chọn không?',
		'title': 'Confirm',
		'type': 1
	},
	'C008':{
		'content': 'Bạn có chắc chắn muốn khoá tài khoản đã chọn không?',
		'title': 'Confirm',
		'type': 1
	},
	'C011':{
		'content': 'Bạn có chắc chắn muốn kích hoạt danh mục không?',
		'title': 'Confirm',
		'type': 1
	},
	'C012':{
		'content': 'Bạn có chắc chắn muốn khoá danh mục không?',
		'title': 'Confirm',
		'type': 1
	},
	'C013':{
		'content': 'Bạn có chắc chắn muốn khoá bài viết đã chọn không?',
		'title': 'Confirm',
		'type': 1
	},
	'C014':{
		'content': 'Bạn có chắc chắn muốn kích hoạt bài viết không?',
		'title': 'Confirm',
		'type': 1
	},
	'E001':{
		'content': 'Nội dung này không được để trống.',
		'title': 'Error',
		'type': 4
	},
	'E002':{
		'content': 'Email không đúng định dạng.',
		'title': 'Error',
		'type': 4
	},
	'E003':{
		'content': 'Ngày tháng không đúng định dạng.',
		'title': 'Error',
		'type': 4
	},
	'E004':{
		'content': 'Đường dẫn sai định dạng.',
		'title': 'Error',
		'type': 4
	},
	'E005':{
		'content': 'Bạn không được phép nhập quá {0} kí tự.',
		'title': 'Error',
		'type': 4
	},
	'E006':{
		'content': 'Bạn phải nhập tối thiểu {1} kí tự.',
		'title': 'Error',
		'type': 4
	},
	'E007':{
		'content': 'Giá trị này phải lớn hơn hoặc bằng {2}.',
		'title': 'Error',
		'type': 4
	},
	'E008':{
		'content': 'Giá trị này phải nhỏ hơn hoặc bằng {3}.',
		'title': 'Error',
		'type': 4
	},
	'E009':{
		'content': 'Số điện thoại sai định dạng.',
		'title': 'Error',
		'type': 4
	},
	'E010':{
		'content': 'Thời gian bắt đầu phải bé hơn thời gian kết thúc.',
		'title': 'Error',
		'type': 4
	},
	'E011':{
		'content': 'Giá trị này đang bị trùng lặp.',
		'title': 'Error',
		'type': 4
	},
	'E012':{
		'content': 'Tài khoản không tồn tại.',
		'title': 'Error',
		'type': 4
	},
	'E013':{
		'content': 'Mật khẩu không chính xác.',
		'title': 'Error',
		'type': 4
	},
	'E014':{
		'content': 'Tài khoản hoặc mật khẩu không chính xác.',
		'title': 'Error',
		'type': 4
	},
	'E015':{
		'content': 'Username này đã được đăng ký. Vui lòng sử dụng username khác!',
		'title': 'Error',
		'type': 4
	},
	'E016':{
		'content': 'Hệ thống phải tồn tại ít nhất 1 tài khoản để sử dụng.',
		'title': 'Error',
		'type': 4
	},
	'E017':{
		'content': 'Mật khẩu phải chứa ít nhất 8 ký tự, có chứa chữ hoa, chữ thường và ký tự đặc biệt.',
		'title': 'Error',
		'type': 4
	},
	'E018':{
		'content': 'Mật khẩu xác nhận không trùng khớp, vui lòng kiểm tra lại.',
		'title': 'Error',
		'type': 4
	},
	'E019':{
		'content': 'Tên đăng nhập phải có ít nhất 4 ký tự, chỉ được nhập các ký tự chữ cái, chữ số và các dấu chấm (.), gạch nối (-), gạch dưới (_).',
		'title': 'Error',
		'type': 4
	},
	'E020':{
		'content': 'File vượt quá dung lượng cho phép.',
		'title': 'Error',
		'type': 4
	},
	'E021':{
		'content': 'File không đúng định dạng.',
		'title': 'Error',
		'type': 4
	},
	'E022':{
		'content': 'Không thể upload quá {0} file cùng lúc.',
		'title': 'Error',
		'type': 4
	},
	'E023':{
		'content': 'Có lỗi trong quá trình tải file, vui lòng thử lại.',
		'title': 'Error',
		'type': 4
	},
	'E024':{
		'content': 'Vui lòng chọn file tải lên.',
		'title': 'Error',
		'type': 4
	},
	'E025':{
		'content': 'Kích thước hình ảnh không đúng yêu cầu.',
		'title': 'Error',
		'type': 4
	},
	'E026':{
		'content': 'Không thể thực hiện thao tác này, vì số item hiển thị trên trang chủ đã đạt mức tối thiểu.',
		'title': 'Error',
		'type': 4
	},
	'E027':{
		'content': 'Link này chỉ có thể chứa chuỗi không dấu bao gồm chữ thường, chữ hoa và dấu gạch nối (-).',
		'title': 'Error',
		'type': 4
	},
	'E028':{
		'content': 'Lưu dữ liệu không thành công, vui lòng thử lại.',
		'title': 'Error',
		'type': 4
	},
	'E029':{
		'content': 'Xóa dữ liệu không thành công, vui lòng thử lại.',
		'title': 'Error',
		'type': 4
	},
	'E030':{
		'content': 'Không thể hiển thị số lượng kết quả quá lớn.',
		'title': 'Error',
		'type': 4
	},
	'E031':{
		'content': 'Có lỗi trong quá trình tạo file, vui lòng thử lại.',
		'title': 'Error',
		'type': 4
	},
	'E032':{
		'content': 'Dữ liệu này đã tồn tại trong hệ thống',
		'title': 'Error',
		'type': 4
	},
	'E033':{
		'content': 'Mã của thông báo đã tồn tại trong hệ thống',
		'title': 'Error',
		'type': 4
	},
	'E034':{
		'content': 'Mã của chức năng đã tồn tại trong hệ thống',
		'title': 'Error',
		'type': 4
	},
	'E035':{
		'content': 'Bạn phải chọn ít nhất 1 dòng',
		'title': 'Error',
		'type': 4
	},
	'E036':{
		'content': 'Bạn cần đồng ý với điều khoản sử dụng và chính sách bảo mật của chúng tôi',
		'title': 'Error',
		'type': 4
	},
	'E037':{
		'content': 'Tài khoản của bạn chưa được kích hoạt. Chúng tôi đã gửi lại thông tin kích hoạt tài khoản đến email mà bạn đã đăng ký, vui lòng kiểm tra email để kích hoạt tài khoản',
		'title': 'Error',
		'type': 4
	},
	'E038':{
		'content': 'Email này không tồn tại',
		'title': 'Error',
		'type': 4
	},
	'E039':{
		'content': 'Username không đúng định dạng. Hãy nhập dưới dạng alphabet',
		'title': 'Error',
		'type': 4
	},
	'E040':{
		'content': 'Email này đã được đăng ký. Vui lòng sử dụng email khác!',
		'title': 'Error',
		'type': 4
	},
	'E041':{
		'content': 'Mã xác nhận không đúng',
		'title': 'Error',
		'type': 4
	},
	'E042':{
		'content': 'Mã xác nhận hết hạn',
		'title': 'Error',
		'type': 4
	},
	'E043':{
		'content': 'Tài khoản này đã được kích hoạt ',
		'title': 'Error',
		'type': 4
	},
	'E044':{
		'content': 'Mã của bạn không tồn tại. Vui lòng sử dụng mã khác',
		'title': 'Error',
		'type': 4
	},
	'E045':{
		'content': 'Đây chưa phải là thời gian sử dụng mã,vui lòng quay lại khi mã đã được kích hoạt.',
		'title': 'Error',
		'type': 4
	},
	'E046':{
		'content': 'Mã của bạn đã quá hạn sử dụng. Vui lòng sử dụng mã khác. ',
		'title': 'Error',
		'type': 4
	},
	'E047':{
		'content': 'Số lượng sử dụng mã này đã đầy. Vui lòng sử dụng mã khác.',
		'title': 'Error',
		'type': 4
	},
	'E048':{
		'content': 'Bạn đã sử dụng Coupon này',
		'title': 'Error',
		'type': 4
	},
	'E049':{
		'content': 'Bạn không thể tạo mã khi chưa có khoá học nào',
		'title': 'Error',
		'type': 4
	},
	'E051':{
		'content': 'Bạn đang ở level cao hơn level coupon',
		'title': 'Error',
		'type': 4
	},
	'E052':{
		'content': 'Coupon chỉ được sử dụng cho tài khoản personal. Tài khoản company không sử dụng được',
	},
	'E053':{
		'content': 'Bạn phải mua khoá học mới được xem hết video này ',
		'title': 'Error',
		'type': 4
	},
	'E054':{
		'content': 'Bạn chưa mua video này. Bạn nên mua plan để có thể được sử dụng những video bạn quan tâm.',
		'title': 'Error',
		'type': 4
	},
	'E402':{
		'content': 'Bạn cần đăng nhập để thực hiện hành động này',
		'title': 'Error',
		'type': 4
	},
	'E403':{
		'content': 'Bạn không có quyền để thực hiện hành động này',
		'title': 'Error',
		'type': 4
	},
	'E404':{
		'content': 'Không tìm thấy',
		'title': 'Error',
		'type': 4
	},
	'E500':{
		'content': 'Hệ thống bị lỗi, vui lòng thử lại sau.',
		'title': 'Error',
		'type': 4
	},
	'S001':{
		'content': 'Đã lưu dữ liệu thành công.',
		'title': 'Success',
		'type': 2
	},
	'S002':{
		'content': 'Đã xóa dữ liệu thành công.',
		'title': 'Success',
		'type': 2
	},
	'S003':{
		'content': 'Đã tạo file javascript thành công',
		'title': 'Success',
		'type': 2
	},
	'S004':{
		'content': 'Đã build lại file chức năng hệ thống thành công',
		'title': 'Success',
		'type': 2
	},
	'S005':{
		'content': 'Đã reset password thành công',
		'title': 'Success',
		'type': 2
	},
	'S006':{
		'content': 'Đã rnhắc nhở chuyển khoản cho đơn hàng thành công',
		'title': 'Success',
		'type': 2
	},
	'S007':{
		'content': 'Đã xác nhận đơn hàng đã thanh toán thành công',
		'title': 'Success',
		'type': 2
	},
	'S008':{
		'content': 'Đã sao chép dữ liệu thành công',
		'title': 'Success',
		'type': 2
	},
	'S009':{
		'content': 'Đã gửi thông báo thành công đến khách hàng',
		'title': 'Success',
		'type': 2
	},
	'S010':{
		'content': 'Vui lòng kiểm tra Email để tiến hành lấy lại mật khẩu',
		'title': 'Success',
		'type': 2
	},
	'S011':{
		'content': 'Đã gửi mail xác nhận,vui lòng check gmail',
		'title': 'Success',
		'type': 2
	},
	'S012':{
		'content': 'Thông tin đã được Update thành công',
		'title': 'Success',
		'type': 2
	},
	'S013':{
		'content': 'Tạo coupon thành công',
		'title': 'Success',
		'type': 2
	},
	'S014':{
		'content': 'Thay đổi trạng thái mã thành công',
		'title': 'Success',
		'type': 2
	},
	'S015':{
		'content': 'Coupon của bạn đã được sử dụng thành công.',
		'title': 'Success',
		'type': 2
	},
	'W001':{
		'content': 'Việc tạo lại file javascript này có thể gây ra một số thay đổi không mong muốn cho hệ thống, bạn có muốn tiếp tục không?',
		'title': 'Warning',
		'type': 3
	},
	'W002':{
		'content': 'Việc build lại file chức năng của hệ thống có thể gây ra một số thay đổi không mong muốn, và phải tiến hành build lại toàn bộ project, bạn có muốn tiếp tục không?',
		'title': 'Warning',
		'type': 3
	},
	'W003':{
		'content': 'Bạn đã thay đổi link SEO của chương trình khuyến mãi này, nếu tiếp tục lưu tất cả dữ liệu SEO của chương trình này sẽ bị mất, bạn có muốn tiếp tục không ?',
		'title': 'Warning',
		'type': 3
	},
	'W004':{
		'content': 'Mã giảm giá của bạn giảm trên 50%, bạn có muốn tiếp tục tạo mã giảm giá này không?',
		'title': 'Warning',
		'type': 3
	}
};

/**  Danh sách mã các câu thông báo trong hệ thống */
var MSG_NO={
	/** Bạn có thực sự muốn lưu dữ liệu này không? */
	CONFIRM_SAVE_DATA: 'C001',
	/** Bạn có thực sự muốn xóa dữ liệu này không? */
	CONFIRM_DELETE_DATA: 'C002',
	/** Đã lưu dữ liệu thành công, bạn có muốn trở về trang danh sách không? */
	CONFIRM_AFTER_SAVE: 'C003',
	/** Đã xóa dữ liệu thành công, bạn có muốn trở về trang danh sách không? */
	CONFIRM_AFTER_DELETE: 'C004',
	/** Bạn có thật sự muốn reset mật khẩu cho tài khoản này không? */
	CONFIRM_RESET_PASSWORD: 'C005',
	/** Bạn có chắc chắn muốn thay đổi mật khẩu không? */
	CONFIRM_CHANGE_PASSWORD: 'C006',
	/** Bạn có chắc chắn muốn mở khóa tài khoản đã chọn không? */
	CONFIRM_UNLOCK_ACCOUNT: 'C007',
	/** Bạn có chắc chắn muốn khoá tài khoản đã chọn không? */
	CONFIRM_LOCK_ACCOUNT: 'C008',
	/** Bạn có chắc chắn muốn kích hoạt danh mục không? */
	CONFIRM_USING_CATEGORY: 'C011',
	/** Bạn có chắc chắn muốn khoá danh mục không? */
	CONFIRM_BLOCK_CATEGORY: 'C012',
	/** Bạn có chắc chắn muốn khoá danh mục không? */
	CONFIRM_LOCK_BLOG: 'C013',
	/** Bạn có chắc chắn muốn khoá danh mục không? */
	CONFIRM_UNLOCK_BLOG: 'C014',
	/** Nội dung này không được để trống. */
	REQUIRED: 'E001',
	/** Email không đúng định dạng. */
	EMAIL_FORMAT_RON: 'E002',
	/** Ngày tháng không đúng định dạng. */
	DATE_FORMAT_RON: 'E003',
	/** Đường dẫn sai định dạng. */
	URL_FORMAT_RON: 'E004',
	/** Bạn không được phép nhập quá {0} kí tự. */
	EXCEED_MAXLENGTH: 'E005',
	/** Bạn phải nhập tối thiểu {1} kí tự. */
	NOT_ENOUGH_MIN_LENGTH: 'E006',
	/** Giá trị này phải lớn hơn hoặc bằng {2}. */
	VALUE_MUST_GEATER: 'E007',
	/** Giá trị này phải nhỏ hơn hoặc bằng {3}. */
	VALUE_MUST_LESSER: 'E008',
	/** Số điện thoại sai định dạng. */
	PHONE_NUMBER_FORMAT_RON: 'E009',
	/** Thời gian bắt đầu phải bé hơn thời gian kết thúc. */
	TIME_FROM_MUST_LESSER_TIME_TO: 'E010',
	/** Giá trị này đang bị trùng lặp. */
	DATA_DUPLICATE: 'E011',
	/** Tài khoản không tồn tại. */
	USERNAME_NOT_INCORRECT: 'E012',
	/** Mật khẩu không chính xác. */
	PASSWORD_NOT_INCORRECT: 'E013',
	/** Tài khoản hoặc mật khẩu không chính xác. */
	USERNAME_OR_PASSWORD_NOT_INCORRECT: 'E014',
	/** Username này đã được đăng ký. Vui lòng sử dụng username khác! */
	USERNAME_HAD_USED: 'E015',
	/** Hệ thống phải tồn tại ít nhất 1 tài khoản để sử dụng. */
	SYSTEM_MUST_HAVE_LEAST_1_USER: 'E016',
	/** Mật khẩu phải chứa ít nhất 8 ký tự, có chứa chữ hoa, chữ thường và ký tự đặc biệt. */
	PASSWORD_WRONG_FORMAT: 'E017',
	/** Mật khẩu xác nhận không trùng khớp, vui lòng kiểm tra lại. */
	CORNFIRM_PASSWORD_ERROR: 'E018',
	/** Tên đăng nhập phải có ít nhất 4 ký tự, chỉ được nhập các ký tự chữ cái, chữ số và các dấu chấm (.), gạch nối (-), gạch dưới (_). */
	USERNAME_WRONG_FORMAT: 'E019',
	/** File vượt quá dung lượng cho phép. */
	FILE_SIZE_TOO_LARGER: 'E020',
	/** File không đúng định dạng. */
	EXTENSION_NOT_ALLOW: 'E021',
	/** Không thể upload quá {0} file cùng lúc. */
	CANNOT_UPLOAD_MANY_FILES: 'E022',
	/** Có lỗi trong quá trình tải file, vui lòng thử lại. */
	UPLOAD_FILE_ERROR: 'E023',
	/** Vui lòng chọn file tải lên. */
	YOU_MUST_CHOOSE_FILE: 'E024',
	/** Kích thước hình ảnh không đúng yêu cầu. */
	SIZE_OF_IMG_RON: 'E025',
	/** Không thể thực hiện thao tác này, vì số item hiển thị trên trang chủ đã đạt mức tối thiểu. */
	EROR_MIN_ITEM_SHOW: 'E026',
	/** Link này chỉ có thể chứa chuỗi không dấu bao gồm chữ thường, chữ hoa và dấu gạch nối (-). */
	BEAUTYID_WRONG_FORMAT: 'E027',
	/** Lưu dữ liệu không thành công, vui lòng thử lại. */
	SAVE_DATA_ERROR: 'E028',
	/** Xóa dữ liệu không thành công, vui lòng thử lại. */
	DELETE_DATA_ERROR: 'E029',
	/** Không thể hiển thị số lượng kết quả quá lớn. */
	NUMBER_OF_RECORD_LARGER: 'E030',
	/** Có lỗi trong quá trình tạo file, vui lòng thử lại. */
	CREATE_JS_ERROR: 'E031',
	/** Dữ liệu này đã tồn tại trong hệ thống */
	DATA_EXISTING: 'E032',
	/** Mã của thông báo đã tồn tại trong hệ thống */
	MESSAGE_CODE_EXISTING: 'E033',
	/** Mã của chức năng đã tồn tại trong hệ thống */
	FUNCTION_CODE_EXISTING: 'E034',
    /** Bạn phải chọn ít nhất 1 dòng */
	SELECT_AT_LEAST_1_LINE: 'E035',
    /** Bạn cần đồng ý với điều khoản sử dụng và chính sách bảo mật của chúng tôi */
	YOU_MUST_AGREE_WITH_US: 'E036',
    /** Tài khoản của bạn chưa được kích hoạt. Chúng tôi đã gửi lại thông tin kích hoạt tài khoản đến email mà bạn đã đăng ký, vui lòng kiểm tra email để kích hoạt tài khoản */
	YOUR_ACCOUNT_NOT_ACTIVE: 'E037',
	/** Email này không tồn tại */
	EMAIL_NOT_INCORRECT: 'E038',
	/** Username không đúng định dạng. Hãy nhập dưới dạng alphabet */
	USERNAME_WRONG_FORMAT_ALPHABEL: 'E039',
	/** Email này đã được đăng ký. Vui lòng sử dụng email khác! */
	EMAIL_HAD_USED: 'E040',
	/** Mã xác nhận không đúng  */
	TOKEN_NOT_INCORRECT: 'E041',
	/** Mã xác nhận hết hạn */
	TOKEN_TIMEOUT: 'E042',
	/** Tài khoản này đã được kích hoạt */
	THIS_ACCOUNT_ACTIVED: 'E043',
	/** Mã của bạn không tồn tại. Vui lòng sử dụng mã khác */
	CODE_NOT_EXIST: 'E044',
	/** Đây chưa phải là thời gian sử dụng mã,vui lòng quay lại khi mã đã được kích hoạt.*/
	NO_TIME_TO_USE_CODE: 'E045',
	/** Mã của bạn đã quá hạn sử dụng. Vui lòng sử dụng mã khác. */
	EXPIRED_CODE: 'E046',
	/** Số lượng sử dụng mã này đã đầy. Vui lòng sử dụng mã khác. */
	QUANTITY_FULL: 'E047',
	/** Bạn đã sử dụng coupon này */
	PROMO_CODE_HAS_BEEN: 'E048',
	/** Tên coupon đã được sử dụng, vui lòng sử dụng tên khác  */
	CHECK_EXITS_COUPON: 'E049',
	/** Bạn đang ở level cao hơn level coupon */
	LOWER_COUPON_LEVEL: 'E051',
	/** Coupon chỉ được sử dụng cho tài khoản personal. Tài khoản company không sử dụng được */
	LOWER_COUPON_LEVEL: 'E052',
	/** Bạn phải mua khoá học mới được xem hết video này */
	CANNOT_WATCH_VIDEO:"E053",
	/**Bạn chưa mua video này. Bạn nên mua plan để có thể được sử dụng những video bạn quan tâm. */
	VIDEO_NOT_ACTIVE: 'E054',
	/** Bạn cần đăng nhập để thực hiện hành động này */
	YOU_MUST_LOGIN: 'E402',
	/** Bạn không có quyền để thực hiện hành động này */
	YOU_NOT_HAVE_PERMISSION: 'E403',
	/** Không tìm thấy */
	NOT_FOUND: 'E404',
	/** Hệ thống bị lỗi, vui lòng thử lại sau. */
	SERVER_ERROR: 'E500',
	/** Đã lưu dữ liệu thành công. */
	SAVE_DATA_SUCCESS: 'S001',
	/** Đã xóa dữ liệu thành công. */
	DELETE_DATA_SUCCESS: 'S002',
	/** Đã tạo file javascript thành công */
	CREATE_JS_SUCCESS: 'S003',
	/** Đã build lại file chức năng hệ thống thành công */
	BUILD_FILE_SUCCESS: 'S004',
	/** Đã reset password thành công */
	RESET_PASSWORD_SUCCESS: 'S005',
	/** Đã rnhắc nhở chuyển khoản cho đơn hàng thành công */
	REMIND_ORDER_TRANSFER_SUCCESS: 'S006',
	/** Đã xác nhận đơn hàng đã thanh toán thành công */
	CONFIRM_ORDER_TRANSFER_SUCCESS: 'S007',
	/** Đã sao chép dữ liệu thành công */
	CLONE_DATA_SUCCESS: 'S008',
	/** Đã gửi thông báo thành công đến khách hàng */
	SEND_NOTIFICATION_SUCCESS: 'S009',
	/** Vui lòng kiểm tra Email để tiến hành lấy lại mật khẩu */
	SEND_MAIL_NOTIFICATION_SUCCESS: 'S010',
	/** Đã gửi mail xác nhận,vui lòng check gmail */
	SEND_MAIL_CONFIRMATION_SUCCESS: 'S011',
	/** Thông tin đã được Update thành công */
	UPDATE_SUCCESS: 'S012',
	/** Tạo coupon thành công */
	CREATE_COUPON_SUCCESS:'S013',
	/** Thay đổi trạng thái mã thành công */
	CHANGE_COUPON_STATUS: 'S014',
	/** Coupon của bạn đã được sử dụng thành công. */
	USE_COUPON_SUCCESS: 'S015',
	/** Việc tạo lại file javascript này có thể gây ra một số thay đổi không mong muốn cho hệ thống, bạn có muốn tiếp tục không? */
	WARNING_CREATE_JS: 'W001',
	/** Việc build lại file chức năng của hệ thống có thể gây ra một số thay đổi không mong muốn, và phải tiến hành build lại toàn bộ project, bạn có muốn tiếp tục không? */
	WARNING_BUILD_FILE: 'W002',
	/** Bạn đã thay đổi link SEO của chương trình khuyến mãi này, nếu tiếp tục lưu tất cả dữ liệu SEO của chương trình này sẽ bị mất, bạn có muốn tiếp tục không ? */
	WARNING_CHANGE_PROMOTION_BEAUTYID: 'W003',
	/** Mã giảm giá của bạn giảm trên 50%, bạn có muốn tiếp tục tạo mã giảm giá này không? */
	WARNING_VOUCHER_50_PERCENT: 'W004'
};
