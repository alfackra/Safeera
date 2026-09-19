/* =========================================================
   SAFEERA MADINAH
   FULL SCRIPT.JS
========================================================= */

"use strict";


/* =========================================================
   01. CONFIGURATION
========================================================= */

/*
  PENTING:
  Ganti nomor WhatsApp di bawah dengan nomor Safeera.

  Format:
  - gunakan kode negara
  - tanpa tanda +
  - tanpa spasi
  - tanpa angka 0 di depan

  Contoh Saudi:
  9665XXXXXXXX

  Contoh Indonesia:
  62812XXXXXXXX
*/

const SAFEERA_WHATSAPP = "966500000000";


/* =========================================================
   02. HELPERS
========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


function createWhatsAppURL(message = "") {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${SAFEERA_WHATSAPP}?text=${encodedMessage}`;
}


function openWhatsApp(message) {
  window.open(
    createWhatsAppURL(message),
    "_blank",
    "noopener,noreferrer"
  );
}


function scrollToElement(target) {
  const element =
    typeof target === "string"
      ? document.querySelector(target)
      : target;

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =========================================================
   03. PRELOADER
========================================================= */

const preloader = $("#preloader");

window.addEventListener("load", () => {

  setTimeout(() => {

    if (preloader) {
      preloader.classList.add("hide");
    }

  }, 500);

});


/* Fallback */
setTimeout(() => {

  if (preloader) {
    preloader.classList.add("hide");
  }

}, 2500);


/* =========================================================
   04. CURRENT YEAR
========================================================= */

const currentYear = $("#currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   05. HEADER SCROLL
========================================================= */

const header = $("#header");
const backToTop = $("#backToTop");


function handlePageScroll() {

  const scrollY = window.scrollY;

  if (header) {

    if (scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }


  if (backToTop) {

    if (scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  }

}


window.addEventListener(
  "scroll",
  handlePageScroll,
  { passive: true }
);

handlePageScroll();


/* =========================================================
   06. BACK TO TOP
========================================================= */

if (backToTop) {

  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================================
   07. SMOOTH ANCHOR LINKS
========================================================= */

$$('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    closeMobileMenu();

    scrollToElement(target);

  });

});


/* =========================================================
   08. MOBILE MENU
========================================================= */

const mobileToggle = $("#mobileToggle");
const mobileMenu = $("#mobileMenu");
const mobileClose = $("#mobileClose");
const mobileOverlay = $("#mobileOverlay");


function openMobileMenu() {

  if (!mobileMenu || !mobileOverlay) return;

  mobileMenu.classList.add("open");
  mobileOverlay.classList.add("show");

  document.body.classList.add("no-scroll");

}


function closeMobileMenu() {

  if (!mobileMenu || !mobileOverlay) return;

  mobileMenu.classList.remove("open");
  mobileOverlay.classList.remove("show");

  document.body.classList.remove("no-scroll");

}


if (mobileToggle) {
  mobileToggle.addEventListener(
    "click",
    openMobileMenu
  );
}


if (mobileClose) {
  mobileClose.addEventListener(
    "click",
    closeMobileMenu
  );
}


if (mobileOverlay) {
  mobileOverlay.addEventListener(
    "click",
    closeMobileMenu
  );
}


/* ESC close */
document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeMobileMenu();
    closeServiceModal();
    closeHotelModal();

  }

});


/* =========================================================
   09. MOBILE SERVICE SUBMENU
========================================================= */

const mobileServiceToggle =
  $(".mobile-service-toggle");

const mobileSubmenu =
  $(".mobile-submenu");


if (mobileServiceToggle && mobileSubmenu) {

  mobileServiceToggle.addEventListener(
    "click",
    () => {

      mobileServiceToggle.classList.toggle("active");
      mobileSubmenu.classList.toggle("open");

    }
  );

}


/* =========================================================
   10. SERVICE DATA
========================================================= */

