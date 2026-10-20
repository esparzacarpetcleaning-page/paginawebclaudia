/**
 * Esparza's Carpet Cleaning - Solicitud de Servicio y Cotización
 * Validaciones en tiempo real, manejo de cantidades y generación estructurada de mensaje a WhatsApp
 */

function changeCount(elementId, delta) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let currentVal = parseInt(el.textContent.trim(), 10) || 0;
  let newVal = Math.max(0, currentVal + delta);
  el.textContent = newVal;
}

function applyPromo3Rooms() {
  const promoChk = document.getElementById('chk-promo-129');
  if (promoChk) promoChk.checked = true;
  const roomsEl = document.getElementById('cnt-rooms');
  const hallwaysEl = document.getElementById('cnt-hallways');
  if (roomsEl) roomsEl.textContent = '3';
  if (hallwaysEl) hallwaysEl.textContent = '1';

  const accCarpets = document.getElementById('acc-carpets');
  if (accCarpets) accCarpets.open = true;

  const feedback = document.getElementById('promo-applied-feedback');
  if (feedback) {
    feedback.style.display = 'block';
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 4500);
  }
}

function togglePromo129(isChecked) {
  if (isChecked) {
    applyPromo3Rooms();
  }
}

// Auto-expand category and display service-specific details if navigated with ?servicio=... or ?promo=129
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const srv = (params.get('servicio') || '').toLowerCase();
  const promo = params.get('promo');

  const accCarpets = document.getElementById('acc-carpets');
  const titleEl = document.getElementById('sol-service-info-title');
  const descEl = document.getElementById('sol-service-info-desc');

  if (promo === '129') {
    applyPromo3Rooms();
    if (titleEl && descEl) {
      titleEl.setAttribute('data-i18n', 'sol_promo_title');
      descEl.setAttribute('data-i18n', 'sol_promo_sub');
      titleEl.textContent = 'Promoción residencial: 3 habitaciones (incluye 1 pasillo y desodorante)';
      descEl.textContent = 'Aplica a habitaciones estándar de aproximadamente 13 × 15 pies. Comparte tu código postal (ZIP) para confirmar disponibilidad y determinar si aplica algún cargo adicional por traslado según la ubicación.';
    }
  } else if (srv) {
    // Close default carpets accordion when another specific service was requested
    if (!srv.includes('alfombra') && !srv.includes('carpet') && !srv.includes('habitacion') && !srv.includes('escalera')) {
      if (accCarpets) accCarpets.open = false;
    }

    if (srv.includes('sofa') || srv.includes('sala') || srv.includes('mueble')) {
      const acc = document.getElementById('acc-furniture');
      if (acc) acc.open = true;
      if (titleEl && descEl) {
        titleEl.setAttribute('data-i18n', 'srv2_title');
        descEl.setAttribute('data-i18n', 'sol_info_furniture');
        titleEl.textContent = 'Limpieza de muebles tapizados';
        descEl.textContent = 'Atendemos sofás de 3 plazas, salas seccionales en L, sillones reclinables y sillas de comedor tapizadas mediante inyección y extracción con agua caliente. Selecciona las piezas abajo y comparte tu código postal para confirmar disponibilidad y cotización.';
      }
    } else if (srv.includes('silla') || srv.includes('chair')) {
      const acc = document.getElementById('acc-furniture');
      if (acc) acc.open = true;
      if (titleEl && descEl) {
        titleEl.setAttribute('data-i18n', 'srv5_title');
        descEl.setAttribute('data-i18n', 'sol_info_furniture');
        titleEl.textContent = 'Limpieza de sillas tapizadas';
        descEl.textContent = 'Atendemos sillas de comedor tapizadas, bancas y sillones mediante inyección y extracción con agua caliente. Selecciona la cantidad de sillas abajo y comparte tu código postal para confirmar disponibilidad y cotización.';
      }
    } else if (srv.includes('colchon') || srv.includes('mattress')) {
      const acc = document.getElementById('acc-mattresses');
      if (acc) acc.open = true;
      if (titleEl && descEl) {
        titleEl.setAttribute('data-i18n', 'srv3_title');
        descEl.setAttribute('data-i18n', 'sol_info_mattresses');
        titleEl.textContent = 'Limpieza de colchones';
        descEl.textContent = 'Realizamos limpieza por inyección y extracción con agua caliente en colchones King, Queen, Full y Twin para retirar polvo acumulado, sudor y manchas superficiales. Selecciona los tamaños abajo y comparte tu código postal.';
      }
    } else if (srv.includes('piso') || srv.includes('tile')) {
      const acc = document.getElementById('acc-tile');
      if (acc) acc.open = true;
      const chkTile = document.getElementById('chk-tile');
      if (chkTile) {
        chkTile.checked = true;
        toggleTileFields(true);
      }
      if (titleEl && descEl) {
        titleEl.setAttribute('data-i18n', 'srv4_title');
        descEl.setAttribute('data-i18n', 'sol_tile_note');
        titleEl.textContent = 'Limpieza de pisos y boquillas';
        descEl.textContent = 'El precio para pisos y boquillas depende del área total y del estado del piso. Indica los pies cuadrados aproximados abajo y envíanos fotos por WhatsApp para darte una cotización precisa.';
      }
    } else if (srv.includes('auto') || srv.includes('vehiculo') || srv.includes('car')) {
      const acc = document.getElementById('acc-cars');
      if (acc) acc.open = true;
      if (titleEl && descEl) {
        titleEl.setAttribute('data-i18n', 'srv6_title');
        descEl.setAttribute('data-i18n', 'sol_info_cars');
        titleEl.textContent = 'Limpieza del interior de vehículos';
        descEl.textContent = 'Limpieza por inyección y extracción con agua caliente en asientos de tela y alfombras interiores. Solo se requiere toma de agua en el lugar (no se necesita luz eléctrica).';
      }
    } else if (srv.includes('comercial') || srv.includes('oficina')) {
      const acc = document.getElementById('acc-commercial');
      if (acc) acc.open = true;
      const chkCom = document.getElementById('chk-commercial');
      if (chkCom) chkCom.checked = true;
      const propTypeSelect = document.getElementById('req-prop-type');
      if (propTypeSelect) propTypeSelect.value = 'Oficina o local comercial';
      if (titleEl && descEl) {
        titleEl.setAttribute('data-i18n', 'srv7_title');
        descEl.setAttribute('data-i18n', 'sol_sub_commercial');
        titleEl.textContent = 'Limpieza comercial de alfombras';
        descEl.textContent = 'Atendemos oficinas, consultorios y locales comerciales con horarios flexibles. Describe el tipo de negocio y tamaño aproximado en las notas adicionales.';
      }
    } else if (srv.includes('mascota')) {
      const acc = document.getElementById('acc-pets');
      if (acc) acc.open = true;
    }

    // Re-apply active language translations if English is active
    if (typeof applyTranslations === 'function' && document.documentElement.lang === 'en') {
      applyTranslations('en');
    }
  }

  if (window.location.hash) {
    const el = document.querySelector(window.location.hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

function toggleTileFields(isChecked) {
  const subfields = document.getElementById('tile-subfields');
  if (subfields) {
    subfields.style.display = isChecked ? 'block' : 'none';
  }
}

function checkApartmentFloorNotice() {
  const floorSelect = document.getElementById('req-apt-floor');
  const floorNumInput = document.getElementById('req-apt-floor-num');
  const propTypeSelect = document.getElementById('req-prop-type');
  const reminderBox = document.getElementById('apt-floor-reminder-box');
  if (!reminderBox) return;

  const floorVal = (floorSelect?.value || '').toLowerCase();
  const floorNumText = (floorNumInput?.value || '').trim();
  const parsedFloorNum = parseInt(floorNumText.replace(/\D/g, ''), 10);

  // Auto-switch property type to Apartamento if user picks an apartment floor
  if (propTypeSelect && propTypeSelect.value === 'Casa' && (floorVal.includes('piso') || floorVal.includes('floor') || floorNumText.length > 0)) {
    propTypeSelect.value = 'Apartamento';
  }

  const isThirdOrHigher =
    floorVal.includes('3') ||
    floorVal.includes('4') ||
    floorVal.includes('superior') ||
    floorVal.includes('higher') ||
    (!isNaN(parsedFloorNum) && parsedFloorNum >= 3);

  if (isThirdOrHigher) {
    reminderBox.style.background = '#FFFBEB';
    reminderBox.style.border = '2px solid #D97706';
    reminderBox.style.color = '#92400E';
    reminderBox.style.boxShadow = '0 4px 12px rgba(217, 119, 6, 0.18)';
  } else {
    reminderBox.style.background = '#FFFFFF';
    reminderBox.style.border = '1.5px solid #FDE68A';
    reminderBox.style.color = '#92400E';
    reminderBox.style.boxShadow = 'none';
  }
}

function checkCityValidation() {
  // Active valley cities
}

function checkZipValidation(zipVal) {
  // Active valley zip codes
}

function handleServiceRequestSubmit(event) {
  event.preventDefault();

  const isEn = (document.documentElement.lang === 'en');

  // Validate mandatory terms acceptance checkbox
  const termsCheckbox = document.getElementById('req-terms-checkbox');
  if (termsCheckbox && !termsCheckbox.checked) {
    alert(isEn
      ? "Please check the box to accept the Service Policies and Terms & Conditions before submitting."
      : "Por favor marca la casilla de aceptación antes de enviar tu solicitud.");
    termsCheckbox.focus();
    return;
  }

  const name = document.getElementById('req-name').value.trim();
  const phone = document.getElementById('req-phone').value.trim();
  const address = document.getElementById('req-address').value.trim();
  const unit = document.getElementById('req-unit')?.value.trim() || '';
  const city = document.getElementById('req-city').value.trim();
  const zip = document.getElementById('req-zip').value.trim();

  // Property & Apartment details
  const propType = document.getElementById('req-prop-type')?.value.trim() || 'Casa';
  const aptFloor = document.getElementById('req-apt-floor')?.value.trim() || 'No aplica';
  const aptFloorNum = document.getElementById('req-apt-floor-num')?.value.trim() || '';
  const aptParking = document.getElementById('req-apt-parking')?.value.trim() || 'No aplica';

  // Promotions & Quantities
  const isPromo129 = document.getElementById('chk-promo-129')?.checked || false;
  const rooms = parseInt(document.getElementById('cnt-rooms')?.textContent || '0', 10);
  const hallways = parseInt(document.getElementById('cnt-hallways')?.textContent || '0', 10);
  const stairs = parseInt(document.getElementById('cnt-stairs')?.textContent || '0', 10);

  const sofa3 = parseInt(document.getElementById('cnt-sofa3')?.textContent || '0', 10);
  const sofaL = parseInt(document.getElementById('cnt-sofaL')?.textContent || '0', 10);
  const armchair = parseInt(document.getElementById('cnt-armchair')?.textContent || '0', 10);
  const chairs = parseInt(document.getElementById('cnt-chairs')?.textContent || '0', 10);

  const mattressKing = parseInt(document.getElementById('cnt-mattress-king')?.textContent || '0', 10);
  const mattressQueen = parseInt(document.getElementById('cnt-mattress-queen')?.textContent || '0', 10);
  const mattressTwin = parseInt(document.getElementById('cnt-mattress-twin')?.textContent || '0', 10);

  const isTileChecked = document.getElementById('chk-tile')?.checked || false;
  const tileSqft = document.getElementById('req-tile-sqft')?.value.trim() || '';
  const isSealantChecked = document.getElementById('chk-sealant')?.checked || false;

  const cars = parseInt(document.getElementById('cnt-cars')?.textContent || '0', 10);
  const isCommercial = document.getElementById('chk-commercial')?.checked || false;

  const petUrineRooms = parseInt(document.getElementById('cnt-pet-urine')?.textContent || '0', 10);
  const isPetHairChecked = document.getElementById('chk-pet-hair')?.checked || false;

  const defaultDate = isEn ? 'To be coordinated' : 'Por coordinar';
  const defaultTime = isEn ? 'Any available slot' : 'Cualquier horario disponible';
  const prefDate = document.getElementById('req-date')?.value.trim() || defaultDate;
  const prefTime = document.getElementById('req-time-slot')?.value.trim() || defaultTime;
  const notes = document.getElementById('req-notes')?.value.trim() || '';

  // Construct items list
  const requestedItems = [];
  if (isEn) {
    if (isPromo129) {
      requestedItems.push(`• 3-Room Residential Promotion (includes 1 hallway & deodorizer; standard rooms approx. 13×15 ft; subject to ZIP confirmation)`);
    }
    if (rooms > 0) requestedItems.push(`• Carpeted Bedrooms / Rooms: ${rooms} (standard approx. 13×15 ft)`);
    if (hallways > 0) requestedItems.push(`• Hallways: ${hallways}`);
    if (stairs > 0) requestedItems.push(`• Flights of Stairs: ${stairs}`);

    if (sofa3 > 0) requestedItems.push(`• Standard 3-Seater Sofa: ${sofa3}`);
    if (sofaL > 0) requestedItems.push(`• 'L' Sectional Couch: ${sofaL}`);
    if (armchair > 0) requestedItems.push(`• Armchair / Recliner: ${armchair}`);
    if (chairs > 0) requestedItems.push(`• Dining / Office Chairs: ${chairs}`);

    if (mattressKing > 0) requestedItems.push(`• King / Cal-King Mattress: ${mattressKing}`);
    if (mattressQueen > 0) requestedItems.push(`• Queen / Full Mattress: ${mattressQueen}`);
    if (mattressTwin > 0) requestedItems.push(`• Twin Mattress: ${mattressTwin}`);

    if (isTileChecked) {
      let tileDesc = `• Tile & Grout Cleaning`;
      if (tileSqft) tileDesc += ` (approx. ${tileSqft} sq ft)`;
      if (isSealantChecked) tileDesc += ` + Protective Grout Sealant`;
      requestedItems.push(tileDesc);
    }

    if (cars > 0) requestedItems.push(`• Vehicle Interior (Seats & Carpet): ${cars}`);
    if (isCommercial) requestedItems.push(`• Commercial / Office Cleaning`);

    if (petUrineRooms > 0) requestedItems.push(`• Pet Urine Enzymatic Treatment: ${petUrineRooms} room(s)`);
    if (isPetHairChecked) requestedItems.push(`• Pet Hair Extraction`);
  } else {
    if (isPromo129) {
      requestedItems.push(`• Promoción residencial de 3 habitaciones (incluye 1 pasillo y desodorante; habitaciones estándar aprox. 13×15 pies; sujeto a confirmar ZIP)`);
    }
    if (rooms > 0) requestedItems.push(`• Habitaciones con alfombra: ${rooms} (estándar aprox. 13×15 pies)`);
    if (hallways > 0) requestedItems.push(`• Pasillos: ${hallways}`);
    if (stairs > 0) requestedItems.push(`• Tramos de escaleras: ${stairs}`);

    if (sofa3 > 0) requestedItems.push(`• Sofá estándar (3 plazas): ${sofa3}`);
    if (sofaL > 0) requestedItems.push(`• Sala seccional en "L": ${sofaL}`);
    if (armchair > 0) requestedItems.push(`• Sillón individual / reclinable: ${armchair}`);
    if (chairs > 0) requestedItems.push(`• Sillas de comedor / oficina: ${chairs}`);

    if (mattressKing > 0) requestedItems.push(`• Colchón King / Cal-King: ${mattressKing}`);
    if (mattressQueen > 0) requestedItems.push(`• Colchón Queen / Matrimonial: ${mattressQueen}`);
    if (mattressTwin > 0) requestedItems.push(`• Colchón Twin / Individual: ${mattressTwin}`);

    if (isTileChecked) {
      let tileDesc = `• Limpieza de pisos de cerámica y boquillas (Tile & Grout)`;
      if (tileSqft) tileDesc += ` (aprox. ${tileSqft} sq ft)`;
      if (isSealantChecked) tileDesc += ` + Sellador protector`;
      requestedItems.push(tileDesc);
    }

    if (cars > 0) requestedItems.push(`• Interior de vehículo (asientos y alfombra): ${cars}`);
    if (isCommercial) requestedItems.push(`• Limpieza comercial / de oficina`);

    if (petUrineRooms > 0) requestedItems.push(`• Tratamiento enzimático para orina: ${petUrineRooms} habitación(es)`);
    if (isPetHairChecked) requestedItems.push(`• Extracción de pelo de mascota`);
  }

  if (requestedItems.length === 0) {
    alert(isEn
      ? "Please select at least one area, furniture piece, or service to request a quote."
      : "Por favor selecciona al menos un área, mueble o servicio para solicitar tu cotización.");
    return;
  }

  const fullAddress = unit ? `${address} (${unit}), ${city}, AZ ${zip}` : `${address}, ${city}, AZ ${zip}`;
  const floorDetails = aptFloorNum ? `${aptFloor} (${aptFloorNum})` : aptFloor;
  const isApartment = propType.toLowerCase().includes('apartamento') || propType.toLowerCase().includes('apartment') || !aptFloor.toLowerCase().includes('no aplica') || Boolean(aptFloorNum) || Boolean(unit);

  // English mappings for dropdown fields
  let enPropType = propType;
  if (propType.toLowerCase().includes('casa') || propType.toLowerCase().includes('house')) enPropType = 'Single-family house';
  else if (propType.toLowerCase().includes('apartamento') || propType.toLowerCase().includes('apartment')) enPropType = 'Apartment / Condo';
  else if (propType.toLowerCase().includes('oficina') || propType.toLowerCase().includes('comercial')) enPropType = 'Office or commercial space';

  let enFloor = aptFloor;
  if (aptFloor.toLowerCase().includes('planta baja') || aptFloor.toLowerCase().includes('1')) enFloor = 'Ground floor (1st floor)';
  else if (aptFloor.toLowerCase().includes('2')) enFloor = '2nd floor';
  else if (aptFloor.toLowerCase().includes('3')) enFloor = '3rd floor';
  else if (aptFloor.toLowerCase().includes('4') || aptFloor.toLowerCase().includes('superior')) enFloor = '4th floor or higher';
  else if (aptFloor.toLowerCase().includes('no aplica')) enFloor = 'N/A';

  const enFloorDetails = aptFloorNum ? `${enFloor} (${aptFloorNum})` : enFloor;

  let enAptParking = aptParking;
  if (aptParking.toLowerCase().includes('no aplica')) enAptParking = 'N/A (house or ground floor)';
  else if (aptParking.toLowerCase().includes('sí') || aptParking.toLowerCase().includes('si')) enAptParking = 'Yes, parking available on the same level';
  else if (aptParking.toLowerCase().includes('no')) enAptParking = 'No, parking is not on the same level';

  let enPrefTime = prefTime;
  if (prefTime.toLowerCase().includes('mañana') || prefTime.toLowerCase().includes('morning')) enPrefTime = 'Morning (7:00 AM – 12:00 PM)';
  else if (prefTime.toLowerCase().includes('tarde') || prefTime.toLowerCase().includes('afternoon')) enPrefTime = 'Afternoon (12:00 PM – 5:00 PM)';
  else if (prefTime.toLowerCase().includes('cualquier') || prefTime.toLowerCase().includes('any')) enPrefTime = 'Any available time';

  // Compose Message
  let msg = '';
  if (isEn) {
    msg = `👋 *Hello Esparza's Carpet Cleaning! I would like to request a quote and service:*\n\n`;
    msg += `👤 *Customer:* ${name}\n`;
    msg += `📱 *Phone:* ${phone}\n`;
    msg += `📍 *Address:* ${fullAddress}\n`;
    msg += `📮 *ZIP Code:* ${zip}\n`;
    msg += `🏠 *Property Type:* ${enPropType}\n`;
    if (isApartment) {
      if (unit) msg += `🚪 *Unit / Apt Number:* ${unit}\n`;
      msg += `🏢 *Apartment Floor:* ${enFloorDetails}\n`;
      msg += `🅿️ *Same-Level Parking Available:* ${enAptParking}\n`;
    }
    msg += `\n📋 *Requested Services:*\n${requestedItems.join('\n')}\n\n`;
    msg += `📅 *Desired Date:* ${prefDate} (${enPrefTime})\n`;
    if (notes) {
      msg += `📝 *Additional Details:* ${notes}\n`;
    }
    msg += `\n📸 *NOTE:* I am attaching photos of the areas right now in this chat so you can review my request, send me a quote, and confirm availability. Thank you!`;
  } else {
    msg = `👋 *¡Hola Esparza's Carpet Cleaning! Me gustaría solicitar una cotización y servicio:*\n\n`;
    msg += `👤 *Cliente:* ${name}\n`;
    msg += `📱 *Teléfono:* ${phone}\n`;
    msg += `📍 *Dirección:* ${fullAddress}\n`;
    msg += `📮 *Código postal (ZIP):* ${zip}\n`;
    msg += `🏠 *Tipo de propiedad:* ${propType}\n`;
    if (isApartment) {
      if (unit) msg += `🚪 *Unidad / Apartamento:* ${unit}\n`;
      msg += `🏢 *Piso del apartamento:* ${floorDetails}\n`;
      msg += `🅿️ *Estacionamiento en ese mismo nivel:* ${aptParking}\n`;
    }
    msg += `\n📋 *Servicios solicitados:*\n${requestedItems.join('\n')}\n\n`;
    msg += `📅 *Fecha deseada:* ${prefDate} (${prefTime})\n`;
    if (notes) {
      msg += `📝 *Detalles adicionales:* ${notes}\n`;
    }
    msg += `\n📸 *NOTA:* En este momento adjunto las fotos del área en este chat para que puedan revisar mi solicitud, enviarme una cotización y acordar el día y la hora de la cita. ¡Muchas gracias!`;
  }

  const waUrl = `https://wa.me/16025759974?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

