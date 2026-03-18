// ── UNIDADES CURRICULARES ──
const UCs = {
  getAll(turmaId) {
    return Storage.getUCs(turmaId);
  },

  create(turmaId, nome, totalAulas) {
    const ucs = Storage.getUCs(turmaId);
    const uc = { id: Storage.uid(), nome, totalAulas: parseInt(totalAulas) };
    ucs.push(uc);
    Storage.saveUCs(turmaId, ucs);
    return uc;
  },

  update(turmaId, ucId, nome, totalAulas) {
    const ucs = Storage.getUCs(turmaId);
    const idx = ucs.findIndex(u => u.id === ucId);
    if (idx === -1) return { ok: false, msg: 'UC não encontrada.' };
    ucs[idx] = { ...ucs[idx], nome, totalAulas: parseInt(totalAulas) };
    Storage.saveUCs(turmaId, ucs);
    return { ok: true };
  },

  delete(turmaId, ucId) {
    const ucs = Storage.getUCs(turmaId).filter(u => u.id !== ucId);
    Storage.saveUCs(turmaId, ucs);
  },

  getById(turmaId, ucId) {
    return Storage.getUCs(turmaId).find(u => u.id === ucId) || null;
  }
};
