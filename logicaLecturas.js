const lecturasHistorial = [
  { fecha: '17/08/2026', tipo: '101', contador: '483,110', origen: 'SCONWEB' },
  { fecha: '07/08/2026', tipo: '101', contador: '476,610', origen: 'SCONWEB' },
  { fecha: '22/07/2026', tipo: '101', contador: '468,818', origen: 'SCONWEB' }
];

const equiposPendientesLectura = [
  {
    serie: '23D00624',
    cliente: 'MUNICIPALIDAD DE GUATEMALA',
    diaLimite: 25,
    canal: 'TECNICO DE CAMPO',
    contrato: '5015',
    direccion: 'RUTA 4 6-32 EDIFICIO GRANAT NIVEL 3 Zona 4',
    telefonos: '5925-4723',
    contacto: 'BRENDA VALERIA PACHECO CARRERA',
    contadorAnterior: 0,
    ultimoContador: 294564
  },
  {
    serie: '4GN13899',
    cliente: 'BANCO INDUSTRIAL, S.A.',
    diaLimite: 30,
    canal: 'TECNICO DE CAMPO',
    contrato: '5332',
    direccion: 'VIA 4 1-00 ZONA 4 GUATEMALA',
    telefonos: '2420-3000',
    contacto: 'WALTER PEREZ',
    contadorAnterior: 476610,
    ultimoContador: 483110
  }
];

function initLogicaLecturas() {
  renderEquiposPendientesLectura();
  renderTableHelper('tbl-lecturas', lecturasHistorial, ['fecha', 'tipo', 'contador', 'origen']);

  // Filtros de búsqueda
  document.getElementById('btn-search-lecturas')?.addEventListener('click', () => {
    const qCliente = document.getElementById('filter-cliente').value.toLowerCase();
    const qSerie = document.getElementById('filter-serie').value.toLowerCase();
    const qContrato = document.getElementById('filter-contrato').value.toLowerCase();

    const filtered = equiposPendientesLectura.filter(item => 
      item.cliente.toLowerCase().includes(qCliente) &&
      item.serie.toLowerCase().includes(qSerie) &&
      item.contrato.toLowerCase().includes(qContrato)
    );

    renderEquiposPendientesLectura(filtered);
  });

  // Eventos Modal Contadores
  const modalContadores = document.getElementById('modal-ingreso-contadores');
  document.getElementById('btn-close-modal-contadores')?.addEventListener('click', () => modalContadores.classList.add('hidden'));
}

function renderEquiposPendientesLectura(itemsToRender = equiposPendientesLectura) {
  const tbody = document.getElementById('tbl-equipos-pendientes');
  if (!tbody) return;
  document.getElementById('count-pending-lecturas').innerText = `${itemsToRender.length} Equipos`;

  tbody.innerHTML = itemsToRender.map(eq => `
    <tr>
      <td><strong>${eq.serie}</strong></td>
      <td>${eq.cliente}</td>
      <td class="text-center">${eq.diaLimite}</td>
      <td>
        <select class="form-control inline-select">
          <option value="TECNICO DE CAMPO">TECNICO DE CAMPO</option>
          <option value="CLIENTE">CLIENTE</option>
        </select>
      </td>
      <td class="text-center">
        <div class="table-btn-group">
          <button class="btn-action-add" onclick="openCounterModal('${eq.serie}')" title="Ingresar Contador (+)">
            <i data-feather="plus"></i>
          </button>
          <button class="btn-action-save" title="Guardar Cambio">
            <i data-feather="save"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  feather.replace();
}

window.openCounterModal = (serie) => {
  const modalContadores = document.getElementById('modal-ingreso-contadores');
  const selectedEquipo = equiposPendientesLectura.find(e => e.serie === serie);
  if (!selectedEquipo) return;

  document.getElementById('lbl-modal-ultimo-101').innerText = selectedEquipo.ultimoContador.toLocaleString();
  document.getElementById('m-serie').innerText = selectedEquipo.serie;
  document.getElementById('m-contrato').innerText = selectedEquipo.contrato;
  document.getElementById('m-cliente').innerText = selectedEquipo.cliente;
  document.getElementById('m-direccion').innerText = selectedEquipo.direccion;
  document.getElementById('m-telefonos').innerText = selectedEquipo.telefonos;
  document.getElementById('m-contacto').innerText = selectedEquipo.contacto;
  document.getElementById('m-contador-anterior').innerText = selectedEquipo.contadorAnterior.toLocaleString();
  document.getElementById('m-input-contador').value = selectedEquipo.ultimoContador;

  modalContadores.classList.remove('hidden');
  feather.replace();
};