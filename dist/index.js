"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getUsername = document.querySelector("#user");
const getForm = document.querySelector('#form');
const main_container = document.querySelector('.main_container');
function customApiFetcher(url, option) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, option);
        if (!response.ok) {
            throw new Error('the api is not responsing!');
        }
        const data = response.json();
        return data;
    });
}
const sigleUserUI = (user) => {
    const { avatar_url, login, url } = user;
    main_container.insertAdjacentHTML("beforeend", `
        <div class="card">
             <img src=${avatar_url} alt=${login}/>
             <hr/>
            <div class="card-footer">
            <img src="${avatar_url}" alt="${login}"/>
            <a href="${url}"> GitHub </a>
            </div>
        </div>

        `);
};
const fetchData = (url) => {
    customApiFetcher(url, {}).then((value) => {
        for (const singleUser of value) {
            sigleUserUI(singleUser);
        }
    });
};
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
getForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const data = yield customApiFetcher(url, {});
        const machingUsers = data.filter((value) => {
            return value.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = "";
        if (machingUsers.length === 0) {
            main_container.insertAdjacentHTML('beforeend', `<p class="empty-msg">no matching user found . </p>
                `);
        }
        else {
            for (const singleUser of machingUsers) {
                sigleUserUI(singleUser);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}));
