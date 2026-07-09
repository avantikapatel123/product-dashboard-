function CheckoutModal({ cartCount, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="checkout-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>Checkout</h2>
          <button type="button" onClick={onClose}>
            X
          </button>
        </div>

        <p>Total items in cart: {cartCount}</p>

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Continue Shopping
          </button>
          <button type="button">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
