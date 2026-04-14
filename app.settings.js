const Settings = {
  save() {
    S.user.name = document.getElementById('settingName')?.value || S.user.name;
    S.settings.apiKey = document.getElementById('settingApiKey')?.value || '';
    S.settings.apiProvider = document.getElementById('settingApiProvider')?.value || 'builtin';
    S.settings.lang = document.getElementById('settingLang')?.value || 'en';
    S.save();
    toast('⚙️ Settings saved!', 'success');
  },
  toggleTheme() {
    const theme = document.getElementById('settingTheme').value;
    S.settings.theme = theme;
    document.body.setAttribute('data-theme', theme);
    S.save();
  },
  exportData() {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'herai-data.json';
    a.click();
    toast('📥 Data exported!', 'success');
  },
  clearData() {
    if (confirm('Are you sure? This will delete all your data.')) {
      localStorage.removeItem('herai_data');
      location.reload();
    }
  },
  loadDemoData() {
    if (!confirm('This will replace all current data with demo data. Continue?')) return;

    const today = new Date();
    const fmt = d => d.toISOString().slice(0, 10);
    const daysAgo = n => { const d = new Date(today); d.setDate(d.getDate() - n); return fmt(d); };

    S.user = { name: 'Priya', energy: 'high', learningStyle: 'visual' };

    S.tasks = [
      { id: 1001, text: 'Prepare Q2 presentation deck', priority: 'high', category: 'work', scheduledTime: '09:00', done: false, created: fmt(today) },
      { id: 1002, text: 'Review team pull requests', priority: 'high', category: 'work', scheduledTime: '10:30', done: false, created: fmt(today) },
      { id: 1003, text: 'Reply to client emails', priority: 'medium', category: 'work', scheduledTime: '11:00', done: true, created: fmt(today) },
      { id: 1004, text: 'Book dentist appointment', priority: 'medium', category: 'personal', scheduledTime: null, done: false, created: fmt(today) },
      { id: 1005, text: 'Finish online Python course - Week 3', priority: 'medium', category: 'learning', scheduledTime: '15:30', done: false, created: fmt(today) },
      { id: 1006, text: 'Buy birthday gift for Mom', priority: 'low', category: 'errand', scheduledTime: null, done: false, created: fmt(today) },
      { id: 1007, text: 'Update LinkedIn profile', priority: 'low', category: 'personal', scheduledTime: null, done: true, created: daysAgo(1) },
      { id: 1008, text: 'Submit expense report', priority: 'high', category: 'work', scheduledTime: '14:00', done: true, created: daysAgo(1) },
    ];

    S.events = [
      { id: 2001, title: 'Morning standup', time: '09:00', date: fmt(today), type: 'work' },
      { id: 2002, title: 'Sprint planning', time: '10:00', date: fmt(today), type: 'work' },
      { id: 2003, title: 'Lunch with Neha', time: '13:00', date: fmt(today), type: 'personal' },
      { id: 2004, title: 'Code review session', time: '14:30', date: fmt(today), type: 'work' },
      { id: 2005, title: 'Yoga & meditation', time: '18:00', date: fmt(today), type: 'rest' },
      { id: 2006, title: '10-min Excel micro-lesson', time: '20:00', date: fmt(today), type: 'learning' },
    ];

    S.groceries = [
      { id: 3001, name: 'Milk (1L)', category: 'grocery', bought: false },
      { id: 3002, name: 'Eggs (12 pack)', category: 'grocery', bought: false },
      { id: 3003, name: 'Brown Bread', category: 'grocery', bought: true },
      { id: 3004, name: 'Spinach', category: 'grocery', bought: false },
      { id: 3005, name: 'Curd (400g)', category: 'grocery', bought: false },
      { id: 3006, name: 'Paracetamol', category: 'medical', bought: false },
      { id: 3007, name: 'Hand Sanitizer', category: 'household', bought: true },
      { id: 3008, name: 'Rice (5kg)', category: 'grocery', bought: false },
      { id: 3009, name: 'Bananas', category: 'grocery', bought: false },
    ];

    S.expenses = [
      { id: 4001, amount: 2500, desc: 'Monthly groceries', category: 'Food', date: daysAgo(5) },
      { id: 4002, amount: 1500, desc: 'Uber rides', category: 'Transport', date: daysAgo(4) },
      { id: 4003, amount: 499, desc: 'Netflix subscription', category: 'Entertainment', date: daysAgo(3) },
      { id: 4004, amount: 3200, desc: 'New running shoes', category: 'Shopping', date: daysAgo(3) },
      { id: 4005, amount: 800, desc: 'Doctor consultation', category: 'Health', date: daysAgo(2) },
      { id: 4006, amount: 350, desc: 'Coffee & snacks', category: 'Food', date: daysAgo(1) },
      { id: 4007, amount: 1200, desc: 'Online Python course', category: 'Education', date: daysAgo(1) },
      { id: 4008, amount: 5000, desc: 'Electricity bill', category: 'Bills', date: fmt(today) },
      { id: 4009, amount: 450, desc: 'Lunch at restaurant', category: 'Food', date: fmt(today) },
    ];
    S.finance = { income: 60000, savingsGoal: 15000 };

    S.mealPlan = AI.generateMealPlan();

    S.familyEvents = [
      { id: 5001, event: 'Mom\'s Birthday', date: daysAgo(-10), who: 'Mom' },
      { id: 5002, event: 'School Parent-Teacher Meeting', date: daysAgo(-5), who: 'Kid' },
      { id: 5003, event: 'Anniversary dinner', date: daysAgo(-15), who: 'Spouse' },
    ];

    S.geoReminders = [
      { id: 6001, store: 'Fresh Mart', category: 'grocery', items: ['Milk', 'Eggs', 'Spinach', 'Rice'], favorite: true, dismissed: false },
      { id: 6002, store: 'Apollo Pharmacy', category: 'medical', items: ['Paracetamol', 'Vitamin D'], favorite: false, dismissed: false },
    ];

    S.skills = [
      { id: 7001, name: 'Excel', progress: 55, minutes: 120 },
      { id: 7002, name: 'Python', progress: 30, minutes: 65 },
      { id: 7003, name: 'Public Speaking', progress: 15, minutes: 30 },
    ];

    S.wins = [
      { id: 8001, text: 'Led my first team presentation — got great feedback from VP!', date: daysAgo(15) },
      { id: 8002, text: 'Completed Excel course — now automating monthly reports', date: daysAgo(8) },
      { id: 8003, text: 'Negotiated 20% salary raise successfully', date: daysAgo(3) },
      { id: 8004, text: 'Published first LinkedIn article — 500+ views!', date: daysAgo(1) },
    ];

    S.moods = [
      { date: daysAgo(6), mood: 'good' },
      { date: daysAgo(5), mood: 'great' },
      { date: daysAgo(4), mood: 'okay' },
      { date: daysAgo(3), mood: 'stressed' },
      { date: daysAgo(2), mood: 'good' },
      { date: daysAgo(1), mood: 'great' },
      { date: fmt(today), mood: 'good' },
    ];

    S.sleepLog = [
      { date: daysAgo(2), hours: 6, quality: 'okay' },
      { date: daysAgo(1), hours: 7.5, quality: 'good' },
      { date: fmt(today), hours: 8, quality: 'great' },
    ];

    const cycleStart = new Date(today);
    cycleStart.setDate(cycleStart.getDate() - 8);
    S.cycle = { startDate: fmt(cycleStart), length: 28 };

    S.instructorTopic = 'excel';
    S.instructorWeek = 1;

    S.chatHistory = [
      { role: 'user', content: 'Hi! What can you help me with?' },
      { role: 'assistant', content: AI.getGreeting() + '! 👋 I\'m your HER-AI AI.\n\nI can help with:\n• 📋 Tasks & productivity\n• 📅 Scheduling & planning\n• 💰 Finance & budgeting\n• 🎓 Learning & skills\n• 🏠 Home management\n• 💜 Wellness & mood\n• 👑 Leadership & communication\n• ✨ Personal branding\n\nJust ask me anything!' },
      { role: 'user', content: 'How are my tasks looking today?' },
      { role: 'assistant', content: 'You have 5 pending tasks:\n\n• Prepare Q2 presentation deck (high priority)\n• Review team pull requests (high priority)\n• Book dentist appointment (medium priority)\n• Finish online Python course - Week 3 (medium priority)\n• Buy birthday gift for Mom (low priority)\n\n💡 Tip: Your energy is high — tackle the presentation deck now!' },
    ];

    S.instructorHistory = [
      { role: 'user', content: 'I want to learn Excel' },
      { role: 'ai', content: 'Great choice! Let me create a personalized Excel learning path for you.\n\nI\'ll use diagrams, examples, and visual step-by-step guides since you learn best visually.\n\n📚 Your Excel Learning Path:\n\n1️⃣ Week 1: Formulas (SUM, AVERAGE, IF)\n2️⃣ Week 2: VLOOKUP & HLOOKUP\n3️⃣ Week 3: Pivot Tables\n4️⃣ Week 4: Charts & Data Visualization\n\nType "week 1" to start, or "next" anytime to continue!' },
    ];

    S.settings = { theme: 'light', apiKey: '', apiProvider: 'builtin', lang: 'en' };

    S.save();
    toast('🎉 Demo data loaded! Refreshing...', 'success');
    setTimeout(() => location.reload(), 1000);
  },
  load() {
    if (S.user.name) document.getElementById('settingName').value = S.user.name;
    if (S.settings.apiKey) document.getElementById('settingApiKey').value = S.settings.apiKey;
    if (S.settings.apiProvider) document.getElementById('settingApiProvider').value = S.settings.apiProvider;
    if (S.settings.theme) {
      document.getElementById('settingTheme').value = S.settings.theme;
      document.body.setAttribute('data-theme', S.settings.theme);
    }
  }
};
