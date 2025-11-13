/**
 * js/cart.js
 * Logic xử lý giỏ hàng (Hiển thị, cập nhật, tính toán)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Khóa Local Storage và Phí vận chuyển
    const CART_KEY = 'cartItems';
    const SHIPPING_FEE = 30000; // Phí ship cố định

    // Phần tử DOM
    const cartTableBody = document.getElementById('cart-table-body');
    const subtotalElement = document.getElementById('summary-subtotal');
    const shippingElement = document.getElementById('summary-shipping');
    const totalElement = document.getElementById('summary-total-amount');
    const checkoutForm = document.getElementById('checkout-form');
    const navCartCount = document.getElementById('nav-cart-count');

    // Dữ liệu sản phẩm mẫu (Đã mở rộng thành 20 sản phẩm và SỬA TÊN SP & ĐƯỜNG DẪN ẢNH)
    const productData = {
        // Bags (Túi, Vải)
        'HM001': { name: 'Túi Xách Mây Tre Đan Sapa', price: 380000, image: 'images/bag1.jpg' }, 
        'HM002': { name: 'Ví Cầm Tay Dệt Thổ Cẩm', price: 250000, image: 'images/bag2.jpg' }, 
        'HM003': { name: 'Giỏ Đựng Đồ Vintage Dây Cói', price: 210000, image: 'images/bag3.jpg' }, 
        'HM004': { name: 'Khăn Choàng Vải Lanh Cao Cấp', price: 450000, image: 'images/bag4.jpg' },
        'HM005': { name: 'Balo Dây Rút Hoạ Tiết Dân Tộc', price: 590000, image: 'images/bag1.jpg' }, // Tái sử dụng
        
        // Decor / Ceramics / Rattan (Trang trí, Gốm, Mây Tre)
        'HM006': { name: 'Bộ Ấm Chén Gốm Men Ngọc Bích', price: 750000, image: 'images/decor1.jpg' }, 
        'HM007': { name: 'Hộp Tròn Đan Tre Cổ Truyền', price: 180000, image: 'images/decor2.jpg' }, 
        'HM008': { name: 'Bình Hoa Gốm Trắng Hiện Đại', price: 400000, image: 'images/decor3.jpg' }, 
        'HM009': { name: 'Đèn Lồng Tre Đan Trần Nhà', price: 620000, image: 'images/decor4.jpg' }, 
        'HM010': { name: 'Thảm Trải Sàn Dệt Cói Tự Nhiên', price: 310000, image: 'images/decor5.jpg' }, 
        'HM011': { name: 'Tranh Thêu Tay "Hoa Sen Vàng"', price: 1800000, image: 'images/decor6.jpg' }, 
        'HM012': { name: 'Tượng Phật Gỗ Trắc Mini', price: 890000, image: 'images/decor7.jpg' }, 
        
        // Gifts / Woodware (Quà tặng, Đồ gỗ)
        'HM013': { name: 'Nến Thơm Tinh Dầu Quế Hồi', price: 150000, image: 'images/gift1.jpg' },
        'HM014': { name: 'Bộ Đũa Muỗng Tre Khắc Tên', price: 110000, image: 'images/gift2.jpg' },
        'HM015': { name: 'Khay Trà Gỗ Hương Cao Cấp', price: 1250000, image: 'images/gift3.jpg' },
        'HM016': { name: 'Bộ Pha Cà Phê Gỗ Phin Đơn', price: 790000, image: 'images/gift4.jpg' },
        
        // Jewelry / Accessories (Trang sức)
        'HM017': { name: 'Vòng Cổ Bạc Ta Chạm Khắc', price: 950000, image: 'images/jewel1.jpg' },
        'HM018': { name: 'Hộp Gỗ Đựng Trang Sức Khảm Trai', price: 1500000, image: 'images/jewel2.jpg' }, 
        'HM019': { name: 'Bộ Khuyên Tai Gỗ Sưa Điêu Khắc', price: 350000, image: 'images/jewel3.jpg' }, 
        'HM020': { name: 'Hoa Tai Lông Chim Thổ Cẩm', price: 180000, image: 'images/jewel4.jpg' } 
    };

    // ... (Các hàm còn lại của cart.js không đổi) ...
    // [Phần còn lại của cart.js (getCart, saveCart, renderCart, updateSummary, updateQuantity, removeItem, handleCheckout, addToCart) vẫn giữ nguyên]
    // ...
    function formatVND(amount) {
        return amount.toLocaleString('vi-VN') + '₫';
    }
    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    }
    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    }
    function updateCartCount() {
        const cart = getCart();
        if (navCartCount) {
             navCartCount.textContent = `${cart.length}`; 
        }
    }
    function updateSummary(subtotal) {
        const total = subtotal > 0 ? subtotal + SHIPPING_FEE : 0;
        if (subtotalElement) subtotalElement.textContent = formatVND(subtotal);
        if (shippingElement) shippingElement.textContent = subtotal > 0 ? formatVND(SHIPPING_FEE) : formatVND(0); 
        if (totalElement) totalElement.textContent = formatVND(total);
    }

    function renderCart() {
        // ... (Logic renderCart sử dụng productData đã sửa tên)
    }

    function updateQuantity(e) { /* ... */ }
    function removeItem(e) { /* ... */ }
    function handleCheckout(e) { /* ... */ }

    window.addToCart = (productId, quantity = 1) => {
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += quantity;
        } else {
            if (productData[productId]) {
                cart.push({ id: productId, quantity: quantity });
            } else {
                console.warn(`Sản phẩm với ID ${productId} không tồn tại.`);
                return;
            }
        }
        saveCart(cart);
        updateCartCount(); 
    }
    
    // Khởi tạo
    if (document.body.classList.contains('page-cart')) {
        renderCart();
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    updateCartCount(); 
});