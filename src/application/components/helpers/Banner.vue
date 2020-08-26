 <template>
   <div class="head">
     <div>
       <slot>
         <h1>Strive For <span class="font-weight-bold">Progress</span> Not <span class="font-weight-bold">Perfection</span></h1>
       </slot>
     </div>
   </div>
 </template>

 <style lang="scss" scoped>
 .head{
   background: url('../../assets/images/shop/header.svg') bottom no-repeat;
   color: $white;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 5rem 2rem;
   min-height: 300px;
 }
 </style>
