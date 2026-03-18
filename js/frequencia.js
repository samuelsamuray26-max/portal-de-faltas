// ── FREQUÊNCIA ──
const Frequencia = {
  getAulas(turmaId, ucId) {
    return Storage.getAulas(turmaId, ucId);
  },

  criarAula(turmaId, ucId, data) {
    const aulas = Storage.getAulas(turmaId, ucId);
    const num = aulas.length + 1;
    const aula = {
      id: Storage.uid(),
      numero: num,
      label: `Aula ${String(num).padStart(2, '0')}`,
      data
    };
    aulas.push(aula);
    Storage.saveAulas(turmaId, ucId, aulas);
    return aula;
  },

  deleteAula(turmaId, ucId, aulaId) {
    const aulas = Storage.getAulas(turmaId, ucId).filter(a => a.id !== aulaId);
    // Renumber
    aulas.forEach((a, i) => {
      a.numero = i + 1;
      a.label = `Aula ${String(i + 1).padStart(2, '0')}`;
    });
    Storage.saveAulas(turmaId, ucId, aulas);
  },

  setPresenca(turmaId, ucId, aulaId, alunoId, presente) {
    const p = Storage.getPresencas(turmaId, ucId, aulaId);
    p[alunoId] = presente;
    Storage.savePresencas(turmaId, ucId, aulaId, p);
  },

  getPresenca(turmaId, ucId, aulaId, alunoId) {
    const p = Storage.getPresencas(turmaId, ucId, aulaId);
    // If not set, default to null (não registrado)
    return p.hasOwnProperty(alunoId) ? p[alunoId] : null;
  },

  // ── COMPUTE STATS FOR A SINGLE ALUNO IN A UC ──
  computeStats(turmaId, ucId, alunoId, uc) {
    const aulas = Storage.getAulas(turmaId, ucId);
    // Sort by numero
    const sorted = [...aulas].sort((a, b) => a.numero - b.numero);

    let presencas = 0;
    let faltasConsecutivas = false;
    let consecCount = 0;

    for (const aula of sorted) {
      const p = this.getPresenca(turmaId, ucId, aula.id, alunoId);
      if (p === true) {
        presencas++;
        consecCount = 0;
      } else if (p === false) {
        consecCount++;
        if (consecCount >= 2) faltasConsecutivas = true;
      }
      // null = não registrado, ignora
    }

    const totalPlanejadas = uc.totalAulas;
    const pct = totalPlanejadas > 0 ? (presencas / totalPlanejadas) * 100 : 100;
    const baixaPresenca = pct < 40;

    return { presencas, totalPlanejadas, pct, faltasConsecutivas, baixaPresenca };
  },

  // ── FULL MATRIX: aluno -> [presenca por aula ordenada] ──
  getMatrix(turmaId, ucId) {
    const aulas = Storage.getAulas(turmaId, ucId);
    return [...aulas].sort((a, b) => a.numero - b.numero);
  }
};
