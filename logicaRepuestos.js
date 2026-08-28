const solicitudesRepuestos = [
  {
    serie: '25Z00705',
    ticket: '2063252',
    fecha: '12/08/2026',
    cliente: 'UNIVERSIDAD REGIONAL DE GUATEMALA -',
    tipoCliente: 'Cliente Facturado',
    tecReparacion: 'Luis Alfredo Alvarado Racancoj',
    operador: 'jgonzalez',
    repuesto: 'UNIDAD DE HOLDER DEL CASSETTE NÚMERO 02',
    cant: 1
  },
  {
    serie: '25Z00705',
    ticket: '2063252',
    fecha: '12/08/2026',
    cliente: 'UNIVERSIDAD REGIONAL DE GUATEMALA -',
    tipoCliente: 'Cliente Facturado',
    tecReparacion: 'Luis Alfredo Alvarado Racancoj',
    operador: 'jgonzalez',
    repuesto: 'BANDEJA MANUAL COMPLETA CON RODILLOS',
    cant: 1
  },
  {
    serie: '4PL06646',
    ticket: '2066520',
    fecha: '24/08/2026',
    cliente: 'BANCO DE DESARROLLO RURAL S.A -',
    tipoCliente: 'Contrato Renta',
    tecReparacion: 'Santiago Pu Damian',
    operador: 'jmuniz',
    repuesto: 'TONER',
    cant: 1
  },
  {
    serie: 'mxbctdg20n',
    ticket: '2067502',
    fecha: '26/08/2026',
    cliente: 'BANCO PROMERICA S.A -',
    tipoCliente: 'Cliente Facturado',
    tecReparacion: 'Jorge Mario Ramirez Juarez',
    operador: 'Sin Operar',
    repuesto: 'TONER',
    cant: 1
  },
  {
    serie: '2WQ05561',
    ticket: '2067709',
    fecha: '26/08/2026',
    cliente: 'PROCESOS DEL PACIFICO SOCIEDAD ANONIMA',
    tipoCliente: 'Contrato Renta',
    tecReparacion: 'Francisco Morales Yuman',
    operador: 'jgonzalez',
    repuesto: 'FLAT DEL ESCANER PLANO',
    cant: 1
  }
];

function initLogicaRepuestos() {
  renderSolicitudesRepuestos();

  document.getElementById('btn-search-repuestos')?.addEventListener('click', () => {
    const qSerie = document.getElementById('rep-filter-serie').value.toLowerCase();
    const qCliente = document.getElementById('rep-filter-cliente').value.toLowerCase();
    const qRepuesto = document.getElementById('rep-filter-repuesto').value.toLowerCase();

    const filtered = solicitudesRepuestos.filter(item => 
      item.serie.toLowerCase().includes(qSerie) &&
      item.cliente.toLowerCase().includes(qCliente) &&
      item.repuesto.toLowerCase().includes(qRepuesto)
    );

    renderSolicitudesRepuestos(filtered);
  });
}

function renderSolicitudesRepuestos(items = solicitudesRepuestos) {
  const tbody = document.getElementById('tbl-solicitudes-repuestos');
  if (!tbody) return;
  document.getElementById('count-repuestos-solicitudes').innerText = `${items.length} Solicitudes`;

  tbody.innerHTML = items.map((r, idx) => `
    <tr>
      <td><strong>${r.serie}</strong></td>
      <td>${r.ticket}</td>
      <td>${r.fecha}</td>
      <td>${r.cliente}</td>
      <td><span class="status-badge">${r.tipoCliente}</span></td>
      <td>${r.tecReparacion}</td>
      <td>${r.operador}</td>
      <td><strong>${r.repuesto}</strong></td>
      <td class="text-center">${r.cant}</td>
      <td class="text-center">
        <div class="table-btn-group">
          <button class="btn-action-more" title="Detalles Solicitud">
            <i data-feather="more-horizontal"></i>
          </button>
          <button class="btn-action-delete" onclick="eliminarRepuesto(${idx})" title="Eliminar Solicitud">
            <i data-feather="trash-2"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  feather.replace();
}

window.eliminarRepuesto = (index) => {
  if (confirm('¿Desea eliminar esta solicitud de repuesto?')) {
    solicitudesRepuestos.splice(index, 1);
    renderSolicitudesRepuestos();
  }
};