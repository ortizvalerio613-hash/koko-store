import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User as UserIcon, Store, Tag, ArrowRight } from 'lucide-react';
import type { User } from '../types';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Urbana');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'admin' | 'customer'>('customer');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: role === 'admin' ? 'admin' : 'customer'
    };

    login(newUser);
    
    if (role === 'admin') {
      alert(`¡Felicidades! Tu tienda de ropa ${category} ha sido creada.`);
      navigate('/admin');
    } else {
      alert(`¡Bienvenido a Koko Store, ${name}!`);
      navigate('/');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        {/* Encabezado Visual */}
        <div style={styles.headerIcon}>
          {role === 'admin' ? <Store size={32} color="#2D5A27" /> : <UserIcon size={32} color="#2D5A27" />}
        </div>
        
        <h2 style={styles.title}>Crear Cuenta</h2>
        <p style={styles.subtitle}>Únete a la comunidad artesanal de Koko</p>
        
        {/* SELECTOR DE ROL ESTILO PALMA */}
        <div style={styles.roleSelector}>
          <button type="button" onClick={() => setRole('customer')}
            style={{ 
              ...styles.roleBtn, 
              background: role === 'customer' ? '#2D5A27' : 'transparent', 
              color: role === 'customer' ? '#FDFCF0' : '#2D5A27' 
            }}>
            <UserIcon size={16} /> Soy Cliente
          </button>
          <button type="button" onClick={() => setRole('admin')}
            style={{ 
              ...styles.roleBtn, 
              background: role === 'admin' ? '#2D5A27' : 'transparent', 
              color: role === 'admin' ? '#FDFCF0' : '#2D5A27' 
            }}>
            <Store size={16} /> Soy Tienda
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{role === 'admin' ? 'Nombre de la Marca' : 'Nombre completo'}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} placeholder="Ej: Koko Artesanal" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} placeholder="ejemplo@correo.com" />
          </div>

          {role === 'admin' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}><Tag size={12} style={{marginRight: 5}}/> Especialidad de la tienda</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                style={styles.input}
              >
                <option value="Urbana">Sostenible / Orgánica</option>
                <option value="Formal">Artesanal / Hecho a mano</option>
                <option value="Vintage">Curaduría Vintage</option>
              </select>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ ...styles.input, width: '100%', paddingRight: '45px' }} 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                {showPassword ? <EyeOff size={18} color="#2D5A27" /> : <Eye size={18} color="#2D5A27" />}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.submitBtn}>
            {role === 'admin' ? 'REGISTRAR MI MARCA' : 'EMPEZAR COLECCIÓN'} <ArrowRight size={16} style={{marginLeft: 8}} />
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFCF0', padding: '20px' },
  card: { background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(45, 90, 39, 0.1)', width: '100%', maxWidth: '420px', border: '1px solid rgba(45, 90, 39, 0.05)' },
  headerIcon: { width: '60px', height: '60px', background: '#FDFCF0', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' },
  title: { textAlign: 'center' as const, marginBottom: '5px', color: '#2D5A27', fontWeight: '900', fontSize: '24px', textTransform: 'uppercase' as const, letterSpacing: '-1px' },
  subtitle: { textAlign: 'center' as const, color: '#D4B996', marginBottom: '30px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' as const },
  roleSelector: { display: 'flex', gap: '8px', marginBottom: '25px', background: '#FDFCF0', padding: '5px', borderRadius: '15px' },
  roleBtn: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '900' as const, fontSize: '11px', textTransform: 'uppercase' as const, transition: 'all 0.3s' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column' as const, gap: '6px' },
  label: { color: '#2D5A27', fontSize: '11px', fontWeight: '900' as const, textTransform: 'uppercase' as const, marginLeft: '5px' },
  input: { padding: '14px', border: '1px solid #F0F0F0', borderRadius: '14px', outline: 'none', fontSize: '14px', background: '#FDFCF0', color: '#2D5A27', fontWeight: '600' as const },
  eyeBtn: { position: 'absolute' as const, right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' },
  submitBtn: { padding: '16px', background: '#2D5A27', color: '#FDFCF0', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '900' as const, marginTop: '10px', textTransform: 'uppercase' as const, fontSize: '12px', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(45, 90, 39, 0.2)' }
};