const serviceData = {

  visa: {

    label: "VISA UMRAH",

    title: "Visa Umrah",

    icon: "fa-solid fa-passport",

    description:
      "Layanan untuk membantu kebutuhan pengurusan visa perjalanan jamaah sesuai kebutuhan dan ketentuan yang berlaku.",

    features: [
      "Koordinasi kebutuhan dokumen jamaah",
      "Layanan untuk individual maupun rombongan",
      "Dapat digabung dengan Land Arrangement",
      "Konsultasi kebutuhan sebelum keberangkatan"
    ]

  },


  handling: {

    label: "HANDLING JAMAAH",

    title: "Handling",

    icon: "fa-solid fa-people-group",

    description:
      "Pendampingan operasional jamaah untuk membantu proses perjalanan lebih terkoordinasi selama berada di Saudi Arabia.",

    features: [
      "Koordinasi kedatangan jamaah",
      "Koordinasi keberangkatan",
      "Pendampingan kebutuhan group",
      "Dapat disesuaikan dengan itinerary"
    ]

  },


  mutawwif: {

    label: "PENDAMPING JAMAAH",

    title: "Mutawwif",

    icon: "fa-solid fa-person-walking-luggage",

    description:
      "Pendamping perjalanan jamaah untuk membantu pelaksanaan program ibadah dan perjalanan di Saudi Arabia.",

    features: [
      "Pendamping berbahasa Indonesia",
      "Pendampingan program perjalanan",
      "Dapat disesuaikan untuk group",
      "Terintegrasi dengan paket LA"
    ]

  },


  ziarah: {

    label: "PROGRAM ZIARAH",

    title: "Ziarah Makkah & Madinah",

    icon: "fa-solid fa-location-dot",

    description:
      "Program kunjungan ke lokasi bersejarah dan destinasi yang disesuaikan dengan itinerary jamaah.",

    features: [
      "Program ziarah Makkah",
      "Program ziarah Madinah",
      "Transportasi dapat disediakan",
      "Mutawwif dapat disertakan"
    ]

  }

};


/* =========================================================
   11. SERVICE MODAL
========================================================= */

const serviceModal = $("#serviceModal");
const modalIcon = $("#modalIcon");
const modalLabel = $("#modalLabel");
const modalTitle = $("#modalTitle");
const modalDescription = $("#modalDescription");
const modalFeatures = $("#modalFeatures");


function openServiceModal(serviceKey) {

  const service = serviceData[serviceKey];

  if (!service || !serviceModal) return;


  if (modalIcon) {

    modalIcon.innerHTML =
      `<i class="${service.icon}"></i>`;

  }


  if (modalLabel) {
    modalLabel.textContent = service.label;
  }


  if (modalTitle) {
    modalTitle.textContent = service.title;
  }


  if (modalDescription) {
    modalDescription.textContent =
      service.description;
  }


  if (modalFeatures) {

    modalFeatures.innerHTML =
      service.features
        .map(feature => `
          <div class="modal-feature">
            <i class="fa-solid fa-circle-check"></i>
            <span>${feature}</span>
          </div>
        `)
        .join("");

  }


  /*
    Otomatis isi layanan pada contact form.
  */

  const contactService =
    $("#contactService");

  if (contactService) {

    const mapping = {
      visa: "Visa",
      handling: "Handling",
      mutawwif: "Mutawwif",
      ziarah: "Ziarah"
    };

    contactService.value =
      mapping[serviceKey] || "Full Land Arrangement";

  }


  serviceModal.classList.add("open");

  serviceModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("no-scroll");

}


function closeServiceModal() {

  if (!serviceModal) return;

  serviceModal.classList.remove("open");

  serviceModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("no-scroll");

}


/* Click service cards */
$$("[data-service-open]").forEach(element => {

  element.addEventListener("click", event => {

    /*
      Supaya klik service dari dropdown
      tidak langsung scroll.
    */

    event.preventDefault();

    const service =
      element.dataset.serviceOpen;

    closeMobileMenu();

    openServiceModal(service);

  });

});


/* Keyboard support */
$$(".service-card[data-service-open]")
  .forEach(card => {

    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openServiceModal(
            card.dataset.serviceOpen
          );

        }

      }
    );

  });


/* Close service modal */
$$("[data-modal-close]")
  .forEach(element => {

    element.addEventListener(
      "click",
      closeServiceModal
    );

  });


/* =========================================================
   12. HOTEL FILTER
========================================================= */

