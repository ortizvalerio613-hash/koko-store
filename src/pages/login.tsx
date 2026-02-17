import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Store, ArrowRight } from 'lucide-react';
import type { User } from '../types';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de validación
    const userToLogin: User = {
      id: "123", 
      name: email.split('@')[0], 
      email,
      role: 'admin' 
    };

    login(userToLogin);
    alert("¡Bienvenido de nuevo a tu estudio!");
    navigate('/admin'); 
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Icono de Marca Superior */}
        <div style={styles.brandIcon}>
          <Store size={30} color="#2D5A27" />
        </div>

        <h2 style={styles.title}>Estudio Koko</h2>
        <p style={styles.subtitle}>Gestiona tu colección y ventas</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.icon} />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="ejemplo@tienda.com"
                style={styles.input}
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                style={styles.input}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? <EyeOff size={18} color="#2D5A27" /> : <Eye size={18} color="#2D5A27" />}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.submitBtn}>
            ENTRAR AL PANEL <ArrowRight size={16} style={{marginLeft: 10}} />
          </button>
        </form>

        <p style={styles.footerText}>
          ¿Aún no tienes una tienda? <Link to="/registro" style={styles.link}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFCF0', padding: '20px' },
  card: { background: 'white', padding: '45px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(45, 90, 39, 0.1)', width: '100%', maxWidth: '400px', border: '1px solid rgba(45, 90, 39, 0.05)' },
  brandIcon: { width: '60px', height: '60px', background: '#FDFCF0', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' },
  title: { textAlign: 'center' as const, marginBottom: '5px', color: '#2D5A27', fontSize: '24px', fontWeight: '900', textTransform: 'uppercase' as const, letterSpacing: '-1px' },
  subtitle: { textAlign: 'center' as const, color: '#D4B996', marginBottom: '35px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' as const },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '22px' },
  inputGroup: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  label: { fontSize: '11px', fontWeight: '900', color: '#2D5A27', textTransform: 'uppercase' as const, marginLeft: '5px' },
  inputWrapper: { position: 'relative' as const, display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute' as const, left: '14px', color: '#2D5A27', opacity: 0.4 },
  input: { width: '100%', padding: '14px 14px 14px 45px', border: '1px solid #F0F0F0', borderRadius: '14px', outline: 'none', fontSize: '14px', background: '#FDFCF0', color: '#2D5A27', fontWeight: '600' },
  eyeBtn: { position: 'absolute' as const, right: '14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  submitBtn: { padding: '16px', background: '#2D5A27', color: '#FDFCF0', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '900' as const, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' as const, marginTop: '10px', boxShadow: '0 8px 20px rgba(45, 90, 39, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  footerText: { textAlign: 'center' as const, marginTop: '25px', fontSize: '12px', color: '#D4B996', fontWeight: '500' },
  link: { color: '#2D5A27', fontWeight: '900', textDecoration: 'none', textTransform: 'uppercase' as const }
};
