document.addEventListener('DOMContentLoaded', () => {
  feather.replace();

  const viewEquipos = document.getElementById('view-equipos');
  const viewLecturas = document.getElementById('view-lecturas');
  const viewRepuestos = document.getElementById('view-repuestos');
  const viewContratos = document.getElementById('view-contratos');

  const navEquipos = document.getElementById('nav-equipos');
  const navLecturasPage = document.getElementById('nav-lecturas-page');
  const navRepuestosPage = document.getElementById('nav-repuestos-page');
  const navContratosPage = document.getElementById('nav-contratos-page');
  const btnGoLecturas = document.getElementById('btn-go-lecturas');
  const breadcrumb = document.getElementById('top-breadcrumb');

  window.showView = (viewName) => {
    [navEquipos, navLecturasPage, navRepuestosPage, navContratosPage].forEach(n => n?.classList.remove('active'));
    [viewEquipos, viewLecturas, viewRepuestos, viewContratos].forEach(v => v?.classList.add('hidden'));

    if (viewName === 'lecturas') {
      viewLecturas.classList.remove('hidden');
      navLecturasPage.classList.add('active');
      breadcrumb.innerHTML = '<span>Menú Principal</span> / <strong>Gestión de Lecturas</strong>';
    } else if (viewName === 'repuestos') {
      viewRepuestos.classList.remove('hidden');
      navRepuestosPage.classList.add('active');
      breadcrumb.innerHTML = '<span>Menú Principal</span> / <strong>Solicitudes de Repuestos</strong>';
    } else if (viewName === 'contratos') {
      viewContratos.classList.remove('hidden');
      navContratosPage.classList.add('active');
      breadcrumb.innerHTML = '<span>Menú Principal</span> / <strong>Gestión de Contratos</strong>';
    } else {
      viewEquipos.classList.remove('hidden');
      navEquipos.classList.add('active');
      breadcrumb.innerHTML = '<span>Menú Principal</span> / <span>Gestión de Equipos</span> / <strong>4GN13899</strong>';
    }
  };

  navEquipos?.addEventListener('click', (e) => { e.preventDefault(); window.showView('equipos'); });
  navLecturasPage?.addEventListener('click', (e) => { e.preventDefault(); window.showView('lecturas'); });
  navRepuestosPage?.addEventListener('click', (e) => { e.preventDefault(); window.showView('repuestos'); });
  navContratosPage?.addEventListener('click', (e) => { e.preventDefault(); window.showView('contratos'); });
  btnGoLecturas?.addEventListener('click', () => window.showView('lecturas'));

  initLogicaEquipos();
  initLogicaLecturas();
  initLogicaRepuestos();
  initLogicaContratos();
});