let inputUser = document.querySelector('#inputUser');
let btnAdd = document.querySelector('#btnAdd');
let UlRepos = document.querySelector('#UlRepos');

btnAdd.addEventListener('click', () => {
    UlRepos.innerHTML = "";
    axios.get('https://api.github.com/users/'+inputUser.value+'/repos')
    .then(function(resolve) {
        inputUser.value = "";
        setTimeout(() => {
            UlRepos.removeChild(liCarregamento);
            UlRepos.innerHTML = "<h6 style='text-align: center;'>Repositórios deste usuário:</h6>";
            for(item of resolve.data) {
                let liElement = document.createElement('li');
                let liText = document.createTextNode(item.name);
                liElement.setAttribute('class', 'list-group-item');
                liElement.appendChild(liText);
                UlRepos.appendChild(liElement);
            }    
        }, 400)
    })
    .catch(function(reject) {
        inputUser.value = "";
        UlRepos.removeChild(liCarregamento);
        let liElement = document.createElement('li');
        let liText = document.createTextNode('Usuário não existe, Tente novamente.');
        liElement.setAttribute('class', 'list-group-item');
        liElement.appendChild(liText);
        UlRepos.appendChild(liElement);
    })
    
    let liCarregamento = document.createElement('li');
    let liTextCarregamento = document.createTextNode('Carregando...');
    liCarregamento.setAttribute('style', 'text-align: center;list-style-type: none;');
    liCarregamento.appendChild(liTextCarregamento);
    UlRepos.appendChild(liCarregamento);
})
