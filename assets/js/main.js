/**
* Template Name: BizLand - v3.3.0
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

// Console Pods Section

document.getElementById('console_pods').addEventListener("click", function () {
  document.querySelector('.bg-modal1').style.display = "flex";
});

function podsCommand() {
  var console_pods_name = document.getElementById('console_pods_name').value;
  var console_image_name = document.getElementById('console_image_name').value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://192.168.29.48/cgi-bin/command.py?cmd=" + "sudo kubectl run " + console_pods_name + " --image " + console_image_name, true);
  xhr.send();
  xhr.onload = function () {
    var output = xhr.responseText;
    // if(output.includes("pod") && output.includes("create")){
    //   document.getElementById("console_pods_output").innerHTML = output;
    // }
    // else
    // document.getElementById("console_pods_output").innerHTML = "The command is not successful";
    document.getElementById("console_pods_output").innerHTML = output;
  }
}

document.querySelector('.close1').addEventListener("click", function () {
  document.querySelector('.bg-modal1').style.display = "none";
});


// Console Deployments Section

document.getElementById('console_deployments').addEventListener("click", function () {
  document.querySelector('.bg-modal2').style.display = "flex";
});


function deploymentsCommand() {
  var console_deployment_name = document.getElementById('console_deployment_name').value;
  var console_deploy_image_name = document.getElementById('console_deploy_image_name').value;
  var console_deploy_replica_num = document.getElementById('console_deploy_replica_num').value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://192.168.29.48/cgi-bin/command.py?cmd=" + "sudo kubectl create deployment " + console_deployment_name + " --image " + console_deploy_image_name + " --replicas " + console_deploy_replica_num, true);
  xhr.send();
  xhr.onload = function () {
    var output = xhr.responseText;
    document.getElementById("console_deployments_output").innerHTML = output;
  }
}


document.querySelector('.close2').addEventListener("click", function () {
  document.querySelector('.bg-modal2').style.display = "none";
});



// Console Service Section

document.getElementById('console_services').addEventListener("click", function () {
  document.querySelector('.bg-modal3').style.display = "flex";
});

function servicesCommand() {
  var console_resource_name = document.getElementById('console_resource_name').value;
  var console_service_port = document.getElementById('console_service_port').value;
  var service_type1 = document.getElementById('servicetype1');
  var service_type2 = document.getElementById('servicetype2');
  var service_type3 = document.getElementById('servicetype3');
  var resource_type1 = document.getElementById('resourcetype1');
  var resource_type2 = document.getElementById('resourcetype2');
  var resource_type3 = document.getElementById('resourcetype3');
  if (resource_type1.checked != true) {
    resource_type1.value = " ";
  }
  if (resource_type2.checked != true) {
    resource_type2.value = " ";
  }
  if (resource_type3.checked != true) {
    resource_type3.value = " ";
  }
  if (service_type1.checked != true) {
    service_type1.value = " ";
  }
  if (service_type2.checked != true) {
    service_type2.value = " ";
  }
  if (service_type3.checked != true) {
    service_type3.value = " ";console_resource_name
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://192.168.29.48/cgi-bin/command.py?cmd=" + "sudo kubectl expose " + resource_type1.value + resource_type2.value + resource_type3.value + " " + console_resource_name + " --type " + service_type1.value + service_type2.value + service_type3.value + " --port " + console_service_port, true);
  xhr.send();
  xhr.onload = function () {
    var output = xhr.responseText;
    document.getElementById("console_services_output").innerHTML = output;
  }
  var xhr2 = new XMLHttpRequest();  
  xhr2.open("GET", "http://192.168.29.48/cgi-bin/command.py?cmd=" + "sudo kubectl get svc -l app=" + console_resource_name, true);
  xhr2.send();
  xhr2.onload = function () {
    var output2 = xhr.responseText;
    document.getElementById("console_services_output2").innerHTML = output2;
  }  
}

document.querySelector('.close3').addEventListener("click", function () {
  document.querySelector('.bg-modal3').style.display = "none";
});



// Console Button Section

document.getElementById('console_full').addEventListener("click", function () {
  document.querySelector('.bg-modal4').style.display = "flex";
});

function consoleCommand() {
  var cmd = document.getElementById('console_full_input').value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://192.168.29.48/cgi-bin/command.py?cmd=" + "sudo " + cmd, true);
  xhr.send();
  xhr.onload = function () {
    var output = xhr.responseText;
    document.getElementById("console_full_output").innerHTML = output;
  }
}

document.querySelector('.close4').addEventListener("click", function () {
  document.querySelector('.bg-modal4').style.display = "none";
});


