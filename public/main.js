const API = {
  alunos: '/alunos',
  professores: '/professores',
  treinos: '/treinos',
  planos: '/planos'
}
  
  // --------- Tabs e Subtabs ---------
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'))
      btn.classList.add('active')
      document.getElementById(btn.dataset.tab).classList.add('active')
      // Atualiza selects ao trocar de aba
      if (btn.dataset.tab === 'treinos') preencherProfessoresNoTreino()
      if (btn.dataset.tab === 'planos') preencherAlunosNoPlano()
    }
  })
  
  document.querySelectorAll('.subtabs').forEach(subtabGroup => {
    subtabGroup.querySelectorAll('.subtab-btn').forEach(btn => {
      btn.onclick = () => {
        const parent = btn.closest('.tab-content')
        parent.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'))
        parent.querySelectorAll('.subtab-content').forEach(tab => tab.classList.remove('active'))
        btn.classList.add('active')
        parent.querySelector(`#${btn.dataset.subtab}`).classList.add('active')
      }
    })
  })
  
  function showMsg(id, text, erro = false) {
    const el = document.getElementById(id)
    el.textContent = text
    el.style.color = erro ? '#ff3385' : '#e60073'
    setTimeout(() => { el.textContent = '' }, 3000)
  }
  
  // --------- Alunos ---------
const formAluno = document.getElementById('form-aluno')
const listaAlunos = document.getElementById('lista-alunos')
const buscaListaAlunos = document.getElementById('busca-lista-alunos')
let alunosCache = []

