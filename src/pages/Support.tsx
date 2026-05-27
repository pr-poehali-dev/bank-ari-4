import { useState } from 'react';
import Icon from '@/components/ui/icon';

const faqs = [
  {
    q: 'Как сделать перевод на другой банк?',
    a: 'Перейдите в раздел «Переводы», выберите «По номеру телефона» и введите номер получателя. Перевод по СБП осуществляется мгновенно.',
  },
  {
    q: 'Как заморозить карту?',
    a: 'Откройте раздел «Карты», выберите нужную карту и нажмите кнопку «Заморозить». Карту можно разморозить в любой момент.',
  },
  {
    q: 'Как изменить лимит по карте?',
    a: 'В разделе «Карты» нажмите «Лимиты» и укажите желаемый суточный или месячный лимит. Изменения вступают в силу сразу.',
  },
  {
    q: 'Как получить реквизиты счёта?',
    a: 'В разделе «Счета» выберите нужный счёт и нажмите «Реквизиты». PDF с реквизитами будет скачан на ваше устройство.',
  },
  {
    q: 'Безопасно ли интернет-банк?',
    a: 'Да. Все данные шифруются по стандарту TLS 1.3. Транзакции защищены двухфакторной аутентификацией.',
  },
];

interface Message {
  id: number;
  from: 'user' | 'support';
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: 'support',
    text: 'Здравствуйте! Меня зовут Алексей, я оператор службы поддержки Банка Ари 4. Чем могу помочь?',
    time: '09:01',
  },
];

export default function Support() {
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const userMsg: Message = { id: Date.now(), from: 'user', text: input, time };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const replies = [
        'Понял вас, минуту.',
        'Спасибо за обращение! Уже проверяю информацию.',
        'Помогу разобраться с этим вопросом.',
        'Сейчас уточню детали и вернусь к вам.',
      ];
      const reply: Message = {
        id: Date.now() + 1,
        from: 'support',
        text: replies[Math.floor(Math.random() * replies.length)],
        time,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Служба поддержки</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Мы на связи 24/7</p>
      </div>

      {/* Contact options */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: 'MessageCircle', label: 'Чат', desc: 'Онлайн сейчас', color: 'text-green-400' },
          { icon: 'Phone', label: '8 800 555-00-04', desc: 'Бесплатно', color: 'text-blue-400' },
          { icon: 'Mail', label: 'Email', desc: 'support@ari4.ru', color: 'text-violet-400' },
        ].map((item) => (
          <div key={item.label} className="card-glow rounded-2xl bg-card border border-border p-4 text-center">
            <Icon name={item.icon} size={22} className={`${item.color} mx-auto mb-2`} />
            <p className="text-xs font-medium text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl">
        {[
          { value: 'chat', label: 'Чат с оператором', icon: 'MessageSquare' },
          { value: 'faq', label: 'Частые вопросы', icon: 'HelpCircle' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as 'chat' | 'faq')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            <Icon name={tab.icon} size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chat */}
      {activeTab === 'chat' && (
        <div className="card-glow rounded-2xl bg-card border border-border overflow-hidden flex flex-col h-[420px]">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/50">
            <div className="w-9 h-9 rounded-full btn-gradient flex items-center justify-center text-white text-sm font-bold">АЛ</div>
            <div>
              <p className="text-sm font-medium text-foreground">Алексей · Оператор</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Онлайн
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${
                  msg.from === 'user'
                    ? 'btn-gradient text-white rounded-br-sm'
                    : 'bg-secondary text-foreground rounded-bl-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.from === 'user' ? 'text-white/60' : 'text-muted-foreground'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
            <input
              type="text"
              placeholder="Напишите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 btn-gradient rounded-xl flex items-center justify-center disabled:opacity-40"
            >
              <Icon name="Send" size={16} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="card-glow rounded-2xl bg-card border border-border overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 animate-fade-in">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