const hotelFilterButtons =
  $$(".hotel-filter-btn");

const hotelCards =
  $$(".hotel-card[data-city]");


hotelFilterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter =
      button.dataset.filter;


    hotelFilterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");


    hotelCards.forEach(card => {

      const city =
        card.dataset.city;


      /*
        Custom request card selalu tampil.
      */

      if (city === "all") {

        card.classList.remove(
          "hotel-hidden"
        );

        return;

      }


      if (
        filter === "all" ||
        city === filter
      ) {

        card.classList.remove(
          "hotel-hidden"
        );

      } else {

        card.classList.add(
          "hotel-hidden"
        );

      }

    });

  });

});


/* =========================================================
   13. HOTEL MODAL
========================================================= */

const hotelModal =
  $("#hotelModal");

const hotelModalTitle =
  $("#hotelModalTitle");


function openHotelModal(hotelName) {

  if (!hotelModal) return;


  if (hotelModalTitle) {

    hotelModalTitle.textContent =
      hotelName;

  }


  const contactService =
    $("#contactService");

  if (contactService) {
    contactService.value = "Hotel";
  }


  const contactMessage =
    $("#contactMessage");

  if (
    contactMessage &&
    !contactMessage.value.trim()
  ) {

    contactMessage.value =
      `Saya ingin menanyakan ketersediaan ${hotelName}.`;

  }


  hotelModal.classList.add("open");

  hotelModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "no-scroll"
  );

}


function closeHotelModal() {

  if (!hotelModal) return;

  hotelModal.classList.remove("open");

  hotelModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "no-scroll"
  );

}


$$(".hotel-detail-btn").forEach(button => {

  button.addEventListener("click", () => {

    const hotel =
      button.dataset.hotel;

    openHotelModal(hotel);

  });

});


$$("[data-hotel-close]").forEach(element => {

  element.addEventListener(
    "click",
    closeHotelModal
  );

});


/* =========================================================
   14. TRANSPORT SELECTION
========================================================= */

$$(".transport-select")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const transport =
          button.dataset.transport;


        const serviceSelect =
          $("#contactService");

        const message =
          $("#contactMessage");


        if (serviceSelect) {
          serviceSelect.value =
            "Transportasi";
        }


        if (message) {

          message.value =
            `Saya membutuhkan transportasi ${transport}. Mohon informasi ketersediaan dan penawaran.`;

        }


        showToast(
          `${transport} dipilih`
        );


        setTimeout(() => {

          scrollToElement("#contact");

        }, 350);

      }
    );

  });


/* =========================================================
   15. PACKAGE SELECTION
========================================================= */

$$(".package-select")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const packageName =
          button.dataset.package;


        const serviceSelect =
          $("#contactService");

        const message =
          $("#contactMessage");


        if (serviceSelect) {

          /*
            Full dan Custom tersedia
            di select contact.
          */

          if (
            packageName ===
            "Full Land Arrangement"
          ) {

            serviceSelect.value =
              "Full Land Arrangement";

          } else if (
            packageName ===
            "Custom Package"
          ) {

            serviceSelect.value =
              "Custom Package";

          } else {

            serviceSelect.value =
              "Transportasi";

          }

        }


        if (message) {

          message.value =
            `Saya tertarik dengan paket ${packageName}. Mohon dibuatkan penawaran sesuai kebutuhan perjalanan saya.`;

        }


        showToast(
          `${packageName} dipilih`
        );


        setTimeout(() => {

          scrollToElement("#contact");

        }, 300);

      }
    );

  });


/* =========================================================
   16. FAQ ACCORDION
========================================================= */

const faqItems =
  $$(".faq-item");


function updateFaqHeight(item) {

  const answer =
    $(".faq-answer", item);

  if (!answer) return;


  if (
    item.classList.contains("active")
  ) {

    answer.style.maxHeight =
      `${answer.scrollHeight}px`;

  } else {

    answer.style.maxHeight = "0px";

  }

}


/*
  Initialize active FAQ.
*/

faqItems.forEach(item => {

  updateFaqHeight(item);

});