formAluno.onsubmit = async e => {
  e.preventDefault()
  const aluno = {
    nome: document.getElementById('aluno-nome').value,
    email: document.getElementById('aluno-email').value,
    telefone: document.getElementById('aluno-telefone').value,
    dataNascimento: document.getElementById('aluno-dataNascimento').value,
    idade: parseInt(document.getElementById('aluno-idade').value),
    peso: parseFloat(document.getElementById('aluno-peso').value)
  }
  try {
    const res = await fetch(API.alunos, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
    if (!res.ok) {
      const erro = await res.json()
      showMsg('msg-aluno', erro.message || 'Erro ao cadastrar', true)
    } else {
      showMsg('msg-aluno', 'Aluno cadastrado!')
      formAluno.reset()
      fetchAlunos()
      preencherAlunosNoPlano()
    }
  } catch {
    showMsg('msg-aluno', 'Erro de conexão', true)
  }
}

async function fetchAlunos() {
  listaAlunos.innerHTML = ''
  const res = await fetch(API.alunos)
  const alunos = await res.json()
  alunosCache = alunos
  alunos.forEach(aluno => {
    const dataNasc = aluno.dataNascimento ? new Date(aluno.dataNascimento).toLocaleDateString() : ''
    const telefone = aluno.telefone || ''
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="info">
        <span><strong>Nome:</strong> ${aluno.nome}</span>
        <span><strong>Email:</strong> ${aluno.email}</span>
        <span><strong>Telefone:</strong> ${telefone}</span>
        <span><strong>Data de Nascimento:</strong> ${dataNasc}</span>
        <span><strong>Idade:</strong> ${aluno.idade}</span>
        <span><strong>Peso:</strong> ${aluno.peso} kg</span>
      </div>
      <span class="actions">
        <button onclick="excluirAluno('${aluno._id}')">Excluir</button>
      </span>
    `
    listaAlunos.appendChild(li)
  })
}
window.excluirAluno = async id => {
  if (!confirm('Excluir aluno?')) return
  await fetch(`${API.alunos}/${id}`, { method: 'DELETE' })
  fetchAlunos()
  preencherAlunosNoPlano()
}
fetchAlunos()

// Buscar aluno
window.buscarAluno = async function() {
  const nome = document.getElementById('busca-aluno-nome').value.toLowerCase()
  buscaListaAlunos.innerHTML = ''
  const res = await fetch(API.alunos)
  const alunos = await res.json()
  alunos.filter(a => a.nome.toLowerCase().includes(nome)).forEach(aluno => {
    const dataNasc = aluno.dataNascimento ? new Date(aluno.dataNascimento).toLocaleDateString() : ''
    const telefone = aluno.telefone || ''
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="info">
        <span><strong>Nome:</strong> ${aluno.nome}</span>
        <span><strong>Email:</strong> ${aluno.email}</span>
        <span><strong>Telefone:</strong> ${telefone}</span>
        <span><strong>Data de Nascimento:</strong> ${dataNasc}</span>
        <span><strong>Idade:</strong> ${aluno.idade}</span>
        <span><strong>Peso:</strong> ${aluno.peso} kg</span>
      </div>
      <span class="actions">
        <button onclick="excluirAluno('${aluno._id}')">Excluir</button>
      </span>
    `
    buscaListaAlunos.appendChild(li)
  })
}
  
  // --------- Professores ---------
  const formProf = document.getElementById('form-professor')
  const listaProf = document.getElementById('lista-professores')
  const buscaListaProf = document.getElementById('busca-lista-professores')
  let professoresCache = []
  
  formProf.onsubmit = async e => {
    e.preventDefault()
    const prof = {
      nome: document.getElementById('prof-nome').value,
      email: document.getElementById('prof-email').value,
      especialidade: document.getElementById('prof-especialidade').value
    }
    try {
      const res = await fetch(API.professores, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prof)
      })
      if (!res.ok) {
        const erro = await res.json()
        showMsg('msg-professor', erro.message || 'Erro ao cadastrar', true)
      } else {
        showMsg('msg-professor', 'Professor cadastrado!')
        formProf.reset()
        fetchProfessores()
        preencherProfessoresNoTreino()
      }
    } catch {
      showMsg('msg-professor', 'Erro de conexão', true)
    }
  }
  
  async function fetchProfessores() {
    listaProf.innerHTML = ''
    const res = await fetch(API.professores)
    const profs = await res.json()
    professoresCache = profs
    profs.forEach(prof => {
      const li = document.createElement('li')
      li.innerHTML = `
        <div class="info">
          <span><strong>Nome:</strong> ${prof.nome}</span>
          <span><strong>Email:</strong> ${prof.email}</span>
          <span><strong>Especialidade:</strong> ${prof.especialidade}</span>
        </div>
        <span class="actions">
          <button onclick="excluirProfessor('${prof._id}')">Excluir</button>
        </span>
      `
      listaProf.appendChild(li)
    })
  }
  window.excluirProfessor = async id => {
    if (!confirm('Excluir professor?')) return
    await fetch(`${API.professores}/${id}`, { method: 'DELETE' })
    fetchProfessores()
    preencherProfessoresNoTreino()
  }
  fetchProfessores()
  
  // Buscar professor
  window.buscarProfessor = async function() {
    const nome = document.getElementById('busca-prof-nome').value.toLowerCase()
    buscaListaProf.innerHTML = ''
    const res = await fetch(API.professores)
    const profs = await res.json()
    profs.filter(p => p.nome.toLowerCase().includes(nome)).forEach(prof => {
      const li = document.createElement('li')
      li.innerHTML = `
        <div class="info">
          <span><strong>Nome:</strong> ${prof.nome}</span>
          <span><strong>Email:</strong> ${prof.email}</span>
          <span><strong>Especialidade:</strong> ${prof.especialidade}</span>
        </div>
        <span class="actions">
          <button onclick="excluirProfessor('${prof._id}')">Excluir</button>
        </span>
      `
      buscaListaProf.appendChild(li)
    })
  }
  
  // --------- Treinos ---------
const formTreino = document.getElementById('form-treino')
const listaTreinos = document.getElementById('lista-treinos')
const buscaListaTreinos = document.getElementById('busca-lista-treinos')

// Função para preencher o select de alunos no cadastro de treino
async function preencherAlunosNoTreino() {
  if (!alunosCache.length) await fetchAlunos()
  const select = document.getElementById('treino-aluno')
  select.innerHTML = '<option value="">Selecione o Aluno</option>'
  alunosCache.forEach(aluno => {
    select.innerHTML += `<option value="${aluno._id}">${aluno.nome} (${aluno.email})</option>`
  })
}

