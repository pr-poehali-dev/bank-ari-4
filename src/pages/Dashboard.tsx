import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import {
  accounts,
  cards,
  transactions,
  currentUser,
  formatCurrency,
  totalBalance,
} from '@/data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const recentTx = transactions.slice(0, 5);

  const quickActions = [
    { label: 'Перевод', icon: 'ArrowLeftRight', path: '/transfers', color: 'from-blue-500/20 to-violet-500/20 border-blue-500/20' },
    { label: 'Счета', icon: 'Wallet', path: '/accounts', color: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/20' },
    { label: 'Карты', icon: 'CreditCard', path: '/cards', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/20' },
    { label: 'История', icon: 'History', path: '/history', color: 'from-violet-500/20 to-pink-500/20 border-violet-500/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Добро пожаловать,</p>
          <h1 className="text-2xl font-bold text-foreground">{currentUser.name.split(' ')[0]} 👋</h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">27 мая 2026</p>
          <div className="flex items-center gap-1.5 justify-end mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" />
            <p className="text-xs text-green-400">Онлайн</p>
          </div>
        </div>
      </div>

      {/* Total balance card */}
      <div className="relative rounded-2xl p-6 overflow-hidden bank-card animate-scale-in">
        <div className="relative z-10">
          <p className="text-sm text-muted-foreground mb-1">Общий баланс</p>
          <p className="text-4xl font-bold font-mono-num text-gradient mb-1">
            {formatCurrency(totalBalance)}
          </p>
          <p className="text-sm text-muted-foreground">{accounts.length} счёта · {cards.length} карты</p>
        </div>
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-xl" />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Быстрые действия</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className={`card-glow flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br border ${action.color} hover:scale-105 transition-transform`}
            >
              <Icon name={action.icon} size={22} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accounts preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Мои счета</h2>
          <button
            onClick={() => navigate('/accounts')}
            className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            Все счета <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {accounts.map((acc, i) => {
            const gradients = {
              blue: 'from-blue-600/80 to-violet-600/80',
              gold: 'from-amber-600/80 to-orange-500/80',
              green: 'from-emerald-600/80 to-teal-500/80',
            };
            return (
              <button
                key={acc.id}
                onClick={() => navigate('/accounts')}
                className={`card-glow text-left rounded-2xl p-4 bg-gradient-to-br ${gradients[acc.color]} border border-white/10 hover:scale-[1.02] transition-transform animate-fade-in delay-${(i + 1) * 100}`}
              >
                <p className="text-xs text-white/70 mb-2">{acc.name}</p>
                <p className="text-lg font-bold font-mono-num text-white">{formatCurrency(acc.balance)}</p>
                <p className="text-xs text-white/50 mt-1 font-mono">{acc.number.slice(-9)}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Последние операции</h2>
          <button
            onClick={() => navigate('/history')}
            className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            Все <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="card-glow rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden">
          {recentTx.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg flex-shrink-0">
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.category} · {tx.time}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-semibold font-mono-num ${tx.amount > 0 ? 'text-green-400' : 'text-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
