// Nav animation
const nav = document.querySelector('nav')
const allNavLink = document.querySelectorAll('.nav__link')

nav.addEventListener('mouseover', (e) => {
  const mouseHover = e.target
  if(e.target.classList.contains('nav__link')) {
    const logo = document.getElementById('logo')
    allNavLink.forEach((e) => {
      if(mouseHover !== e) {
        e.style.opacity = .5
        logo.style.opacity = .5
      }
    })
  }
})
nav.addEventListener('mouseout', (e) => {
  const mouseHover = e.target
  if(e.target.classList.contains('nav__link')) {
    const logo = document.getElementById('logo')
    allNavLink.forEach((e) => {
      if(mouseHover !== e) {
        e.style.opacity = 1
        logo.style.opacity = 1
      }
    })
  }
})

// Nav link scroll smooth
allNavLink.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })
})

// Revealing section with API
const revealNav = (entries, observer) => {
  const [entry] = entries
  if(!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}
 
const headerObserver = new IntersectionObserver(revealNav, {
  root: null,
  threshold: .15,
  rootMargin: '-50px'
})

headerObserver.observe(document.querySelector('header'))

// Revealing Image
const imgTarget = document.querySelectorAll('img[data-src]')

const revealImage = (entries, observer) => {
  const [entry] = entries

  entry.target.src = entry.target.dataset.src
  entry.target.classList.remove('lazy-img')
}
const imageObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0.25,
  rootMargin: '-200px'
})

imgTarget.forEach((image) => {
  imageObserver.observe(image)
})

// Reveal Section
const revealSection = (entries, observer) => {
  const [entry] = entries
  console.log(entry.isIntersecting)
  
  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')

  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: .15
})

const allSection = document.querySelectorAll('section')

allSection.forEach((section) => {
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})

// Content Clicked
const tabContainer = document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab')
const tabContent = document.querySelectorAll('.operations__content')

tabContainer.addEventListener('click', (e) => {
  const mouseClick = e.target.closest('.operations__tab')
  tabs.forEach((tab) => {
    tab.classList.remove('operations__tab--active')
    mouseClick.classList.add('operations__tab--active')
  })
  tabContent.forEach((content) => {
    content.classList.remove('operations__content--active')
  })
  document.querySelector(`.operations__content--${mouseClick.dataset.tab}`).classList.add('operations__content--active')
})

// Slider
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
let currentSlide = 0
const maxSlide = slides.length -1

const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  })
}
goToSlide(currentSlide)

const nextSlide = () => {
  currentSlide === maxSlide ? currentSlide = 0 : currentSlide++
  goToSlide(currentSlide)
}

const prevSlide = () => {
  currentSlide === 0 ? currentSlide = maxSlide : currentSlide--
  goToSlide(currentSlide)
}

btnLeft.addEventListener('click', prevSlide)
btnRight.addEventListener('click', nextSlide)

const slideKey = (entries, observer) => {
  const [entry] = entries

  if(entry.isIntersecting) {
    document.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowRight') {
        nextSlide()
        goToSlide()
      } else if(e.key === 'ArrowLeft') {
        prevSlide()
        goToSlide()
      }
    })
  }
}

const sliderObserver = new IntersectionObserver(slideKey, {
  root: null,
  threshold: 0.5
})

slides.forEach((slide) => {
  sliderObserver.observe(slide)
})