// Função para preencher o select de professores no cadastro de treino
async function preencherProfessoresNoTreino() {
  if (!professoresCache.length) await fetchProfessores()
  const select = document.getElementById('treino-professor')
  select.innerHTML = '<option value="">Selecione o Professor</option>'
  professoresCache.forEach(prof => {
    select.innerHTML += `<option value="${prof._id}">${prof.nome} (${prof.especialidade})</option>`
  })
}

// Sempre que a aba de treinos for ativada, preenche os selects
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.tab === 'treinos') {
      preencherProfessoresNoTreino()
      preencherAlunosNoTreino()
    }
  })
})

formTreino.onsubmit = async e => {
  e.preventDefault()
  const alunoId = document.getElementById('treino-aluno').value
  const professorId = document.getElementById('treino-professor').value
  const alunoObj = alunosCache.find(a => a._id === alunoId)
  const treino = {
    nome: alunoObj ? alunoObj.nome : '', // <-- Envia o nome do aluno
    aluno: alunoId,
    exercicios: document.getElementById('treino-exercicios').value.split(',').map(e => e.trim()),
    professor: professorId
  }
  console.log('Treino enviado:', treino)
  try {
    const res = await fetch(API.treinos, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(treino)
    })
    if (!res.ok) {
      const erro = await res.json().catch(() => ({}))
      console.log('Erro do backend:', erro)
      showMsg('msg-treino', erro.message || 'Erro ao cadastrar', true)
      return
    }
    showMsg('msg-treino', 'Treino cadastrado!')
    formTreino.reset()
    fetchTreinos()
    preencherAlunosNoTreino()
  } catch {
    showMsg('msg-treino', 'Erro de conexão', true)
  }
}

async function fetchTreinos() {
  listaTreinos.innerHTML = ''
  const res = await fetch(API.treinos)
  const treinos = await res.json()
  treinos.forEach(treino => {
    const prof = professoresCache.find(p => p._id === treino.professor)
    const nomeProf = prof ? prof.nome : treino.professor || ''
    const aluno = alunosCache.find(a => a._id === treino.aluno)
    const nomeAluno = aluno ? aluno.nome : treino.aluno || ''
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="info">
        <span><strong>Aluno:</strong> ${nomeAluno}</span>
        <span><strong>Exercícios:</strong> ${Array.isArray(treino.exercicios) ? treino.exercicios.join(', ') : ''}</span>
        <span><strong>Professor:</strong> ${nomeProf}</span>
      </div>
      <span class="actions">
        <button onclick="excluirTreino('${treino._id}')">Excluir</button>
      </span>
    `
    listaTreinos.appendChild(li)
  })
}
window.excluirTreino = async id => {
  if (!confirm('Excluir treino?')) return
  await fetch(`${API.treinos}/${id}`, { method: 'DELETE' })
  fetchTreinos()
}
fetchTreinos()

// Buscar treino (busca por nome do aluno)
window.buscarTreino = async function() {
  const nome = document.getElementById('busca-treino-nome').value.toLowerCase()
  buscaListaTreinos.innerHTML = ''
  const res = await fetch(API.treinos)
  const treinos = await res.json()
  treinos.filter(t => {
    const aluno = alunosCache.find(a => a._id === t.aluno)
    const nomeAluno = aluno ? aluno.nome.toLowerCase() : ''
    return nomeAluno.includes(nome)
  }).forEach(treino => {
    const prof = professoresCache.find(p => p._id === treino.professor)
    const nomeProf = prof ? prof.nome : treino.professor || ''
    const aluno = alunosCache.find(a => a._id === treino.aluno)
    const nomeAluno = aluno ? aluno.nome : treino.aluno || ''
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="info">
        <span><strong>Aluno:</strong> ${nomeAluno}</span>
        <span><strong>Exercícios:</strong> ${Array.isArray(treino.exercicios) ? treino.exercicios.join(', ') : ''}</span>
        <span><strong>Professor:</strong> ${nomeProf}</span>
      </div>
      <span class="actions">
        <button onclick="excluirTreino('${treino._id}')">Excluir</button>
      </span>
    `
    buscaListaTreinos.appendChild(li)
  })
}
  
