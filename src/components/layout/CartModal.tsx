import { useCart } from '../../context/Cartcontext';
import { X, Trash2, ShoppingBag, CreditCard } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cart, removeFromCart, totalPrice, finalizarCompra } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    const nombre = prompt("Por favor, ingresa tu nombre para procesar el pedido:");
    if (nombre && nombre.trim() !== "") {
      finalizarCompra(nombre);
      onClose(); // Cerramos el modal tras la compra
    } else {
      alert("Debes ingresar un nombre para continuar.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Cabecera */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} />
            <h2 style={{ margin: 0, fontSize: '18px' }}>Tu Carrito</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn}><X size={24} /></button>
        </div>

        {/* Lista de Productos */}
        <div style={styles.content}>
          {cart.length === 0 ? (
            <div style={styles.emptyState}>
              <p>Tu carrito está vacío</p>
              <button onClick={onClose} style={styles.continueBtn}>Ir a comprar</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.itemImg} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>${item.price} x {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={styles.deleteBtn}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Resumen y Botón de Pago */}
        {cart.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span>Total a pagar:</span>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>${totalPrice}</span>
            </div>
            <button onClick={handleCheckout} style={styles.checkoutBtn}>
              <CreditCard size={18} /> CONFIRMAR PEDIDO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed' as const, top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'flex-end' },
  modal: { background: 'white', width: '100%', maxWidth: '400px', height: '100%', display: 'flex', flexDirection: 'column' as const, boxShadow: '-5px 0 15px rgba(0,0,0,0.1)' },
  header: { padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  content: { flex: 1, padding: '20px', overflowY: 'auto' as const },
  emptyState: { textAlign: 'center' as const, marginTop: '50px' },
  continueBtn: { marginTop: '15px', padding: '10px 20px', background: 'black', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  cartItem: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f5f5f5' },
  itemImg: { width: '60px', height: '60px', objectFit: 'cover' as const, borderRadius: '4px' },
  deleteBtn: { background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' },
  footer: { padding: '20px', borderTop: '2px solid #eee', background: '#fafafa' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  checkoutBtn: { width: '100%', padding: '15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' as const, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }
};
