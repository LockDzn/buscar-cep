window.onload = () => {
    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('keyup', async (event) => {
        var cep = cepInput.value.replace(/([.-])/g, '');


        if(cep.length == 8) {

            const data = await findCEP(cep);

            if(data.erro){
                cepInput.style.border = '1px solid #a53c3c';
            } else {
                cepInput.style.border = '1px solid #ccc';
                document.getElementById('neighborhood').value = data.bairro || '...';
                document.getElementById('street').value = data.logradouro || '...';
                document.getElementById('city').value = data.localidade || '...';
                document.getElementById('state').value = data.uf || '...';
            }
        } else {
            cepInput.style.border = '1px solid #ccc';
            document.getElementById('neighborhood').value = '';
            document.getElementById('street').value = '';
            document.getElementById('city').value = '';
            document.getElementById('state').value = '';
        }

        if(cep.length > 8) {
            cepInput.style.border = '1px solid #a53c3c';
        }

    });

}

async function findCEP(cep) {
    
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    return data;
}
