export const API_END_POINTS = {
	home: {},

	services: {
		service_category: {
			getById: '/api/admin/category/get/:uuid',
			getAll: '/api/admin/category/getAll',
			post: '/api/admin/category/create',
			put: '/api/admin/category/update/:uuid',
			delete: '/api/admin/category/delete/:uuid',
		},
		service: {
			post: '/api/admin/service/',
			get: '/api/admin/service/',
			getById: '/api/admin/service/:uuid',
			put: '/api/admin/service/:uuid',
			patch: '/api/admin/service/toggle-status/:uuid',
		},
	},

	spare_parts: {
		post: '/api/admin/spareparts/create',
		getById: '/api/admin/spareparts/get/:uuid',
		getAll: '/api/admin/spareparts/getall',
		put: '/api/admin/spareparts/update/:id',
		patch: '/api/admin/spareparts/updatestatus/:id',
		delete: '/api/admin/spareparts/delete/:id',
	},

	booking_cart: {
		post: '/api/customer/cart/',
		get: '/api/customer/cart/',
		getById: '/api/customer/cart/:id',
		put: '/api/customer/cart/:id',
		delete: '/api/customer/:cartId/product/:productId',
		deleteProduct: '/api/customer/cart/:cartId/product/:productId',
		deleteService: '/api/customer/cart/:cartId/service/:serviceId',
	},

	service_bookings: {
		post: '/api/booking/',
		get: '/api/booking/',
		put: '/api/booking/:id',
		patch: '/api/booking/:id/cancel',
	},

	offer: {
		Post: '/api/announcement/create',
		Get: '/api/announcement/all',
	},

	auth: {
		post_login: '/api/customer/auth/login',
		post_signup: '/api/customer/auth/register',
		get: '/api/customer/auth/me',
		put: '/api/customer/auth/update',
		post_verify_otp: '/api/customer/auth/verify-otp',
		post_forgot_password: '/api/customer/auth/forget-pass',
		post_resend_otp: '/api/customer/auth/resend-otp',
		post_reset_password: '/api/customer/auth/reset-pass',
		post_image: '/api/image/singlefile/userid/',
	},

	notification: {
		getAll: '/api/notifications/customer',
		update: '/api/notifications/:uuid',
		getByUser: `/api/notifications/user/:userId`,
		getUnreadCount: `/api/notifications/user/:userId/unread-count`,
		markAsRead: `/api/notifications/read/:uuid`,
		markAllAsRead: `/api/notifications/read-all/:userId`,
	},

	bookings: {
		getAll: '/api/customer/cartbooking/all',
		postProduct: '/api/customer/cartbooking/product/confirm',
		postService: '/api/customer/cartbooking/service/confirm',
		getProductInvoice: '/api/customer/invoice/product/:uuid',
		getServiceInvoice: '/api/customer/invoice/service/:uuid'
	},

	enquiry: {
		post: '/api/serviceEnquiry/createEnquiry',
		getAll: '/api/serviceEnquiry/getAllEnquiries',
		update: '/api/serviceEnquiry/updateEnquiry/:id',
	},

	notificationSubcription: {
		post: '/api/subscription/notify'
	}
};
