
const getUsername=document.querySelector("#user") as HTMLInputElement;
const getForm=document.querySelector('#form') as HTMLFormElement;
const main_container=document.querySelector('.main_container') as HTMLElement;



interface userData{
    id:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string
}

async function customApiFetcher<T>(url:string,option?:RequestInit):Promise<T>{
     const response=await fetch(url,option);

     if(!response.ok){
        throw new Error('the api is not responsing!')
     }
     
     const data=response.json();
       

     return data;
}


const sigleUserUI=(user:userData)=>{
    
    const {avatar_url,login,url}=user;

    main_container.insertAdjacentHTML("beforeend",
        `
        <div class="card">
             <img src=${avatar_url} alt=${login}/>
             <hr/>
            <div class="card-footer">
            <img src="${avatar_url}" alt="${login}"/>
            <a href="${url}"> GitHub </a>
            </div>
        </div>

        `
    );
}

const fetchData=(url:string)=>{
customApiFetcher<userData[]>(url,{}).then((value)=>{
    for(const singleUser of value){
        sigleUserUI(singleUser);
    }
})
   
}


fetchData("https://api.github.com/users");

// getUsername.addEventListener("input",async(e)=>{
//     // e.preventDefault();

//     const searchTerm=getUsername.value.toLowerCase();

//     try{
      
//         const url="https://api.github.com/users";

//         const data=await customApiFetcher<userData[]>(url,{});

//         const machingUsers=data.filter((value)=>{
//             return value.login.toLowerCase().includes(searchTerm);
//         })

//         main_container.innerHTML="";

//         if(machingUsers.length===0){
//             main_container.insertAdjacentHTML('beforeend',
//                 `<p class="empty-msg">no matching user found . </p>
//                 `
//             )
//         }else{
//             for(const singleUser of machingUsers){
//                 sigleUserUI(singleUser);
//             }
//         }


//     }catch(e){
//         console.log(e);
//     }
// })

getForm.addEventListener('submit',async(e)=>{

    e.preventDefault();

    const searchTerm=getUsername.value.toLowerCase();

    try{
      
        const url="https://api.github.com/users";

        const data=await customApiFetcher<userData[]>(url,{});

        const machingUsers=data.filter((value)=>{
            return value.login.toLowerCase().includes(searchTerm);
        })

        main_container.innerHTML="";

        if(machingUsers.length===0){
            main_container.insertAdjacentHTML('beforeend',
                `<p class="empty-msg">no matching user found . </p>
                `
            )
        }else{
            for(const singleUser of machingUsers){
                sigleUserUI(singleUser);
            }
        }


    }catch(e){
        console.log(e);
    }
})