let form = document.getElementById('form-modal')
let erreur = document.getElementById('erreur')

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let formObj = Object.fromEntries(formData);
  
    console.log(formObj);
    fetch("/admin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formObj),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload()
      })
      .catch((error) => {
        erreur.classList.remove('d-none')
      });
  });



    function status(id){
        const url = "/api/status/"+id;
        const data = {
            status:true
        }
        console.log(data)
        const options = {
            method:'PUT',
            headers:{
                'Content-Type':'applications/json'
            },
            body:JSON.stringify(data)
        }
    fetch(url, options)
	.then(res => res.json())
	.then(data => {
    location.reload(true)
    })
    }