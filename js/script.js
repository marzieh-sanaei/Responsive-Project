// Search Modal for Navbar

document.getElementById("search-btn").addEventListener("click", function () {
  document.getElementById("search-modal").style.display = "block";
});

document.getElementById("close-search").addEventListener("click", function () {
  document.getElementById("search-modal").style.display = "none";
});


// دسترسی سریع 

document.addEventListener("DOMContentLoaded", function () {
  const pageLayer = document.querySelector(".page-layer");
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.querySelector(".sidebar");
  const closeIcon = document.querySelector(".close-icon");
  const mainAccordion = document.getElementById("main-accordion");
  const accordionItems = document.querySelectorAll(".accordion-item");
  const moreSocialBox = document.querySelector(".more-social-box");
  const moreBtn = document.querySelector(".more-btn");
  const moreAccordionItems = document.querySelector(".more-accordionItems");

  menuIcon.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    pageLayer.classList.toggle("bg-blur");
    document.body.classList.toggle("overflow");
  });

  closeIcon.addEventListener("click", function () {
    sidebar.classList.remove("open");
    pageLayer.classList.remove("bg-blur");
    document.body.classList.remove("overflow");
  });


  moreBtn.addEventListener("click", function () {
    moreAccordionItems.classList.toggle("show");
    moreBtn.classList.add("d-none");
    sidebar.style.overflowY = "scroll";
    moreSocialBox.classList.add("change");
    mainAccordion.classList.add("posRelative");
  });

  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("bg-white");
      this.classList.toggle("active");
      const accordionContent = this.nextElementSibling;
      accordionContent.classList.toggle("active");
      const arrow = this.querySelector(".arrow");
      arrow.classList.toggle("rotate");
      accordionItems.classList.toggle("active");
    });
  });
});


// ویدیوها

document.addEventListener("DOMContentLoaded", function () {
  const mainVideo = document.getElementById("main-video");
  const tumbnail = document.querySelector(".tumbnail");

  tumbnail.addEventListener("click", function() {
    tumbnail.classList.add("d-none");
    mainVideo.innerHTML = `<video
    id="my-video"
    class="video-js"
    controls
    preload="auto"
    data-setup="{}"
  >
    <source src="images/video/file_example_WEBM_1920_3_7MB.mp4" type="video/mp4" />
    <source src="images/video/file_example_WEBM_1920_3_7MB.webm" type="video/webm" />
  </video>`

  let player = videojs('my-video');
  player.play();
  })  
  
});



// آیه های زندگی

let currentTab = 0;
let tabs = document.getElementById('tabs').getElementsByTagName('button');
let tabContents = document.getElementById('tabsContent').getElementsByClassName('tab-content');
let timer;

function showTab(tabIndex) {
  clearInterval(timer); 

  tabContents[currentTab].classList.remove('active');
  tabs[currentTab].classList.remove('active-tab');

  tabContents[tabIndex].classList.add('active');
  tabs[tabIndex].classList.add('active-tab');

  currentTab = tabIndex;

  timer = setInterval(() => {
      let nextTab = (currentTab + 1) % tabs.length;
      showTab(nextTab);
  }, 10000);
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function() {
      showTab(i);
  });
}

showTab(0);



// استانها

document.addEventListener("DOMContentLoaded", function () {
  let selectedProvince = null; 

  const map = document.getElementById("map");
  const provinceDropdown = document.getElementById("ostanha");

  map.addEventListener("click", function (event) {
    const province = event.target.getAttribute("title");

    if (province) {
      updateSelectedOption(province);
      updateSelectedProvince(province);
    }
  });

  provinceDropdown.addEventListener("change", function () {
    const province = provinceDropdown.value;
    if (province) {
        clearSelectedProvinces();
        updateSelectedProvince(province);
        sendAjaxRequest(province);
    }
});

function sendAjaxRequest(province) {
    const provinceId = document.querySelector(`[title="${province}"]`).getAttribute("id");
    $.ajax({
        type: 'GET',
        url: 'map.html',
        success: function (data) {
            var provinceContent = $(data).filter('#' + provinceId).html();
            $('#news-container').html(provinceContent);
        },
        error: function () {
            console.error('Error loading content for ' + provinceId);
        }
    });
}

  map.addEventListener("mouseover", function (event) {
    const province = event.target.getAttribute("title");
    if (province) {
      updateTextElementColor(map.querySelector(`[title="${province}"]`), true);
    }
  });

  map.addEventListener("mouseout", function (event) {
    const province = event.target.getAttribute("title");
    if (province && province !== selectedProvince) {
      updateTextElementColor(map.querySelector(`[title="${province}"]`), false);
    }
  });

  function clearSelectedProvinces() {
    const selectedProvinces = map.querySelectorAll(".selected-province");
    selectedProvinces.forEach((province) => {
      province.classList.remove("selected-province");
      updateTextElementColor(province, false);
    });
  }

  function updateSelectedProvince(province) {
    clearSelectedProvinces();
    const path = map.querySelector(`[title="${province}"]`);
    if (path) {
      path.classList.add("selected-province");
      updateTextElementColor(path, true);
      selectedProvince = province;
    }
  }

  function updateSelectedOption(province) {
    provinceDropdown.value = province;
    updateTextElementColor(map.querySelector(`[title="${province}"]`), true);
    selectedProvince = province;
  }

  function updateTextElementColor(element, isSelected) {
    const pathId = element.id.replace("path_", "");
    const textElement = document.getElementById(`text_${pathId}`);

    if (textElement) {
      const childTextElement = textElement.querySelector("text");
      if (childTextElement) {
        childTextElement.style.fill = isSelected ? "white" : "";
        childTextElement.style.fontWeight = isSelected ? "bold" : "";
        childTextElement.style.fontSize = isSelected ? "18px" : "";
      }
    }
  }
});

$(document).ready(function () {
  $('svg').on('click', 'path[id^="path_"]', function (event) {
    event.preventDefault();
    var provinceId = $(this).attr('id');

    $.ajax({
      type: 'GET',
      url: 'map.html',
      success: function (data) {
        var provinceContent = $(data).filter('#' + provinceId).html();

        $('#news-container').html(provinceContent);
      },
      error: function () {
        console.error('Error loading content for ' + provinceId);
      }
    });
  });
});



// Sticky Navbar

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const body = document.body;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 20 && !body.classList.contains("sticky-navbar")) {
      body.classList.add("sticky-navbar");
      navbar.classList.remove("container");
      navbar.classList.add("container-fluid");
    } else if (window.scrollY < 20 && body.classList.contains("sticky-navbar")) {
      body.classList.remove("sticky-navbar");
      navbar.classList.remove("container-fluid");
      navbar.classList.add("container");
    }
  });
});

// Lozad
const intersectionObserver = lozad();
intersectionObserver.observe();


// Lazy Loading
const lazyImages = document.querySelectorAll(".lazy");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1 
};

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.getAttribute("data-src");
      img.src = src;
      observer.unobserve(img);
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, options);
lazyImages.forEach((image) => {
  observer.observe(image);
});






  


