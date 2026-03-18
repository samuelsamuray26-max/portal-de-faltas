// ── ALUNOS ──
const Alunos = {
  getAll(turmaId) {
    return Storage.getAlunos(turmaId);
  },

  create(turmaId, nome, matricula) {
    const alunos = Storage.getAlunos(turmaId);
    if (alunos.find(a => a.matricula === matricula)) {
      return { ok: false, msg: 'Matrícula já cadastrada nesta turma.' };
    }
    const aluno = { id: Storage.uid(), nome, matricula };
    alunos.push(aluno);
    Storage.saveAlunos(turmaId, alunos);
    return { ok: true, aluno };
  },

  update(turmaId, alunoId, nome, matricula) {
    const alunos = Storage.getAlunos(turmaId);
    const dup = alunos.find(a => a.matricula === matricula && a.id !== alunoId);
    if (dup) return { ok: false, msg: 'Matrícula já cadastrada para outro aluno.' };
    const idx = alunos.findIndex(a => a.id === alunoId);
    if (idx === -1) return { ok: false, msg: 'Aluno não encontrado.' };
    alunos[idx] = { ...alunos[idx], nome, matricula };
    Storage.saveAlunos(turmaId, alunos);
    return { ok: true };
  },

  delete(turmaId, alunoId) {
    const alunos = Storage.getAlunos(turmaId).filter(a => a.id !== alunoId);
    Storage.saveAlunos(turmaId, alunos);
  }
};