faqItems.forEach(item => {

  const question =
    $(".faq-question", item);

  if (!question) return;


  question.addEventListener(
    "click",
    () => {

      const alreadyActive =
        item.classList.contains("active");


      faqItems.forEach(otherItem => {

        otherItem.classList.remove(
          "active"
        );

        updateFaqHeight(otherItem);

      });


      if (!alreadyActive) {

        item.classList.add("active");

        updateFaqHeight(item);

      }

    }
  );

});


window.addEventListener(
  "resize",
  () => {

    faqItems.forEach(item => {

      if (
        item.classList.contains("active")
      ) {

        updateFaqHeight(item);

      }

    });

  }
);


/* =========================================================
   17. CALCULATOR
========================================================= */

const calculatorForm =
  $("#laCalculator");

const calculatorResult =
  $("#calculatorResult");

const resultDetails =
  $("#resultDetails");

const resultWhatsapp =
  $("#resultWhatsapp");


if (calculatorForm) {

  calculatorForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const pax =
        Number($("#calcPax")?.value || 1);


      const days =
        $("#calcDays")?.value || "9";


      const hotel =
        $("#hotelClass")?.value ||
        "Comfort";


      const vehicle =
        $("#vehicleType")?.value ||
        "Hiace";


      const cities =
        $$('input[name="city"]:checked')
          .map(input => input.value);


      const extras =
        $$('input[name="extra"]:checked')
          .map(input => input.value);


      /*
        Validasi kota
      */

      if (cities.length === 0) {

        showToast(
          "Pilih minimal satu kota"
        );

        return;

      }


      /*
        Smart vehicle suggestion.
      */

      let recommendedVehicle =
        vehicle;


      if (pax <= 3) {

        recommendedVehicle =
          "Sedan / Private Car";

      } else if (pax <= 12) {

        recommendedVehicle =
          "Hiace / Van";

      } else {

        recommendedVehicle =
          "Bus Jamaah";

      }


      /*
        Smart package type.
      */

      let packageType =
        "Custom Land Arrangement";


      if (
        extras.includes("Handling") &&
        extras.includes("Mutawwif")
      ) {

        packageType =
          "Full Land Arrangement";

      }


      const durationText =
        days === "custom"
          ? "Custom"
          : `${days} hari`;


      const extrasText =
        extras.length
          ? extras.join(", ")
          : "Tidak ada tambahan";


      /*
        Show result.
      */

      if (resultDetails) {

        resultDetails.innerHTML = `

          <p>
            <strong>Jamaah:</strong>
            ${pax} orang
          </p>

          <p>
            <strong>Durasi:</strong>
            ${durationText}
          </p>

          <p>
            <strong>Kota:</strong>
            ${cities.join(" • ")}
          </p>

          <p>
            <strong>Hotel:</strong>
            ${hotel}
          </p>

          <p>
            <strong>Kendaraan dipilih:</strong>
            ${vehicle}
          </p>

          <p>
            <strong>Rekomendasi kendaraan:</strong>
            ${recommendedVehicle}
          </p>

          <p>
            <strong>Layanan tambahan:</strong>
            ${extrasText}
          </p>

          <p>
            <strong>Tipe paket:</strong>
            ${packageType}
          </p>

        `;

      }


      if (calculatorResult) {

        calculatorResult.classList.add(
          "show"
        );

      }


      /*
        Prepare WhatsApp text.
      */

      const whatsappMessage = `
Assalamu'alaikum Safeera,

Saya ingin meminta penawaran Land Arrangement Saudi Arabia.

Rincian kebutuhan:
• Jumlah jamaah: ${pax} orang
• Durasi: ${durationText}
• Kota: ${cities.join(", ")}
• Kategori hotel: ${hotel}
• Kendaraan: ${vehicle}
• Rekomendasi kendaraan: ${recommendedVehicle}
• Tambahan layanan: ${extrasText}
• Paket: ${packageType}

Mohon informasi dan penawarannya.

Terima kasih.
      `.trim();


      if (resultWhatsapp) {

        resultWhatsapp.href =
          createWhatsAppURL(
            whatsappMessage
          );

        resultWhatsapp.target =
          "_blank";

        resultWhatsapp.rel =
          "noopener noreferrer";

      }


      showToast(
        "Ringkasan perjalanan berhasil dibuat"
      );


      setTimeout(() => {

        calculatorResult?.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });

      }, 200);

    }
  );

}


