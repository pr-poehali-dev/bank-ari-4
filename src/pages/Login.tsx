import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!phone || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      {/* Background orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full bg-violet-500/8 blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center mb-4 animate-float">
            <span className="text-white font-bold text-2xl">А4</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Банк Ари 4</h1>
          <p className="text-muted-foreground text-sm mt-1">Войдите в свой аккаунт</p>
        </div>

        {/* Form */}
        <div className="card-glow rounded-2xl bg-card border border-border p-6 space-y-4">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Телефон</label>
            <div className="relative">
              <Icon name="Phone" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Пароль</label>
            <div className="relative">
              <Icon name="Lock" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={!phone || !password || loading}
            className="w-full btn-gradient text-white py-3.5 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Входим...
              </>
            ) : (
              <>
                <Icon name="LogIn" size={16} />
                Войти
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Банк Ари 4 · Защищено TLS 1.3
        </p>
      </div>
    </div>
  );
}