import { useState, useMemo, useRef } from 'react';
import { useCart } from '../context/Cartcontext';
import { useAuth } from '../context/AuthContext';
import { 
  ClipboardList, 
  PlusCircle, 
  Trash2, 
  LayoutGrid,
  Image as ImageIcon,
  CreditCard,
  Save,
  MessageCircle,
 
} from 'lucide-react';
import { ChatInterno } from '../components/products/ChatInterno';
import type { Product } from '../types';

export const AdminDashboard = () => {
  const { user } = useAuth();
  
  // CORRECCIÓN: Desestructuración limpia del contexto
  const { 
    inventory, 
    addInventoryProduct, 
    removeInventoryProduct, 
    pedidos, 
    actualizarEstadoPedido,
    paymentMethods,
    setPaymentMethods 
  } = useCart();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados de navegación y formularios
  const [activeTab, setActiveTab] = useState<'inventario' | 'pedidos' | 'pagos'>('inventario');
  const [chatActivo, setChatActivo] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState<string[]>([]);
  
  // Estado para el formulario de pagos
  const [payForm, setPayForm] = useState(paymentMethods);

  const tallasDisponibles = ["S", "M", "L", "XL"];

  // Filtrado de datos por vendedor
  const misProductos = useMemo(() => 
    inventory.filter(p => p.vendorId === user?.id || !p.vendorId), [inventory, user]);

  const misPedidos = useMemo(() => 
    pedidos.filter(p => p.productos.some(prod => prod.vendorId === user?.id || !prod.vendorId)), [pedidos, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleTalla = (talla: string) => {
    setTallasSeleccionadas(prev => 
      prev.includes(talla) ? prev.filter(t => t !== talla) : [...prev, talla]);
  };

  const handleGuardarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    if (tallasSeleccionadas.length === 0 || !imagePreview) {
      alert("Por favor, selecciona tallas y carga una imagen.");
      return;
    }

    const nuevoProducto: Product = {
      id: Date.now(), 
      name: nombre,
      price: Number(precio),
      image: imagePreview,
      sizes: tallasSeleccionadas,
      category: "Colección Palma",
      vendorId: user?.id || 'admin'
    };

    addInventoryProduct(nuevoProducto);
    setNombre(''); setPrecio(''); setImagePreview(''); setTallasSeleccionadas([]);
    alert("¡Pieza añadida al catálogo!");
  };

  const handleSavePayment = () => {
    setPaymentMethods(payForm);
    alert("🏦 Datos de transferencia actualizados.");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Estudio de Gestión</h1>
          <p style={styles.subtitle}>Curador: <span style={{color: '#2D5A27', fontWeight: 'bold'}}>{user?.name}</span></p>
        </div>
        <div style={styles.dateBadge}>
          {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
        </div>
      </header>

      {/* MENÚ DE NAVEGACIÓN */}
      <div style={styles.tabContainer}>
        <button onClick={() => setActiveTab('inventario')} style={{...styles.tabLink, color: activeTab === 'inventario' ? '#2D5A27' : '#999'}}>
          <LayoutGrid size={18} /> Inventario {activeTab === 'inventario' && <div style={styles.activeLine}/>}
        </button>
        <button onClick={() => setActiveTab('pedidos')} style={{...styles.tabLink, color: activeTab === 'pedidos' ? '#2D5A27' : '#999'}}>
          <ClipboardList size={18} /> Pedidos {activeTab === 'pedidos' && <div style={styles.activeLine}/>}
        </button>
        <button onClick={() => setActiveTab('pagos')} style={{...styles.tabLink, color: activeTab === 'pagos' ? '#2D5A27' : '#999'}}>
          <CreditCard size={18} /> Pagos {activeTab === 'pagos' && <div style={styles.activeLine}/>}
        </button>
      </div>

      <main>
        {activeTab === 'inventario' && (
          <div style={styles.contentGrid}>
            <section style={styles.formCard}>
              <h3 style={styles.cardTitle}><PlusCircle size={18} color="#2D5A27" /> Nueva Pieza</h3>
              <form onSubmit={handleGuardarProducto} style={styles.form}>
                <div onClick={() => fileInputRef.current?.click()} style={{...styles.dropzone, backgroundImage: `url(${imagePreview})`, borderColor: '#D4B996'}}>
                  {!imagePreview && <div style={styles.dropzoneContent}><ImageIcon size={24} color="#D4B996" /><p>Subir Fotografía</p></div>}
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{display: 'none'}}/>
                </div>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={styles.input} required />
                <input type="number" placeholder="Precio ($)" value={precio} onChange={(e) => setPrecio(e.target.value)} style={styles.input} required />
                <div>
                  <p style={styles.smallLabel}>Tallas:</p>
                  <div style={styles.tallaGrid}>
                    {tallasDisponibles.map(t => (
                      <button key={t} type="button" onClick={() => toggleTalla(t)} style={{...styles.tallaCircle, background: tallasSeleccionadas.includes(t) ? '#2D5A27' : 'transparent', color: tallasSeleccionadas.includes(t) ? '#E8D5B7' : '#2D5A27', borderColor: '#2D5A27'}}>{t}</button>
                    ))}
                  </div>
                </div>
                <button type="submit" style={styles.primaryBtn}>AÑADIR A MI TIENDA</button>
              </form>
            </section>

            <section style={styles.listCard}>
              <h3 style={styles.cardTitle}><ImageIcon size={18} color="#2D5A27" /> Catálogo Activo</h3>
              <table style={styles.table}>
                <thead><tr style={styles.tableHeader}><th>Pieza</th><th>Valor</th><th>Acción</th></tr></thead>
                <tbody>
                  {misProductos.map(p => (
                    <tr key={p.id} style={styles.tableRow}>
                      <td style={styles.tableCell}><div style={styles.productInfo}><img src={p.image} alt="" style={styles.miniImg} /><span>{p.name}</span></div></td>
                      <td style={styles.tableCell}>${p.price}</td>
                      <td style={styles.tableCell}><button onClick={() => removeInventoryProduct(p.id)} style={styles.deleteBtn}><Trash2 size={16}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {activeTab === 'pedidos' && (
          <div style={styles.orderGrid}>
            {misPedidos.length === 0 ? <p style={{textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#999'}}>No hay ventas registradas.</p> :
              misPedidos.map(p => (
                <div key={p.id} style={styles.orderCard}>
                  <div style={styles.orderHeader}>
                    <strong style={{color: '#2D5A27'}}>Ref: {p.id}</strong>
                    <button onClick={() => setChatActivo(chatActivo === p.id ? null : p.id)} style={styles.chatBtn}>
                      <MessageCircle size={14} /> {chatActivo === p.id ? 'Cerrar Chat' : 'Abrir Chat'}
                    </button>
                  </div>
                  <p style={{fontSize: '13px', margin: '10px 0', color: '#555'}}>Cliente: {p.cliente}</p>
                  {chatActivo === p.id && (
                    <div style={{marginTop: '15px'}}><ChatInterno pedidoId={p.id} emisor="admin" /></div>
                  )}
                  {p.estado === 'Pendiente' && (
                    <button onClick={() => actualizarEstadoPedido(p.id)} style={{...styles.primaryBtn, marginTop: '15px'}}>MARCAR ENVIADO</button>
                  )}
                </div>
              ))
            }
          </div>
        )}

        {activeTab === 'pagos' && (
          <section style={{...styles.formCard, maxWidth: '500px'}}>
            <h3 style={styles.cardTitle}><CreditCard size={18} color="#2D5A27" /> Datos de Pago</h3>
            <div style={styles.form}>
              <input type="text" placeholder="Banco" style={styles.input} value={payForm.banco} onChange={(e) => setPayForm({...payForm, banco: e.target.value})} />
              <input type="text" placeholder="Número de Cuenta" style={styles.input} value={payForm.numero} onChange={(e) => setPayForm({...payForm, numero: e.target.value})} />
              <input type="text" placeholder="Titular" style={styles.input} value={payForm.titular} onChange={(e) => setPayForm({...payForm, titular: e.target.value})} />
              <button onClick={handleSavePayment} style={styles.primaryBtn}><Save size={14} /> GUARDAR CONFIGURACIÓN</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '30px', background: '#FDFCF0', minHeight: '100vh', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  title: { fontSize: '24px', fontWeight: '900', color: '#2D5A27', textTransform: 'uppercase' },
  dateBadge: { background: '#D4B996', color: '#2D5A27', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' },
  tabContainer: { display: 'flex', gap: '30px', borderBottom: '1px solid #EEE', marginBottom: '30px' },
  tabLink: { background: 'none', border: 'none', padding: '10px 5px', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' },
  activeLine: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', background: '#2D5A27' },
  contentGrid: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' },
  formCard: { background: '#FFF', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '12px', border: '1px solid #EEE', background: '#F9F9F9', outline: 'none' },
  dropzone: { height: '150px', border: '2px dashed #D4B996', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backgroundSize: 'cover', backgroundPosition: 'center' },
  dropzoneContent: { textAlign: 'center', color: '#D4B996', fontSize: '12px' },
  primaryBtn: { width: '100%', padding: '15px', borderRadius: '15px', border: 'none', background: '#2D5A27', color: '#E8D5B7', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', fontSize: '11px' },
  tallaGrid: { display: 'flex', gap: '8px' },
  tallaCircle: { width: '35px', height: '35px', borderRadius: '50%', border: '1px solid', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  listCard: { background: '#FFF', padding: '30px', borderRadius: '25px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { textAlign: 'left', fontSize: '11px', color: '#999', borderBottom: '1px solid #EEE', paddingBottom: '10px' },
  tableRow: { borderBottom: '1px solid #F9F9F9' },
  tableCell: { padding: '15px 0', fontSize: '14px', color: '#2D5A27' },
  miniImg: { width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' },
  chatBtn: { background: '#E8D5B7', color: '#2D5A27', border: 'none', padding: '6px 12px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
  orderCard: { background: '#FFF', padding: '20px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '15px' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  productInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
  deleteBtn: { background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer' },
  smallLabel: { fontSize: '11px', fontWeight: 'bold', color: '#999', marginBottom: '5px' },
  orderGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  subtitle: { fontSize: '14px', color: '#666', marginTop: '5px' }
};