/* =========================================================
   18. CONTACT FORM → WHATSAPP
========================================================= */

const contactForm =
  $("#contactForm");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        $("#contactName")?.value.trim();


      const pax =
        $("#contactPax")?.value;


      const date =
        $("#contactDate")?.value;


      const service =
        $("#contactService")?.value;


      const message =
        $("#contactMessage")?.value.trim();


      if (!name) {

        showToast(
          "Silakan isi nama"
        );

        return;

      }


      if (!pax || Number(pax) < 1) {

        showToast(
          "Masukkan jumlah jamaah"
        );

        return;

      }


      /*
        Format date
      */

      let formattedDate =
        "Belum ditentukan";


      if (date) {

        const dateObject =
          new Date(`${date}T00:00:00`);


        formattedDate =
          new Intl.DateTimeFormat(
            "id-ID",
            {
              day: "numeric",
              month: "long",
              year: "numeric"
            }
          ).format(dateObject);

      }


      const whatsappMessage = `
Assalamu'alaikum Safeera,

Nama: ${name}
Jumlah jamaah: ${pax} orang
Tanggal perjalanan: ${formattedDate}
Layanan: ${service}

Kebutuhan:
${message || "Saya ingin konsultasi mengenai layanan Safeera."}

Mohon informasi dan penawarannya.

Terima kasih.
      `.trim();


      showToast(
        "Membuka WhatsApp..."
      );


      setTimeout(() => {

        openWhatsApp(
          whatsappMessage
        );

      }, 350);

    }
  );

}


/* =========================================================
   19. FLOATING WHATSAPP
========================================================= */

const floatingWhatsapp =
  $("#floatingWhatsapp");


if (floatingWhatsapp) {

  floatingWhatsapp.addEventListener(
    "click",
    event => {

      event.preventDefault();

      const message = `
Assalamu'alaikum Safeera,

Saya ingin konsultasi mengenai layanan Land Arrangement Saudi Arabia.

Mohon informasinya.
      `.trim();


      openWhatsApp(message);

    }
  );

}


/* =========================================================
   20. GENERAL CONSULTATION BUTTONS
========================================================= */

/*
  Tombol dengan href="#contact" tetap scroll
  ke contact section.

  Tombol WhatsApp khusus menggunakan
  logic di atas.
*/


/* =========================================================
   21. REVEAL ON SCROLL
========================================================= */

const revealElements =
  $$(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -35px 0px"
      }
    );


  revealElements.forEach(
    (element, index) => {

      /*
        Sedikit stagger,
        tetapi tidak berlebihan.
      */

      element.style.transitionDelay =
        `${Math.min(
          (index % 4) * 60,
          180
        )}ms`;


      revealObserver.observe(element);

    }
  );

} else {

  revealElements.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================================
   22. ACTIVE NAVIGATION
========================================================= */

const pageSections =
  $$("main section[id]");

const navLinks =
  $$(".nav-link");


function updateActiveNavigation() {

  let currentSection = "home";


  pageSections.forEach(section => {

    const top =
      section.offsetTop - 160;


    if (window.scrollY >= top) {

      currentSection =
        section.id;

    }

  });


  navLinks.forEach(link => {

    link.classList.remove("active");


    const href =
      link.getAttribute("href");


    if (
      href === `#${currentSection}`
    ) {

      link.classList.add("active");

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);


updateActiveNavigation();


/* =========================================================
   23. HOTEL IMAGE FALLBACK
========================================================= */

/*
  Jika foto eksternal gagal dimuat,
  card tetap terlihat bagus.
*/

$$(".hotel-image img").forEach(img => {

  img.addEventListener("error", () => {

    img.style.display = "none";

    const wrapper =
      img.closest(".hotel-image");


    if (wrapper) {

      wrapper.style.background = `
        linear-gradient(
          135deg,
          #0b2923,
          #175246
        )
      `;


      if (
        !wrapper.querySelector(
          ".image-fallback"
        )
      ) {

        const fallback =
          document.createElement("div");


        fallback.className =
          "image-fallback";


        fallback.innerHTML = `
          <i class="fa-solid fa-hotel"></i>
          <span>SAFEERA HOTEL</span>
        `;


        Object.assign(
          fallback.style,
          {
            position: "absolute",
            inset: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: "rgba(255,255,255,.55)",
            fontSize: "10px",
            letterSpacing: ".14em"
          }
        );


        const icon =
          fallback.querySelector("i");


        if (icon) {

          Object.assign(
            icon.style,
            {
              fontSize: "35px",
              color:
                "rgba(239,199,120,.7)"
            }
          );

        }


        wrapper.prepend(fallback);

      }

    }

  });

});


/* =========================================================
   24. CARD KEYBOARD SUPPORT
========================================================= */

$$(".service-card[onclick]")
  .forEach(card => {

    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          const onclick =
            card.getAttribute("onclick");


          if (
            onclick &&
            onclick.includes("#hotels")
          ) {

            scrollToElement("#hotels");

          }


          if (
            onclick &&
            onclick.includes("#transport")
          ) {

            scrollToElement("#transport");

          }

        }

      }
    );

  });


/* =========================================================
   25. TOAST
========================================================= */

const toast =
  $("#toast");

const toastMessage =
  $("#toastMessage");

let toastTimer;


function showToast(message) {

  if (!toast) return;


  if (toastMessage) {
    toastMessage.textContent =
      message;
  }


  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2600);

}


