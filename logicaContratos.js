const listaContratos = [
  {
    contrato: '5681',
    cliente: 'ASOCIACION DE COPROPIETARIOS DEL CONDOMINIO EDIFICIO TORREDELVALLE',
    sap: 'C023652',
    nit: '6642036-9',
    estado: 'Activo',
    vencimientoFecha: '27/08/2027',
    vendedor: 'ASTRID ANAHI MONTERROSO ESQUIVEL',
    tipo: 'RENTA',
    vencimientoEstado: 'CONTRATO VIGENTE',
    progMantenimiento: 'SIN PROGRAMACIÓN',
    comentarios: 'SIN DATOS EN SCON WEB',
    diaLimite: 0,
    diasMax: 0,
    valor: 0,
    canalLectura: 'NO APLICA',
    derechoBN: 0,
    derechoColor: 0,
    formatoBoleta: 'SIN FORMATO',
    softwareMonitoreo: false
  },
  {
    contrato: '5678',
    cliente: 'LIBRERIA Y PAPELERIA PROGRESO CINCO, S.A.',
    sap: 'C004134',
    nit: '732884-2',
    estado: 'Activo',
    vencimientoFecha: '15/12/2027',
    vendedor: 'sol. imp. digital',
    tipo: 'VENTA',
    vencimientoEstado: 'CONTRATO VIGENTE',
    progMantenimiento: 'SIN PROGRAMACIÓN',
    comentarios: 'SIN DATOS EN SCON WEB',
    diaLimite: 0,
    diasMax: 0,
    valor: 0,
    canalLectura: 'NO APLICA',
    derechoBN: 0,
    derechoColor: 0,
    formatoBoleta: 'SIN FORMATO',
    softwareMonitoreo: false
  },
  {
    contrato: '5676',
    cliente: 'FUNDACION PARA LA CONSERVACION EN GUATEMALA',
    sap: 'C004246',
    nit: '3347227-0',
    estado: 'Activo',
    vencimientoFecha: '10/10/2026',
    vendedor: 'ASTRID ANAHI MONTERROSO ESQUIVEL',
    tipo: 'RENTA',
    vencimientoEstado: 'CONTRATO VIGENTE',
    progMantenimiento: 'SIN PROGRAMACIÓN',
    comentarios: 'SIN DATOS EN SCON WEB',
    diaLimite: 0,
    diasMax: 0,
    valor: 0,
    canalLectura: 'NO APLICA',
    derechoBN: 0,
    derechoColor: 0,
    formatoBoleta: 'SIN FORMATO',
    softwareMonitoreo: false
  }
];

function initLogicaContratos() {
  renderContratos();

  document.getElementById('btn-search-contracts')?.addEventListener('click', () => {
    const qCliente = document.getElementById('contract-filter-cliente').value.toLowerCase();
    const qNum = document.getElementById('contract-filter-num').value.toLowerCase();
    const qSap = document.getElementById('contract-filter-sap').value.toLowerCase();
    const qNit = document.getElementById('contract-filter-nit').value.toLowerCase();

    const filtered = listaContratos.filter(c =>
      c.cliente.toLowerCase().includes(qCliente) &&
      c.contrato.toLowerCase().includes(qNum) &&
      c.sap.toLowerCase().includes(qSap) &&
      c.nit.toLowerCase().includes(qNit)
    );

    renderContratos(filtered);
  });

  const modalContrato = document.getElementById('modal-detalle-contrato');
  document.getElementById('btn-close-modal-contrato')?.addEventListener('click', () => {
    modalContrato.classList.add('hidden');
  });

  document.getElementById('btn-save-contract-details')?.addEventListener('click', () => {
    alert('Cambios del contrato guardados exitosamente.');
    modalContrato.classList.add('hidden');
  });
}

function renderContratos(items = listaContratos) {
  const tbody = document.getElementById('tbl-contratos');
  if (!tbody) return;
  document.getElementById('count-contracts').innerText = `${items.length} Registros`;

  tbody.innerHTML = items.map(c => `
    <tr>
      <td>${c.cliente}</td>
      <td class="text-center">
        <button class="btn-contract-num" onclick="openContractModal('${c.contrato}')">${c.contrato}</button>
      </td>
      <td>${c.sap}</td>
      <td>${c.nit}</td>
      <td class="text-center"><span class="status-badge">${c.estado}</span></td>
    </tr>
  `).join('');
}

window.openContractModal = (numContrato) => {
  const contrato = listaContratos.find(c => c.contrato === numContrato);
  if (!contrato) return;

  document.getElementById('lbl-contrato-num').innerText = contrato.contrato;
  document.getElementById('c-nombre').value = contrato.cliente;
  document.getElementById('c-numero').value = contrato.contrato;
  document.getElementById('c-venc-fecha').value = contrato.vencimientoFecha;
  document.getElementById('c-sap').value = contrato.sap;
  document.getElementById('c-vendedor').value = contrato.vendedor;
  document.getElementById('c-tipo').value = contrato.tipo;
  document.getElementById('c-nit').value = contrato.nit;
  document.getElementById('c-estado-venc').value = contrato.vencimientoEstado;
  document.getElementById('c-prog-mantenimiento').value = contrato.progMantenimiento;
  document.getElementById('c-dia-limite').value = contrato.diaLimite;
  document.getElementById('c-comentarios').value = contrato.comentarios;
  document.getElementById('c-dias-max').value = contrato.diasMax;
  document.getElementById('c-valor').value = contrato.valor;
  document.getElementById('c-canal-lectura').value = contrato.canalLectura;
  document.getElementById('c-derecho-bn').value = contrato.derechoBN;
  document.getElementById('c-formato-boleta').value = contrato.formatoBoleta;
  document.getElementById('c-derecho-color').value = contrato.derechoColor;
  document.getElementById('c-software-monitoreo').checked = contrato.softwareMonitoreo;

  const modalContrato = document.getElementById('modal-detalle-contrato');
  modalContrato.classList.remove('hidden');
  feather.replace();
};