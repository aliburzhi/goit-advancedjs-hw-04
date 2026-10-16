import{S as w,a as y,i as l}from"./assets/vendor-DdZYxTBp.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const i={galleryEl:document.querySelector(".gallery"),loaderEl:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more-btn")},v=new w(".gallery a",{captionSelector:"img",captionPosition:"bottom",captionsData:"alt",captionDelay:250}),m=o=>{const r=o.map(e=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
              <img
                class="gallery-image"
                src="${e.webformatURL}"
                alt="${e.tags}"
              >
            </a>
             <table class="gallery-table">
              <thead>
                  <tr>
                    <th class="gallery-table-header">Likes</th>
                    <th class="gallery-table-header">Views</th>
                    <th class="gallery-table-header">Comments</th>
                    <th class="gallery-table-header">Downloads</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                    <td class="gallery-table-cell">${e.likes}</td>
                    <td class="gallery-table-cell">${e.views}</td>
                    <td class="gallery-table-cell">${e.comments}</td>
                    <td class="gallery-table-cell">${e.downloads}</td>
                  </tr>
                </tbody>
              </table>
          </li>
        `).join("");i.galleryEl.insertAdjacentHTML("beforeend",r),v.refresh()},E=()=>{i.galleryEl.innerHTML=""},g=()=>{i.loaderEl.classList.add("is-visible")},f=()=>{i.loaderEl.classList.remove("is-visible")},h=()=>{i.loadMoreBtn.classList.remove("is-hidden")},p=()=>{i.loadMoreBtn.classList.add("is-hidden")};y.defaults.baseURL="https://pixabay.com";const b=async(o,r)=>{const e={key:"23365926-b4db738b99f20e424398823c4",q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:r};return(await y.get("/api/",{params:e})).data},L={formEl:document.querySelector("form"),loadMoreBtn:document.querySelector(".js-load-more-btn")};let u="",n=1,c=0;const S=async()=>{try{g(),p();const o=n+1,r=await b(u,o);m(r.hits),n=o;const e=document.querySelector(".gallery-item");if(e){const{height:a}=e.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}if(n>=c){l.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"});return}h()}catch(o){l.error({message:o.message,position:"topRight"}),h()}finally{f()}},M=async o=>{try{o.preventDefault();const{currentTarget:r}=o,e=r.elements["search-text"].value.trim();if(!e){l.error({message:"Empty input!",position:"topRight"});return}u=e,E(),g(),p(),n=1;const a=await b(u,n);if(c=Math.ceil(a.totalHits/15),a.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}c===1&&l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c>1&&h(),m(a.hits)}catch(r){l.error({message:r.message,position:"topRight"})}finally{f()}};L.loadMoreBtn.addEventListener("click",S);L.formEl.addEventListener("submit",M);
//# sourceMappingURL=index.js.map