/* =========================================================
   26. CLOSE MODALS WHEN CLICKING CONTACT CTA
========================================================= */

$$(".modal-contact").forEach(button => {

  button.addEventListener("click", () => {

    closeServiceModal();
    closeHotelModal();

    setTimeout(() => {

      scrollToElement("#contact");

    }, 150);

  });

});


/* =========================================================
   27. TOUCH IMPROVEMENT FOR DESKTOP DROPDOWN
========================================================= */

const dropdownButton =
  $(".nav-dropdown-button");

const dropdownMenu =
  $(".dropdown-menu");


if (dropdownButton && dropdownMenu) {

  dropdownButton.addEventListener(
    "click",
    event => {

      /*
        Berguna untuk tablet / touchscreen.
      */

      if (
        window.matchMedia(
          "(hover: none)"
        ).matches
      ) {

        event.preventDefault();


        const isOpen =
          dropdownMenu.style.opacity === "1";


        if (isOpen) {

          dropdownMenu.style.opacity = "";
          dropdownMenu.style.visibility = "";
          dropdownMenu.style.pointerEvents = "";
          dropdownMenu.style.transform = "";

        } else {

          dropdownMenu.style.opacity = "1";
          dropdownMenu.style.visibility = "visible";
          dropdownMenu.style.pointerEvents = "auto";
          dropdownMenu.style.transform =
            "translate(-50%, 0)";

        }

      }

    }
  );

}


/* =========================================================
   28. SET MINIMUM DATE
========================================================= */

const contactDate =
  $("#contactDate");


if (contactDate) {

  const today =
    new Date();


  const year =
    today.getFullYear();


  const month =
    String(
      today.getMonth() + 1
    ).padStart(2, "0");


  const day =
    String(
      today.getDate()
    ).padStart(2, "0");


  contactDate.min =
    `${year}-${month}-${day}`;

}


/* =========================================================
   29. RESPONSIVE CLEANUP
========================================================= */

window.addEventListener(
  "resize",
  () => {

    /*
      Jika user rotate HP / memperbesar
      browser ke desktop, tutup menu.
    */

    if (window.innerWidth > 1120) {

      closeMobileMenu();

    }

  }
);


/* =========================================================
   30. SAFEERA READY
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /*
      Tampilkan elemen hero lebih cepat.
    */

    $$(".hero .reveal").forEach(
      element => {

        setTimeout(() => {

          element.classList.add(
            "visible"
          );

        }, 150);

      }
    );


    console.log(
      "%c SAFEERA MADINAH ",
      "background:#0b2923;color:#efc778;padding:8px 14px;border-radius:5px;font-weight:bold;"
    );


    console.log(
      "Website ready."
    );

  }
);
