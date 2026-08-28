const LAT = 14.6186041;
const LNG = -90.5165099;

const pendientes = [
  { id: 1, desc: 'Cambio de Tóner Negro urgente requerido', fecha: '28/08/2026' },
  { id: 2, desc: 'Revisión preventiva de rodillos programada', fecha: '30/08/2026' }
];

const tickets = [
  { id: '2064552', fecha: '17/08/2026', tipo: 'S', estado: 'Archivado' },
  { id: '2064426', fecha: '17/08/2026', tipo: 'S', estado: 'Recibido' }
];

const visitas = [
  { boleta: '20083953', fecha: '17/08/2026', desc: 'MANTENIMIENTO PREVENTIVO' },
  { boleta: '20078014', fecha: '22/07/2026', desc: 'CONFIGURACION DE USUARIOS' }
];

const toner = [
  { despacho: '130826', fecha: '24/08/2026', item: 'TONER CANON TO3 NEGRO', cant: 1 }
];

function initLogicaEquipos() {
  renderPendientes();
  renderTickets();
  renderTableHelper('tbl-visitas', visitas, ['boleta', 'fecha', 'desc']);
  renderTableHelper('tbl-toner', toner, ['despacho', 'fecha', 'item', 'cant']);

  // Pendientes Interacción
  const cardPendientes = document.getElementById('card-pendientes');
  document.getElementById('btn-close-pendientes')?.addEventListener('click', () => cardPendientes.classList.add('hidden'));
  document.getElementById('nav-pendientes')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.showView('equipos');
    cardPendientes.classList.remove('hidden');
    cardPendientes.scrollIntoView({ behavior: 'smooth' });
  });

  // Mapa
  let mapInstance = null;
  const modalMap = document.getElementById('modal-map');
  document.getElementById('btn-show-map')?.addEventListener('click', () => {
    modalMap.classList.remove('hidden');
    if (!mapInstance) {
      mapInstance = L.map('map').setView([LAT, LNG], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(mapInstance);
      L.marker([LAT, LNG]).addTo(mapInstance).bindPopup('<b>Banco Industrial - Nivel 2</b><br>Equipo Canon IR-ADV 529IF').openPopup();
    } else {
      setTimeout(() => mapInstance.invalidateSize(), 200);
    }
  });

  const closeMap = () => modalMap.classList.add('hidden');
  document.getElementById('btn-close-map')?.addEventListener('click', closeMap);
  document.getElementById('btn-cancel-map')?.addEventListener('click', closeMap);

  // Tickets Modal
  const modalTicket = document.getElementById('modal-ticket');
  document.getElementById('btn-add-ticket')?.addEventListener('click', () => {
    document.getElementById('ticket-id').value = getNextTicketNumber();
    modalTicket.classList.remove('hidden');
  });

  document.getElementById('btn-close-modal')?.addEventListener('click', () => modalTicket.classList.add('hidden'));
  document.getElementById('btn-save-ticket')?.addEventListener('click', () => {
    const id = document.getElementById('ticket-id').value;
    if (id) {
      tickets.unshift({
        id,
        fecha: new Date().toLocaleDateString('es-ES'),
        tipo: document.getElementById('ticket-tipo').value,
        estado: document.getElementById('ticket-estado').value
      });
      renderTickets();
      modalTicket.classList.add('hidden');
    }
  });

  // Edición Ubicación
  const btnEditLocation = document.getElementById('btn-edit-location');
  const locationView = document.getElementById('location-view');
  const locationForm = document.getElementById('location-edit-form');

  btnEditLocation?.addEventListener('click', () => {
    document.getElementById('input-direccion').value = document.getElementById('txt-direccion').innerText;
    document.getElementById('input-zona').value = document.getElementById('txt-zona').innerText;
    document.getElementById('input-contacto').value = document.getElementById('txt-contacto').innerText;
    document.getElementById('input-email').value = document.getElementById('txt-email').innerText;
    locationView.classList.add('hidden');
    locationForm.classList.remove('hidden');
  });

  document.getElementById('btn-cancel-location')?.addEventListener('click', () => {
    locationForm.classList.add('hidden');
    locationView.classList.remove('hidden');
  });

  document.getElementById('btn-save-location')?.addEventListener('click', () => {
    document.getElementById('txt-direccion').innerText = document.getElementById('input-direccion').value;
    document.getElementById('txt-zona').innerText = document.getElementById('input-zona').value;
    document.getElementById('txt-contacto').innerText = document.getElementById('input-contacto').value;
    document.getElementById('txt-email').innerText = document.getElementById('input-email').value;
    locationForm.classList.add('hidden');
    locationView.classList.remove('hidden');
  });
}

function renderPendientes() {
  const list = document.getElementById('list-pendientes');
  document.getElementById('badge-pendientes').innerText = pendientes.length;
  if (pendientes.length === 0) {
    list.innerHTML = '<li>No hay tareas pendientes.</li>';
    return;
  }
  list.innerHTML = pendientes.map(p => `
    <li class="pending-item">
      <span><strong>${p.fecha}:</strong> ${p.desc}</span>
      <button class="btn btn-secondary" onclick="completarPendiente(${p.id})">Completar</button>
    </li>
  `).join('');
}

window.completarPendiente = (id) => {
  const idx = pendientes.findIndex(p => p.id === id);
  if (idx !== -1) {
    pendientes.splice(idx, 1);
    renderPendientes();
  }
};

function renderTickets() {
  document.getElementById('count-tickets').innerText = `${tickets.length} Activos`;
  renderTableHelper('tbl-tickets', tickets, ['id', 'fecha', 'tipo', 'estado']);
}

function getNextTicketNumber() {
  const numericIds = tickets.map(t => parseInt(t.id, 10)).filter(id => !isNaN(id));
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 2064552;
  return (maxId + 1).toString();
}

function renderTableHelper(targetId, data, keys) {
  const tbody = document.getElementById(targetId);
  if (!tbody) return;
  tbody.innerHTML = data.map(item => `
    <tr>${keys.map(k => `<td>${item[k]}</td>`).join('')}</tr>
  `).join('');
}