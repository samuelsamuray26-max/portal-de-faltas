// ── TURMAS ──
const Turmas = {
  getByUser(userId) {
    return Storage.getTurmas().filter(t => t.userId === userId);
  },

  create(userId, nome) {
    const turmas = Storage.getTurmas();
    const turma = { id: Storage.uid(), userId, nome, criadaEm: new Date().toLocaleDateString('pt-BR') };
    turmas.push(turma);
    Storage.saveTurmas(turmas);
    return turma;
  },

  delete(id) {
    const turmas = Storage.getTurmas().filter(t => t.id !== id);
    Storage.saveTurmas(turmas);
  }
};
