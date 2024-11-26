
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * https://fantastic-admin.hurui.me
 */
    
import{d as r,a2 as n,a3 as i,u,o as p,k as c,a4 as f,a5 as m,b}from"./index-hvzRevkC.js";const g={class:"relative w-full lg-w-48"},h=["placeholder","disabled"],v=r({__name:"HInput",props:n({placeholder:{},disabled:{type:Boolean,default:!1}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(s,{expose:d}){const e=i(s,"modelValue"),a=u("inputRef");return d({ref:a}),(l,o)=>(p(),c("div",g,[f(b("input",{ref_key:"inputRef",ref:a,"onUpdate:modelValue":o[0]||(o[0]=t=>e.value=t),type:"text",placeholder:l.placeholder,disabled:l.disabled,class:"relative block w-full border-0 rounded-md bg-white px-2.5 py-1.5 text-sm shadow-sm ring-1 ring-stone-2 ring-inset disabled-cursor-not-allowed dark-bg-dark disabled-opacity-50 focus-outline-none focus-ring-2 dark-ring-stone-8 focus-ring-ui-primary placeholder-stone-4 dark-placeholder-stone-5"},null,8,h),[[m,e.value]])]))}});export{v as _};
