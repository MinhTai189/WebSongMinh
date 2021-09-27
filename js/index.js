import { dataTableVn, dataTableEng } from "./data-table.js";

const start = () => {
    const url = window.location.pathname;
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    const dataTable = fileName.includes('eng') ? dataTableEng : dataTableVn;

    runSlider();
    loadDataTable(dataTable, "aPart");
    clickBtnSeeMore(dataTable, fileName);
    handleScrollToElement();
    handleDisplayNav();
    handleSelectVideo();

    window.addEventListener('resize', handleScrollToElement);
}

const clickBtnSeeMore = (dataTable, fileName) => {
    const seeMore = document.querySelector("#see-more");
    const btnSeeMore = document.querySelector(".see-more");
    const text = fileName.includes('eng') ? ['See more', 'Collapse'] : ['Xem thêm', 'Thu gọn'];

    seeMore.addEventListener("click", () => {
        seeMore.classList.toggle("active");

        if (seeMore.classList.contains('active')) {
            btnSeeMore.innerHTML = text[1];
            loadDataTable(dataTable, "all")
        }
        else {
            btnSeeMore.innerHTML = text[0];
            loadDataTable(dataTable, "aPart");
        }
    });
}

const loadDataTable = (dataTable, amount = "aPart") => {
    const tBody = document.querySelector("#great-projects__tbody");
    const num = amount === "aPart" ? 12 : dataTable.length;

    while (tBody.firstChild)
        tBody.removeChild(tBody.firstChild)

    dataTable.slice(0, num).forEach(data => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdLocation = document.createElement("td");
        const tdCompany = document.createElement("td");
        const tdService = document.createElement("td");

        tdName.appendChild(document.createTextNode(data.name));
        tdLocation.appendChild(document.createTextNode(data.location));
        tdCompany.appendChild(document.createTextNode(data.company));
        tdService.appendChild(document.createTextNode(data.service));

        tdName.style.fontWeight = 600;

        tr.appendChild(tdName);
        tr.appendChild(tdLocation);
        tr.appendChild(tdCompany);
        tr.appendChild(tdService);

        tBody.appendChild(tr);
    });
}

const runSlider = () => {
    const url = window.location.pathname;
    const fileName = url.substring(url.lastIndexOf('/') + 1);

    new Splide('#slider', {
        arrows: false,
        autoplay: true,
        interval: 4000,
        rewind: true,
        type: 'loop',
    }).mount();

    !fileName.includes('eng') && new Splide('#main-resource__slider', {
        perPage: 3,
        rewind: true,
        arrows: false,
        gap: 25,
        padding: 20,
        autoplay: true,
        interval: 3000,
        perMove: 1,
        breakpoints: {
            900: {
                gap: 10,
            },
            768: {
                perPage: 2
            },
            530: {
                perPage: 1
            }
        }
    }).mount();
}

const handleScrollToElement = () => {
    const introduction = document.querySelector(".introduction");
    const slider = document.querySelector(".slider");
    const mission = document.querySelector(".mission");
    const mainResource = document.querySelector(".main-resource");
    const greatProjects = document.querySelector(".great-projects");
    const fields = document.querySelector(".fields");

    const navItems = window.innerWidth > 900 ? document.querySelectorAll('.nav__item')
        : document.querySelectorAll('.mobile-nav__item');

    const offsetElements = [
        {
            element: introduction,
            offset: introduction.offsetTop,
            height: introduction.offsetHeight
        },
        {
            element: slider,
            offset: slider.offsetTop,
            height: slider.offsetHeight
        },
        {
            element: mission,
            offset: mission.offsetTop,
            height: mission.offsetHeight
        },
        {
            element: fields,
            offset: fields.offsetTop,
            height: fields.offsetHeight
        },
        {
            element: mainResource,
            offset: mainResource.offsetTop,
            height: mainResource.offsetHeight
        },
        {
            element: greatProjects,
            offset: greatProjects.offsetTop,
            height: greatProjects.offsetHeight
        },
    ]

    navItems.forEach((item, index) => {
        offsetElements[index].item = item;

        scrollToElement(item, offsetElements[index].offset);
    })

    windowScroll(offsetElements);
}

const scrollToElement = (from, position) => {
    from.addEventListener("click", () => {
        document.body.scrollTop = position - 60;
        document.documentElement.scrollTop = position - 60;
        addActiveNavItem(from);
    })
}

const addActiveNavItem = (item, isClear = false) => {
    const allNavItem = window.innerWidth > 900 ? document.querySelectorAll(".nav__item")
        : document.querySelectorAll(".mobile-nav__item");

    allNavItem.forEach(item => {
        item.classList.remove("active");
    })

    !isClear && item.classList.add("active");
}

const windowScroll = offsetElements => {
    window.addEventListener("scroll", () => {
        const offset = window.pageYOffset;

        if (offsetElements[0].offset - 80 > offset)
            addActiveNavItem(null, true);
        else if (offsetElements[0].offset - 80 <= offset && offsetElements[0].height + offsetElements[0].offset > offset)
            addActiveNavItem(offsetElements[0].item);
        else if (offsetElements[1].offset - 80 <= offset && offsetElements[1].height + offsetElements[1].offset > offset)
            addActiveNavItem(offsetElements[1].item);
        else if (offsetElements[2].offset - 80 <= offset && offsetElements[2].height + offsetElements[2].offset > offset)
            addActiveNavItem(offsetElements[2].item);
        else if (offsetElements[3].offset - 80 <= offset && offsetElements[3].height + offsetElements[3].offset > offset)
            addActiveNavItem(offsetElements[3].item);
        else if (offsetElements[4].offset - 80 <= offset && offsetElements[4].height + offsetElements[4].offset > offset)
            addActiveNavItem(offsetElements[4].item);
        else if (offsetElements[5].offset - 80 <= offset && offsetElements[5].height + offsetElements[5].offset > offset)
            addActiveNavItem(offsetElements[5].item);
    })
}

const handleDisplayNav = () => {
    const btnBars = document.querySelector('.btn-bars');
    const btnClose = document.querySelector('.btn-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileItems = document.querySelectorAll('.mobile-nav__item');

    btnBars.addEventListener('click', () => {
        mobileNav.classList.add('active');
    })

    btnClose.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    })

    mobileItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        })
    })
}

const handleSelectVideo = () => {
    const videoOptions = document.querySelectorAll('.video__options');

    videoOptions.forEach(option => {
        option.addEventListener('click', () => {
            const srcVideo = option.attributes['data-src'].textContent;
            const posterVideo = option.attributes['data-poster'].textContent;
            const player = videojs('#my-player');

            if (!option.classList.value.includes('active')) {
                player.poster(posterVideo)
                player.src({
                    src: srcVideo,
                    type: 'video/mp4'
                })

                displayPlayingVideo(option);
            }
        })
    })
}

const displayPlayingVideo = (elementAc) => {
    const videoOptions = document.querySelectorAll('.video__options');

    videoOptions.forEach(option => {
        option.classList.remove('active');
    })

    elementAc.classList.add('active');
}

start();

