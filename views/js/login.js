/**funcion que cambia las opciones entre registro y login de usuario */

const changeLogin = ( e => {
    login.addEventListener('click', () => {
        document.body.classList.add('changeLogin')
    })

    signup.addEventListener('click', () => {
        document.body.classList.remove('changeLogin')
    })
})()


/**funcion que cambia las imagenes con y el tag de cada una cada 6 segundos */

const changeTag = ( e => {
    
    let img = Array.from( document.getElementsByClassName('_img-container') );
    
    let tag = Array.from( document.getElementsByClassName('tag') )

    let currentTag = 0;
   
    img[currentTag].style.display = 'block'
    tag[currentTag].style.color = '#eee'

    setInterval( e =>{
        if( currentTag !== img.length-1 ){

            currentTag += 1;
            img[currentTag].style.display = 'block'
            tag[currentTag].style.color = '#eee'
            
            img[currentTag - 1].style.display = 'none'
            tag[currentTag-1].style.color = '#033275'

        }else{

            currentTag = 0
            img[currentTag].style.display = 'block'
            tag[currentTag].style.color = '#eee'

            img[img.length-1].style.display = 'none'
            tag[img.length-1].style.color = '#033275'

        }
    } , 6000 )

})()

/**conexion ajax para peticiones post envio de parametros por body retorna una promesa*/

const ajax = object =>{

    return new Promise((resolve,reject)=>{

        const xhr = new XMLHttpRequest();
        xhr.open(object.method,object.url,true);

        xhr.addEventListener('load', e => {
            resolve(e.target);
        });

        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
        xhr.send(object.info);
    });
}


/** funcion que retorna un token de acceso en caso de que se valide la informacion en el servidor */


const loginData =  ( e => {
    
    form1.addEventListener('submit', e => {
        let object = {
            method: 'POST',
            url: '/login/user',
            info: `email=${e.target.email.value}&password=${e.target.password.value}`
        }

        ajax(object)
            .then( data => {
                if( data.status === 200 && data.readyState === 4 ){
                    let res =  JSON.parse( data.response )
                    let token = res.token
                    msnLogin.textContent = '';
                    localStorage.setItem('token',token)

                }else{
                    let res = JSON.parse( data.response )
                    msnLogin.textContent = res.message
                }
            })
            .catch( err => JSON.parse(err) )

        e.preventDefault();
    })
})()
/*
const getUser = (e =>{

    const xhr = new XMLHttpRequest();
    xhr.open('GET','/usuario',true);
    xhr.addEventListener('load', e => {
        console.log(JSON.parse(e.target.responseText))
    });
    // xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
    xhr.setRequestHeader('token', localStorage.getItem('token'))
    xhr.send();
    
})()
*/