// --------- Planos ---------
const formPlano = document.getElementById('form-plano')
const listaPlanos = document.getElementById('lista-planos')
const buscaListaPlanos = document.getElementById('busca-lista-planos')

formPlano.onsubmit = async e => {
  e.preventDefault()
  const alunoId = document.getElementById('plano-aluno').value
  const alunoObj = alunosCache.find(a => a._id === alunoId)
  const plano = {
    nome: alunoObj ? alunoObj.nome : '', // <-- Adiciona o nome do aluno
    aluno: alunoId,
    preco: parseFloat(document.getElementById('plano-preco').value),
    duracaoMeses: parseInt(document.getElementById('plano-duracaoMeses').value)
  }
  try {
    const res = await fetch(API.planos, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plano)
    })
    if (!res.ok) {
      const erro = await res.json().catch(() => ({}))
      showMsg('msg-plano', erro.message || 'Erro ao cadastrar', true)
    } else {
      showMsg('msg-plano', 'Plano cadastrado!')
      formPlano.reset()
      fetchPlanos()
    }
  } catch {
    showMsg('msg-plano', 'Erro de conexão', true)
  }
}

async function fetchPlanos() {
  listaPlanos.innerHTML = ''
  const res = await fetch(API.planos)
  const planos = await res.json()
  planos.forEach(plano => {
    const aluno = alunosCache.find(a => a._id === plano.aluno)
    const nomeAluno = aluno ? aluno.nome : plano.aluno || ''
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="info">
        <span><strong>Aluno:</strong> ${nomeAluno}</span>
        <span><strong>Preço:</strong> R$${plano.preco}</span>
        <span><strong>Duração:</strong> ${plano.duracaoMeses} meses</span>
      </div>
      <span class="actions">
        <button onclick="excluirPlano('${plano._id}')">Excluir</button>
      </span>
    `
    listaPlanos.appendChild(li)
  })
}
window.excluirPlano = async id => {
  if (!confirm('Excluir plano?')) return
  await fetch(`${API.planos}/${id}`, { method: 'DELETE' })
  fetchPlanos()
}
fetchPlanos()

// Buscar plano (busca por nome do aluno)
window.buscarPlano = async function() {
  const nome = document.getElementById('busca-plano-nome').value.toLowerCase()
  buscaListaPlanos.innerHTML = ''
  const res = await fetch(API.planos)
  const planos = await res.json()
  planos.filter(p => {
    const aluno = alunosCache.find(a => a._id === p.aluno)
    const nomeAluno = aluno ? aluno.nome.toLowerCase() : ''
    return nomeAluno.includes(nome)
  }).forEach(plano => {
    const aluno = alunosCache.find(a => a._id === plano.aluno)
    const nomeAluno = aluno ? aluno.nome : plano.aluno || ''
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="info">
        <span><strong>Aluno:</strong> ${nomeAluno}</span>
        <span><strong>Preço:</strong> R$${plano.preco}</span>
        <span><strong>Duração:</strong> ${plano.duracaoMeses} meses</span>
      </div>
      <span class="actions">
        <button onclick="excluirPlano('${plano._id}')">Excluir</button>
      </span>
    `
    buscaListaPlanos.appendChild(li)
  })
}

// Preenche o select de alunos no cadastro de plano
async function preencherAlunosNoPlano() {
  if (!alunosCache.length) await fetchAlunos()
  const select = document.getElementById('plano-aluno')
  select.innerHTML = '<option value="">Selecione o Aluno</option>'
  alunosCache.forEach(aluno => {
    select.innerHTML += `<option value="${aluno._id}">${aluno.nome} (${aluno.email})</option>`
  })
}