/** funcion para abrir la navegacion en la version movil pantallas con menores a los 1024px */
// const abrirNav = ( e => {
//     bar.addEventListener('click',() => {
//         document.body.classList.toggle('animateNav');
//     })
// })()


/** funcion para agregar el efecto al desplazar el scroll  */
const molinoNav = ( e => {
    addEventListener('scroll', e => {
        efecto();
    })

    addEventListener('resize', e => {
        efecto();
    })

    addEventListener('load', e => {
        efecto();
    })

    const efecto = () => {
        let heightHeader =  header.getBoundingClientRect().height;
        let scrollNav = ( scrollY >= heightHeader ) ? document.body.classList.add('efectoScrollNav') :  document.body.classList.remove('efectoScrollNav')
        let scrollNav2 = ( scrollY >10 ) ? document.body.classList.add('efectoScroll') :  document.body.classList.remove('efectoScroll')
    }
} )()

const efectoModalOpen = ( e => {
    bar.addEventListener('click', ev => {
        document.body.classList.add('efectoModalOpen')
    })

    closeNav.addEventListener('click', ev => {
        document.body.classList.remove('efectoModalOpen')
    })

})()
