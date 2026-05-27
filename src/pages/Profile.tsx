import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { currentUser } from '@/data/mockData';

export default function Profile() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    transfers: true,
    marketing: false,
  });
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-secondary'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-5' : ''}`}
      />
    </button>
  );

  const sections = [
    {
      title: 'Безопасность',
      items: [
        { label: 'Биометрия', desc: 'Вход по отпечатку пальца / Face ID', value: biometric, onChange: () => setBiometric(!biometric) },
        { label: 'Двухфакторная аутентификация', desc: 'SMS-код при каждом входе', value: twoFactor, onChange: () => setTwoFactor(!twoFactor) },
      ],
    },
    {
      title: 'Уведомления',
      items: [
        { label: 'Push-уведомления', desc: 'Мгновенные оповещения', value: notifications.push, onChange: () => setNotifications((n) => ({ ...n, push: !n.push })) },
        { label: 'Уведомления на email', desc: 'Выписки и важные события', value: notifications.email, onChange: () => setNotifications((n) => ({ ...n, email: !n.email })) },
        { label: 'SMS-уведомления', desc: 'Сообщения на телефон', value: notifications.sms, onChange: () => setNotifications((n) => ({ ...n, sms: !n.sms })) },
        { label: 'Переводы и платежи', desc: 'Уведомления о транзакциях', value: notifications.transfers, onChange: () => setNotifications((n) => ({ ...n, transfers: !n.transfers })) },
        { label: 'Маркетинг', desc: 'Акции и специальные предложения', value: notifications.marketing, onChange: () => setNotifications((n) => ({ ...n, marketing: !n.marketing })) },
      ],
    },
  ];

  const menuLinks = [
    { icon: 'FileText', label: 'Документы и выписки' },
    { icon: 'Shield', label: 'Политика конфиденциальности' },
    { icon: 'HelpCircle', label: 'Помощь и поддержка' },
    { icon: 'Star', label: 'Оценить приложение' },
    { icon: 'Share2', label: 'Пригласить друга' },
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="card-glow relative rounded-2xl bg-card border border-border p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {currentUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            <p className="text-sm text-muted-foreground">{currentUser.phone}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-medium">{currentUser.status}</span>
            <p className="text-xs text-muted-foreground">с {currentUser.memberSince}</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-secondary hover:bg-secondary/80 transition-colors text-foreground text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2">
          <Icon name="Pencil" size={14} />
          Редактировать профиль
        </button>
      </div>

      {/* Toggle sections */}
      {sections.map((section) => (
        <div key={section.title} className="card-glow rounded-2xl bg-card border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</p>
          </div>
          <div className="divide-y divide-border">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <Toggle value={item.value} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Menu links */}
      <div className="card-glow rounded-2xl bg-card border border-border overflow-hidden divide-y divide-border">
        {menuLinks.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary/50 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <Icon name={item.icon} size={15} className="text-muted-foreground" />
            </div>
            <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
            <Icon name="ChevronRight" size={15} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-500/30 text-red-400 hover:bg-red-500/8 transition-colors text-sm font-medium">
        <Icon name="LogOut" size={16} />
        Выйти из аккаунта
      </button>

      <p className="text-center text-xs text-muted-foreground pb-2">Банк Ари 4 · Версия 1.0.0</p>
    </div>
  );
}
