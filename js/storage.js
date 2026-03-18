// ── STORAGE HELPERS ──
const Storage = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },

  // ── USERS ──
  getUsers() { return this.get('pf_users', []); },
  saveUsers(users) { this.set('pf_users', users); },

  // ── SESSION ──
  getSession() { return this.get('pf_session', null); },
  setSession(user) { this.set('pf_session', user); },
  clearSession() { this.remove('pf_session'); },

  // ── TURMAS ──
  getTurmas() { return this.get('pf_turmas', []); },
  saveTurmas(turmas) { this.set('pf_turmas', turmas); },
  getTurma(id) { return this.getTurmas().find(t => t.id === id) || null; },

  // ── ALUNOS ──
  getAlunos(turmaId) { return this.get(`pf_alunos_${turmaId}`, []); },
  saveAlunos(turmaId, alunos) { this.set(`pf_alunos_${turmaId}`, alunos); },

  // ── UCs ──
  getUCs(turmaId) { return this.get(`pf_ucs_${turmaId}`, []); },
  saveUCs(turmaId, ucs) { this.set(`pf_ucs_${turmaId}`, ucs); },

  // ── AULAS ──
  getAulas(turmaId, ucId) { return this.get(`pf_aulas_${turmaId}_${ucId}`, []); },
  saveAulas(turmaId, ucId, aulas) { this.set(`pf_aulas_${turmaId}_${ucId}`, aulas); },

  // ── PRESENÇA ──
  getPresencas(turmaId, ucId, aulaId) {
    return this.get(`pf_presencas_${turmaId}_${ucId}_${aulaId}`, {});
  },
  savePresencas(turmaId, ucId, aulaId, presencas) {
    this.set(`pf_presencas_${turmaId}_${ucId}_${aulaId}`, presencas);
  },

  // ── GENERATE ID ──
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
};
