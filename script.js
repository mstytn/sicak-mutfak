// jshint esversion: 6
// jshint -W033

const anchors = ['story', 'selected', 'rezerv']


const getAnchorPoses = (anchorNames) => {
  const elems = {home: 0}
  for (const elemName of anchorNames) {
    const elem = document.getElementById(elemName)
    if (elem === undefined) continue;
    const vOffset = elem.getBoundingClientRect()
    elems[elemName] = vOffset.top + window.scrollY;
  }
  return elems
}

const marker = (navToActivate) => {
  const navItems = document.querySelectorAll('.nav-link')
  const navItemToActive = document.getElementById(navToActivate)
  navItems.forEach(navItem => navItem.classList.remove('active'))
  navItemToActive.classList.add('active')
}

const addTooltipTottClasses = () => {
  const toolTips = document.querySelectorAll('.tt')
  toolTips.forEach(t => {
    new bootstrap.Tooltip(t)
  })
}

window.addEventListener('load', (ev) => {
  addTooltipTottClasses()

  let ancPoses = getAnchorPoses(anchors)
  window.addEventListener('resize', ev => {
    ancPoses = getAnchorPoses(anchors)
  })
  window.addEventListener('scroll', ev => {
    const scrPos = window.scrollY
    const scrller = document.getElementById('scroller')
    if (scrPos > 300) {
      scrller.classList.remove('not-shown')
    } else if (scrPos < 200){
      scrller.classList.add('not-shown')
    }

    if (scrPos < (ancPoses.selected)) {
      marker('homeNav')
    } 
    if (scrPos > (ancPoses.story-250)) {
      marker('storyNav')
    } 
    if (scrPos > (ancPoses.selected-100)) {
      marker('selectedNav')
    } 
    if (scrPos > (ancPoses.rezerv -700)) {
      marker('rezervNav')
    }

    // console.log(ancPoses);
    // console.log(scrPos);
    // marker()
  });
})

