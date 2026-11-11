export function Pie() {
  return (
    <footer className="border-t border-borde bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 px-4 pb-5 pt-10 text-sm leading-relaxed sm:px-6">
        <div>
          <p className="mb-2 font-serif text-[26px] font-semibold">Nube Aromática</p>
          <p className="text-gris">Perfumes originales con stock real del local.</p>
        </div>
        <div>
          <p className="mb-2 font-semibold">Visítanos</p>
          <p className="text-gris">
            [DIRECCIÓN DEL LOCAL]
            <br />
            [HORARIO DE ATENCIÓN]
          </p>
        </div>
        <div>
          <p className="mb-2 font-semibold">Contacto</p>
          <p className="text-gris">
            WhatsApp [NÚMERO]
            <br />
            Instagram [@CUENTA]
          </p>
        </div>
        <div>
          <p className="mb-2 font-semibold">Ayuda</p>
          <p className="text-gris">
            Cambios y devoluciones
            <br />
            Seguimiento de pedido
          </p>
        </div>
      </div>
      <p className="mx-auto max-w-[1200px] px-4 pb-6 text-xs text-gris sm:px-6">
        Fotos referenciales de Wikimedia Commons (CC0, CC BY, CC BY-SA): DYVER, Kevin Rheese, Brownchl, Dsuarez04, Jacek
        Halicki, Javier Velez, Rypptc, Miansari66, Tauseef perfumes, Fseddiqi1983, آية سعيد البيطار. Las ilustraciones de
        frascos son referenciales. Precios referenciales.
      </p>
    </footer>
  );
}
