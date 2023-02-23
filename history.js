showTable(){
    let body = document.createElement('tbody');
    body.id = 'history-body';
    for(index=0; index<localStorage.length;index++){
        const key =  localStorage.key(index);
        const value =  {store_JSON }= JSON.parse(localStorage.getItem(key));
    }
    


}