/// <reference types="vite/client" />

interface ImoprtMetaEnv{
    readonly VITE_PUBLIC_API_URL:string
}

interface ImportMeta {
    readonly env :ImportMetaEnv;
}