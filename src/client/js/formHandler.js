function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formDestination = document.getElementById('destination').value
    let formDateFrom = document.getElementById('datefrom').value
    
    console.log("::: destination :::", formDestination);
    console.log("::: datefrom :::", formDateFrom);

    // async function to post form data to backend
    async function postFormData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
        });
        return response.json(); 
      }

      // check the entered ISBN, if successful go ahead
      postFormData('http://localhost:3000/travel', {destination: formDestination, datefrom: formDateFrom})
      .then((data) => {
        console.log('DATA')
        console.log(data); // JSON data parsed by `response.json()` call
        
        if ( data.status === 'SUCCESS' ) {
            console.log('SUCCESS');
            dataValid(data);
        } else { console.log('ERROR'); 
            dataNotValid(data);
            }
      });

    // function for valid form data
    function dataValid (data = {}) {
        console.log("::: data valid :::")
        document.getElementById('error').classList.add("pseudo");
            document.getElementById('error').innerHTML = "dataValid";
        }
    
    // function for invalid form data - show the errors
    function dataNotValid (data = {}) {
        console.log("::: data not valid :::")
        document.getElementById('error').classList.remove("pseudo");
        document.getElementById('error').innerHTML = data.error;
    }
}    

export { handleSubmit }
