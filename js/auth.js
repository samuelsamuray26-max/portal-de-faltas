// ── AUTH ──
const Auth = {
  requireLogin() {
    const session = Storage.getSession();
    if (!session) {
      window.location.href = 'index.html';
      return null;
    }
    return session;
  },

  logout() {
    Storage.clearSession();
    window.location.href = 'index.html';
  },

  register(nome, email, senha) {
    const users = Storage.getUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, msg: 'Este e-mail já está cadastrado.' };
    }
    const user = { id: Storage.uid(), nome, email, senha };
    users.push(user);
    Storage.saveUsers(users);
    return { ok: true };
  },

  login(email, senha) {
    const users = Storage.getUsers();
    const user = users.find(u => u.email === email && u.senha === senha);
    if (!user) return { ok: false, msg: 'E-mail ou senha incorretos.' };
    Storage.setSession(user);
    return { ok: true };
  }
};

// ── SHARED UI HELPERS ──
function showMsg(el, type, text) {
  el.className = `msg msg-${type} show`;
  el.innerHTML = (type === 'error' ? '✕ ' : '✓ ') + text;
}

function hideMsg(el) {
  el.className = 'msg';
}
